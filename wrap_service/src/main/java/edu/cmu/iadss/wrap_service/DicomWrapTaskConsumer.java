/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.cmu.iadss.wrap_service;

import com.google.gson.Gson;
import edu.cmu.iadss.common.DicomSendTask;
import edu.cmu.iadss.common.DicomWrapTask;
import edu.cmu.iadss.common.QueueConsumer;
import edu.cmu.iadss.common.QueueProducer;
import edu.cmu.iadss.common.QueuedTask;
import java.io.IOException;
import org.apache.commons.exec.CommandLine;
import org.apache.commons.exec.DefaultExecutor;

/**
 *
 * @author vagrant
 */
public class DicomWrapTaskConsumer extends QueueConsumer {

    private final String _jpg2dcm;
    private final String _sendTaskQueueName;
    private final String _sendToAe;
    private final String _sendToHost;
    private final int _sendToPort;

    public DicomWrapTaskConsumer(
            String wrapTaskQueueName, 
            String hostName, 
            String jpg2dcm,
            String sendTaskQueueName, 
            String sendToAe,
            String sendToHost,
            int sendToPort) {
        super(wrapTaskQueueName, hostName);
        _jpg2dcm = jpg2dcm;
        _sendTaskQueueName = sendTaskQueueName;
        _sendToAe = sendToAe;
        _sendToHost = sendToHost;
        _sendToPort = sendToPort;
    }

    protected boolean doWork(String message) throws IOException {
        Gson gson = new Gson();
        DicomWrapTask task;
        task = gson.fromJson(message, DicomWrapTask.class);

        CommandLine cmdLine = new CommandLine(_jpg2dcm);
        cmdLine.addArgument("-c");
        cmdLine.addArgument(task.getConfigFileName());
        cmdLine.addArgument(task.getInputFileName());
        cmdLine.addArgument(task.getDicomFileName());

        DefaultExecutor executor;
        executor = new DefaultExecutor();
        int exitValue;
        exitValue = executor.execute(cmdLine);
        if (exitValue != 0) {
            System.out.printf("Error %d%n", exitValue);
            return false;
        }
        
        System.out.print("Success");
        // create a send task
        DicomSendTask sendTask = new DicomSendTask();
        sendTask.setDestinationAe(_sendToAe);
        sendTask.setDestinationHost(_sendToHost);
        sendTask.setDestinationPort(_sendToPort);
        sendTask.setDicomFileName(task.getDicomFileName());
        QueueProducer producer = new QueueProducer(_sendTaskQueueName, _hostName);
        producer.publish(sendTask);
        return true;
    }

}
