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
import com.rabbitmq.client.MessageProperties;

/**
 *
 * @author vagrant
 */
public class QueueProducer {
    protected String _taskQueueName;
    protected String _hostName;
    
    public QueueProducer(String taskQueueName, String hostName) {
        _taskQueueName = taskQueueName;
        _hostName = hostName;
    }

    public void publish(QueuedTask task)
            throws java.io.IOException {

        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost(_hostName);
        Connection connection = factory.newConnection();
        Channel channel = connection.createChannel();

        channel.queueDeclare(_taskQueueName, true, false, false, null);

        Gson gson = new Gson();
        String message = gson.toJson(task);

        channel.basicPublish("", _taskQueueName,
                MessageProperties.PERSISTENT_TEXT_PLAIN, 
                message.getBytes());
        System.out.println(" [x] Sent '" + message + "'");

        channel.close();
        connection.close();
    }
    
}
