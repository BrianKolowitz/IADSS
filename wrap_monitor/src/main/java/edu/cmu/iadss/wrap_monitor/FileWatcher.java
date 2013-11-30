/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.cmu.iadss.wrap_monitor;

import edu.cmu.iadss.common.DicomWrapTask;
import com.google.gson.Gson;
import edu.cmu.iadss.common.QueueProducer;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.*;
import java.util.List;
import org.apache.commons.lang3.StringUtils;

/**
 *
 * @author vagrant
 */
public class FileWatcher {

    WatchService _watcher;
    String _extensionToWatch;
    String _taskQueueName;
    String _hostName;

    public FileWatcher(String taskQueueName, String hostName) {
        _taskQueueName = taskQueueName;
        _hostName = hostName;
        try {
            _watcher = FileSystems.getDefault().newWatchService();
        } catch (IOException x) {
            System.err.println(x);
        }
    }

    public void Watch(Path pathToWatch, String extensionToWatch) throws IOException {
        WatchKey registerKey = pathToWatch.register(_watcher, StandardWatchEventKinds.ENTRY_CREATE);
        _extensionToWatch = extensionToWatch;

        for (;;) {
            // wait for key to be signaled
            WatchKey key;
            try {
                key = _watcher.take();
            } catch (InterruptedException x) {
                return;
            }

            for (WatchEvent<?> event : key.pollEvents()) {
                WatchEvent.Kind<?> kind = event.kind();

                // This key is registered only
                // for ENTRY_CREATE events,
                // but an OVERFLOW event can
                // occur regardless if events
                // are lost or discarded.
                if (kind == StandardWatchEventKinds.OVERFLOW) {
                    continue;
                }

                // The filename is the
                // context of the event.
                WatchEvent<Path> ev = (WatchEvent<Path>) event;
                Path filename = ev.context();
                int extIndex = filename.toString().lastIndexOf(".");
                String fileext = filename.toString().substring(extIndex);
                if (fileext.equalsIgnoreCase(_extensionToWatch)) {
                    Path child = pathToWatch.resolve(filename);
                    System.out.format("Found file %s%n", filename);
                    Process(child);
                }
            }

            // Reset the key -- this step is critical if you want to
            // receive further watch events.  If the key is no longer valid,
            // the directory is inaccessible so exit the loop.
            boolean valid = key.reset();
            if (!valid) {
                break;
            }
        }
    }

    protected void Process(Path filePath) throws IOException {
        // put the appropriate message on rabbitmq
        
        List<String> lines = Files.readAllLines(filePath, Charset.defaultCharset());
        String json = StringUtils.join(lines, " ");
        Gson gson = new Gson();
        DicomWrapTask wrapTask = gson.fromJson(json, DicomWrapTask.class);
        
        QueueProducer producer = new QueueProducer(_taskQueueName, _hostName);
        producer.publish(wrapTask);
    }

}
