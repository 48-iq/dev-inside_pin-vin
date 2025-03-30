from fastapi import FastAPI, File, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
import torch
import librosa
from transformers import AutoModelForSpeechSeq2Seq, AutoProcessor, pipeline, logging
from pauses import calc_pauses
from typing import Annotated
import requests
from gigachat import GigaChat
from gigachat.models import Chat, Messages, MessagesRole
import json
import datetime
from converter import convert_to_avg
from competitions import generate_competitions

logging.set_verbosity_error()  


device = "cuda:0" if torch.cuda.is_available() else "cpu"
torch_dtype = torch.float16 if torch.cuda.is_available() else torch.float32

model_id = "openai/whisper-large-v3-turbo"

model = AutoModelForSpeechSeq2Seq.from_pretrained(
    model_id, torch_dtype=torch_dtype, low_cpu_mem_usage=True, use_safetensors=True
)
model.to(device)

processor = AutoProcessor.from_pretrained(model_id)

mongo_client = MongoClient('mongodb://localhost:27019/')
db = mongo_client["app_db"]
calls = db["calls"]

pipe = pipeline(
    "automatic-speech-recognition",
    model=model,
    tokenizer=processor.tokenizer,
    feature_extractor=processor.feature_extractor,
    torch_dtype=torch_dtype,
    device=device,
)

url = "https://ngw.devices.sberbank.ru:9443/api/v2/oauth"
payload={
  'scope': 'GIGACHAT_API_PERS'
}
headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
  'Accept': 'application/json',
  'RqUID': '6904a87d-4909-455d-8b87-33269a26c04e',
  'Authorization': 'Basic N2Q0Y2Y3MTQtMjZiZS00ZTUxLWFhMDQtM2I0Y2VlNmVmYTg2OjM2MTFlNzE2LTEzYTEtNGFkYy1hODJkLWI1YmExYjE4ZDM4Mw=='
}

response = requests.request("POST", url, headers=headers, data=payload, verify=False)
API_KEY = response.json()["access_token"]

CRITERIA = [
  "Уточнил имя клиента - clientName",
  "Назвал свое имя и компанию - nameAndCompany",
  "Уточнил сферу деятельности клиента - clientSphere",
  "Выявление ЛПР и ЛВПР - lpr",
  "Озвучивает информационные поводы для встречи - meeting",
  "Спросил о текущем процессе клиента - process",
  "Выяснил использование аналогов продукта - analogs",
  "Уточнил основные боли клиента - issues",
  "Задал уточняющие вопросы - clarifyingQuestions",
  "Задал не менее трех открытых вопросов - openQuestions",
  "Не перебивал клиента - notInterrupt",
  "Использовал техники активного слушания - activeListening",
  "Резюмировал полученную информацию - summarizeInfo",
  "Презентовал на языке выгод - useClientNeeds",
  "Ответил на вопросы клиента - answerClientQuestions",
  "Показал выгоды сотрудничества - showBenefit",
  "Подчеркнул выгоды подписки/тарифа - showHightPriceFirst",
  "Использовал актуальные примеры - activeExamples",
  "Отработал возражения - processClientsObjections",
  "Задал вопросы при возражениях - askClientObjections",
  "Предоставил аргументы - provideArguments",
  "Проверил убедительность - checkClientExtraQuestions",
  "Использовал побудительные фразы - useActivePhrase",
  "Зафиксировал договоренности - recordAgreements",
  "Назначил следующий шаг - setNextStep",
  "Предложил сделку - offerDeal",
  "Применил действия при отказе - clientNotReadyActions",
  "Попрощался - buyBuy",
  "Проявил инициативу - takesInitiative",
  "Держал позицию на равных - equalsPosition",
  "Обращался по имени (3+ раза) - useClientName",
  "Актуальная стадия сделки - actualDeal",
  "Заполнил обязательные поля - requiredFields",
  "Заполнил поле 'фамилия' - surnameField",
  "Использовал позитивные формулировки - positivePhrases"
]


def analyze_call(transcript: str, criteria: list) -> dict:
    
    # Формируем промпт
    system_prompt = f"""
    Проанализируй текст разговора менеджера с клиентом.
     
    Для каждого критерия из списка верни JSON-объект с полем "result" (true/false).
    Также оцени тон звонка (от 1 до 5, где 5 - отличный, а 1 - ужасный) и верни JSON-объект с полем "tone".
    После дай рекомендацию по критериям и тону звонка, для каждой рекомендации верни JSON-объект с полем "recommendation".
    Критерии: {", ".join(criteria)}
    Пример ответа: 
    {{
      "competitions":{{
        "clientName": {{"result": true}},
        "nameAndCompany": {{"result": false}},
        "clientSphere": {{"result": true}},
        ...
      }},
      "tone: {{"tone": 3}},
      "recommendations": [
        {{"recommendation": "Рекомендация 1"}}, 
        {{"recommendation": "Рекомендация 2"}}
        ...
      ]
    }}
    """
    
    # Формируем запрос
    url = "https://gigachat.devices.sberbank.ru/api/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Accept": "application/json"
    }
    
    data = {
        "model": "GigaChat",
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": transcript}
        ],
        "temperature": 0.1  # Для большей детерминированности
    }

    response = requests.post(url, headers=headers, json=data, verify=False)
    response.raise_for_status()
    
    result = response.json()["choices"][0]["message"]["content"]
    return json.loads(result)

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/process-call")
def process_call(
    managerId: Annotated[str, Form()],
    tel: Annotated[str, Form()],
    audioFile: Annotated[UploadFile, File()]
):
    audio, sr = librosa.load(audioFile.file, sr=16000) 


    tresult = pipe(audio, return_timestamps=True)
    text = tresult["text"]
    result = analyze_call(text, CRITERIA)

    clientTel = tel
    duration = audio.shape[0] 
    pauses = calc_pauses(tresult["chunks"])
    recomendations = result["recommendations"]
    tone = result["tone"]["tone"]
    competitions = {}
    avgPauseLen = pauses["average_pause"]
    maxPauseLen = pauses["max_pause"]
    pauseCount = pauses["pause_count"]

    for key, value in result["competitions"].items():
        competitions[key] = value["result"]
    print(competitions)
    cmp = generate_competitions(competitions)
    call = {
        "date": datetime.datetime.now().strftime("%Y-%m-%d"),
        "hour": datetime.datetime.now().strftime("%H"),
        "managerId": managerId,
        "clientTel": clientTel,
        "duration": duration,
        "avgPauseLen": avgPauseLen,
        "maxPauseLen": maxPauseLen,
        "pauseCount": pauseCount,
        "tone": tone,
        "rating": cmp["rating"],
        "competitions": cmp["competitions"],
        "recomendations": recomendations
    }
    id = calls.insert_one(call).inserted_id
    return {"id": str(id)}



@app.get("/api/get-calls")
def get_calls():
    calls_list = []
    for call in calls.find():
        call["_id"] = str(call["_id"])
        calls_list.append(call)
    print(calls_list)
    return {"calls": calls_list}


@app.get("/api/get-avg")
def get_avg():
    calls_list = []
    t_duration = 0
    t_pause_len = 0
    t_pause_count = 0
    for call in calls.find():
        call["_id"] = str(call["_id"])
        t_duration += call["duration"]
        t_pause_len += call["avgPauseLen"]
        t_pause_count += call["pauseCount"]
        calls_list.append(call)
    result = convert_to_avg(calls_list)
    return result;
    
    

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)