import torch
import librosa
from transformers import AutoModelForSpeechSeq2Seq, AutoProcessor, pipeline, logging, Pipeline
from datasets import load_dataset

def prepare_model():
  device = "cuda:0" if torch.cuda.is_available() else "cpu"
  torch_dtype = torch.float16 if torch.cuda.is_available() else torch.float32

  model_id = "openai/whisper-large-v3-turbo"

  model = AutoModelForSpeechSeq2Seq.from_pretrained(
      model_id, 
      torch_dtype=torch_dtype, 
      low_cpu_mem_usage=True, 
      use_safetensors=True
  )
  model.to(device)

  processor = AutoProcessor.from_pretrained(model_id)
  return pipeline(
    "automatic-speech-recognition",
    model=model,
    tokenizer=processor.tokenizer,
    feature_extractor=processor.feature_extractor,
    torch_dtype=torch_dtype,
    device=device,
  )

def transcrib_call_record(call_record, pipe: Pipeline):
  audio, sr = librosa.load(call_record, sr=16000) 
  result = pipe(audio, return_timestamps=True)
  
  text = result["text"]
  timestamps = result["timestamps"]
  pauses = []
  for i in range(1, len(timestamps)):
      prev_end = timestamps[i-1]["timestamp"][1]  
      current_start = timestamps[i]["timestamp"][0]  
      pause = current_start - prev_end
      if pause > 0.5:  
          pauses.append(pause)
  average_pause = 0
  max_pause = 0
  pause_count = 0
  if pauses:
    average_pause = sum(pauses) / len(pauses)
    max_pause = max(pauses)
    pause_count = len(pauses)
  return {
    "text": text,
    "average_pause": average_pause,
    "max_pause": max_pause,
    "pause_count": pause_count
  }