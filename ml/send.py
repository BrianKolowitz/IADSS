__author__ = 'parallels'
import pika
import logging
logging.basicConfig(format='%(levelname)s:%(message)s', level=logging.CRITICAL)

connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()
channel.queue_declare(queue='hello')
channel.basic_publish(exchange='',
                      routing_key='hello',
                      body='Hello World!')
print "[x] Sent 'Hello World!'"
connection.close()
