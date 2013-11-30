/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.cmu.iadss.send_service;

import edu.cmu.iadss.common.DicomSendTask;
import edu.cmu.iadss.common.QueueConsumer;
import edu.cmu.iadss.common.QueuedTask;
import java.io.IOException;
import org.apache.commons.exec.CommandLine;
import org.apache.commons.exec.DefaultExecutor;

/**
 *
 * @author vagrant
 */
public class DicomSendTaskConsumer extends QueueConsumer {

    private String _dcmsnd;

    public DicomSendTaskConsumer(String taskQueueName, String hostName, String dcmsnd) {
        super(taskQueueName, hostName);
        _dcmsnd = dcmsnd;
    }

    protected void doWork(QueuedTask task) throws IOException {
        DicomSendTask sendTask = (DicomSendTask)task;
        CommandLine cmdLine = new CommandLine(_dcmsnd);
        String destination = String.format("%s@%s:%d",
                sendTask.getDestinationAe(),
                sendTask.getDestinationIp(),
                sendTask.getDestinationPort());
        cmdLine.addArgument(destination);
        cmdLine.addArgument(sendTask.getDicomFileName());

        DefaultExecutor executor;
        executor = new DefaultExecutor();
        int exitValue;
        exitValue = executor.execute(cmdLine);
        if (exitValue == 0) {
            System.out.print("Success");
        } else {
            System.out.printf("Error %d%n", exitValue);
        }
    }
}
