/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.cmu.iadss.wrap_service;

import com.google.gson.Gson;
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
public class DicomWrapTaskConsumer extends QueueConsumer {

    private final String _jpg2dcm;

    public DicomWrapTaskConsumer(String taskQueueName, String hostName, String jpg2dcm) {
        super(taskQueueName, hostName);
        _jpg2dcm = jpg2dcm;
    }

    protected void doWork(String message) throws IOException {
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
        if (exitValue == 0) {
            System.out.print("Success");
        } else {
            System.out.printf("Error %d%n", exitValue);
        }
    }

}
