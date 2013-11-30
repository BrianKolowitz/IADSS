package edu.cmu.iadss.wrap_monitor;


import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Path;

/**
 * Hello world!
 *
 */
public class App 
{
    public static void main( String[] args ) throws IOException, InterruptedException
    {        
        // start the file path watcher
        String taskQueueName = "dicom_wrap_queue";
        String hostName = "localhost";
        FileWatcher watcher = new FileWatcher(taskQueueName, hostName);
        Path pathToWatch = FileSystems.getDefault().getPath("/home/vagrant/Data/wrap_queue");
        String extensionToWatch = ".json";
        watcher.Watch(pathToWatch, extensionToWatch);
    }
}
