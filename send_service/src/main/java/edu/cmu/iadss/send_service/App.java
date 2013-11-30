package edu.cmu.iadss.send_service;

import java.io.IOException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * Hello world!
 *
 */
public class App 
{
     public static void main(String[] args) throws IOException {
        System.out.println("DICOM Send Task Consumer - Starting");
        // start the wrap task consumer

        ExecutorService executor = Executors.newFixedThreadPool(1);

        String taskQueueName = "dicom_send_queue";
        String hostName = "localhost";
        String dcmsnd = "/home/vagrant/Source/IADSS/dcm4che-2.0.28/bin/dcmsnd";
        Runnable worker = new DicomSendTaskConsumer(taskQueueName, hostName, dcmsnd);
        executor.execute(worker);

        System.out.println("DICOM Send Task Consumer - Press Enter to Exit");
        System.in.read();
        System.out.println("DICOM Send Task Consumer - Shutting down");
        executor.shutdownNow();  // TODO : verify shutdown logic
        while (!executor.isTerminated()) {
        }
        System.out.println("DICOM Send Task Consumer - Finished");
    }
}
