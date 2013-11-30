/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package edu.cmu.iadss.common;

import com.google.gson.Gson;
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
    protected String _taskQueueName = "dicom_wrap_queue";
    protected String _hostName = "localhost";
    protected boolean _run = true;
    protected Connection _connection;

    public QueueConsumer(String taskQueueName, String hostName)  {
        _taskQueueName = taskQueueName;
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
        channel.queueDeclare(_taskQueueName, true, false, false, null);
        channel.basicQos(1);
        QueueingConsumer consumer = new QueueingConsumer(channel);
        channel.basicConsume(_taskQueueName, false, consumer);
        while (_run) {
            QueueingConsumer.Delivery delivery = consumer.nextDelivery();
            String message = new String(delivery.getBody());
            Gson gson = new Gson();
            DicomSendTask wrapTask = gson.fromJson(message, DicomSendTask.class);
            doWork(wrapTask);
            channel.basicAck(delivery.getEnvelope().getDeliveryTag(), false);
        }
    }

    protected abstract void doWork(QueuedTask task) throws IOException;
}
