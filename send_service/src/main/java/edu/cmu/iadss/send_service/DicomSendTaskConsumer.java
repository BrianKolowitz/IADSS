/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.cmu.iadss.send_service;

import com.google.gson.Gson;
import edu.cmu.iadss.common.DicomSendTask;
import edu.cmu.iadss.common.DicomWrapTask;
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

    protected void doWork(String message) throws IOException {
        Gson gson = new Gson();
        DicomSendTask task = gson.fromJson(message, DicomSendTask.class);
        
        CommandLine cmdLine = new CommandLine(_dcmsnd);
        String destination = String.format("%s@%s:%d",
                task.getDestinationAe(),
                task.getDestinationIp(),
                task.getDestinationPort());
        cmdLine.addArgument(destination);
        cmdLine.addArgument(task.getDicomFileName());

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
