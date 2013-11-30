/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package edu.cmu.iadss.common;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.QueueingConsumer;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author vagrant
 */
public abstract class QueueConsumer implements Runnable {
    protected final String _consumeTaskQueueName;
    protected final String _hostName;
    protected boolean _run = true;
    protected Connection _connection;

    public QueueConsumer(String taskQueueName, String hostName)  {
        _consumeTaskQueueName = taskQueueName;
        _hostName = hostName;
    }

//        public void shutdown() throws IOException {
//            _run = false;
//            System.out.println("DICOM Send Task Consumer - Closing");
//            _connection.close();
//        }
    
    @Override
    public void run() {
        try {
            consumeQueue();
        } catch (IOException ex) {
            Logger.getLogger(this.getClass().getName()).log(Level.SEVERE, null, ex);
        } catch (InterruptedException ex) {
            Logger.getLogger(this.getClass().getName()).log(Level.SEVERE, null, ex);
        }
    }

    protected void consumeQueue() throws IOException, InterruptedException {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost(_hostName);
        _connection = factory.newConnection();
        Channel channel = _connection.createChannel();
        channel.queueDeclare(_consumeTaskQueueName, true, false, false, null);
        channel.basicQos(1);
        QueueingConsumer consumer = new QueueingConsumer(channel);
        channel.basicConsume(_consumeTaskQueueName, false, consumer);
        while (_run) {
            QueueingConsumer.Delivery delivery = consumer.nextDelivery();
            String message = new String(delivery.getBody());
            if ( doWork(message) )
                channel.basicAck(delivery.getEnvelope().getDeliveryTag(), false);
            else
                channel.basicCancel("Error processing message"); // TODO add better error
        }
    }

    protected abstract boolean doWork(String message) throws IOException;
}
