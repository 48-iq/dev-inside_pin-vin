from fastapi import FastAPI, UploadFile, File, Form, BackgroundTasks
import uvicorn
import pymongo
import os
from confluent_kafka import Consumer, KafkaException
from process import process_call_record



client = pymongo.MongoClient("mongo:27017")

db = client["app"]

call_records = db["call_records"]
app = FastAPI()

def start_consumer():
  consumer = Consumer({
    'bootstrap.servers': 'kafka:9092',
    'group.id': 'py-back',
    'auto.offset.reset': 'earliest'
  })
  consumer.subscribe(['call-records-events-topic'])

  try:
    while True:
      msg = consumer.poll(1.0)
      if msg is None:
        continue
      if msg.error():
        raise KafkaException(msg.error())
      else:
        process_call_record(msg.value())
  
  except KeyboardInterrupt:
    pass
  finally:
    consumer.close()



  
  

if __name__ == "__main__":
  uvicorn.run("main:app", host="0.0.0.0", port=8080, reload=True)