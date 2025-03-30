import json
import logging
import os
from minio import Minio
from transcrib import transcrib_call_record, prepare_model
import time
from confluent_kafka import Consumer, KafkaError, KafkaException

logging.basicConfig(
    format='%(asctime)s %(levelname)s: %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

class KafkaMessageConsumer:
    def __init__(self):
        self.minio_client = Minio("http://minio:9000",
          access_key="minio_access_key",
          secret_key="minio_secret_key",
        )
        self.bootstrap_servers = "kafka:9092"
        self.topic = 'call-created-events-topic'
        self.conf = {
            'bootstrap.servers': self.bootstrap_servers,
            'group.id': 'call-events-group-v3',
            'auto.offset.reset': 'earliest',
            'enable.auto.commit': False,
            'max.poll.interval.ms': 300000,
            'session.timeout.ms': 15000,
            'metadata.max.age.ms': 30000,
            'topic.metadata.refresh.interval.ms': 60000,
            'fetch.wait.max.ms': 500
        }
        self.consumer = None
        self.running = False

    def wait_for_kafka(self, timeout=120):
        start_time = time.time()
        while time.time() - start_time < timeout:
            try:
                temp_consumer = Consumer({
                    'bootstrap.servers': self.bootstrap_servers,
                    'group.id': 'healthcheck-group',
                    'session.timeout.ms': 5000
                })
                temp_consumer.list_topics(timeout=5)
                temp_consumer.close()
                logger.info("Kafka is ready")
                return True
            except Exception as e:
                logger.warning(f"Waiting for Kafka... ({str(e)})")
                time.sleep(5)
        logger.error("Таймаут ожидания Kafka")
        return False

    def connect(self):
        if not self.wait_for_kafka():
            raise Exception("Cannot connect to Kafka")

        self.consumer = Consumer(self.conf)
        self.running = True
        logger.info(f"subscribing to {self.topic}")
        self.consumer.subscribe([self.topic], on_assign=self._on_assign)

    def _on_assign(self, consumer, partitions):
        logger.info(f"Selected partitions: {partitions}")

    def consume_messages(self):
        message_counter = 0
        last_message_time = time.time()
        
        while self.running:
            try:
                msg = self.consumer.poll(1.0)
                
                if msg is None:
                    if time.time() - last_message_time > 30:
                        logger.info("no messages received for 30 seconds")
                        last_message_time = time.time()
                    continue
                    
                if msg.error():
                    self._handle_error(msg.error())
                    continue
                    
                self._process_message(msg)
                message_counter += 1
                last_message_time = time.time()
                
            except KeyboardInterrupt:
                logger.info("Interrupted by signal")
                self.running = False
            except KafkaException as e:
                logger.error(f"Error Kafka: {e}")
                self._reconnect()
            except Exception as e:
                logger.error(f"Unexpected error: {e}")
                self._reconnect()

    def _handle_error(self, error):
        if error.code() == KafkaError._PARTITION_EOF:
            logger.info("Partition EOF reached")
        elif error.code() == KafkaError.UNKNOWN_TOPIC_OR_PART:
            logger.warning("Topic or partition not found...")
            self._reconnect()
        elif error.code() == KafkaError._TIMED_OUT:
            logger.warning("Timeout...")
        else:
            logger.error(f"Error Kafka: {error}")

    def _process_message(self, msg):
        try:
            logger.info(
                f"Message received [{msg.partition()}:{msg.offset()}]: "
                f"{msg.value().decode('utf-8')}"
            )
            self.consumer.commit(asynchronous=False)
            call_k_dto = json.loads(msg.value().decode('utf-8'))
            dis_file = call_k_dto["minioId"]
            bucket_name = "mainbucket"
            f = self.minio_client.fget_object(bucket_name, dis_file)
            transcrib_call_record(f)
            
        except UnicodeDecodeError:
            logger.warning("UTF-8 error")

    def _reconnect(self):
        self.close()
        time.sleep(5)
        self.connect()

    def close(self):
        if self.consumer:
            self.consumer.close()
        self.running = False
        logger.info("Consumer closed")

if __name__ == '__main__':
    print('a')
    import time
    while True:
        time.sleep(1)
    prepare_model()
    consumer = KafkaMessageConsumer()
    try:
        consumer.connect()
        consumer.consume_messages()
    except Exception as e:
        logger.error(f"Fatal error: {e}")
    finally:
        consumer.close()