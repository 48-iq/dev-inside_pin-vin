from flask import Flask
import pymongo
import os

app = Flask(__name__)

client = pymongo.MongoClient("mongo:27017")

db = client["app"]

collection = db["call_records"]



@app.get("/")
def postCallRecord():
  id = collection.insert_one({"a": "b123"}).inserted_id
  
  return str(id)


if __name__ == "__main__":
  app.run(
    host="0.0.0.0",
    port=8080,
    debug=True
  )
