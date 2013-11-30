package edu.cmu.iadss.wrap_service;

import java.io.IOException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * Hello world!
 *
 */
public class App {

    public static void main(String[] args) throws IOException {
        System.out.println("DICOM Wrap Task Consumer - Starting");
        // start the wrap task consumer

        ExecutorService executor = Executors.newFixedThreadPool(1);

        String wrapTaskQueueName = "dicom_wrap_queue";
        String hostName = "localhost";
        String jpg2dcm = "/home/vagrant/Source/IADSS/dcm4che-2.0.28/bin/jpg2dcm";
        String sendToTaskQueueName = "dicom_send_queue";
        String sendToAe = "DCM4CHEE";
        String sendToHost = "localhost";
        int sendToPort = 11112;
        Runnable worker = new DicomWrapTaskConsumer(
                wrapTaskQueueName, 
                hostName, 
                jpg2dcm,
                sendToTaskQueueName,
                sendToAe,
                sendToHost,
                sendToPort);
        executor.execute(worker);

        System.out.println("DICOM Wrap Task Consumer - Press Enter to Exit");
        System.in.read();
        System.out.println("DICOM Wrap Task Consumer - Shutting down");
        executor.shutdownNow();  // TODO : verify shutdown logic
        while (!executor.isTerminated()) {
        }
        System.out.println("DICOM Wrap Task Consumer - Finished");
    }
}
