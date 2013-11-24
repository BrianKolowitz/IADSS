package foo.bar;

import com.google.gson.Gson;
import org.dcm4che2.data.DicomObject;
import org.dcm4che2.data.Tag;
import org.dcm4che2.io.DicomInputStream;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;

@Component
public class DICOMWatchService {
    WatchService _watcher;

    public DICOMWatchService() {
        try {
            _watcher = FileSystems.getDefault().newWatchService();
        } catch (IOException x) {
            System.err.println(x);
        }
    }

    public void Watch(Path pathToWatch) throws IOException {
        WatchKey registerKey;
        registerKey = pathToWatch.register(_watcher, StandardWatchEventKinds.ENTRY_CREATE);

        for (;;) {
            // wait for key to be signaled
            WatchKey key;
            try {
                key = _watcher.take();
            } catch (InterruptedException x) {
                return;
            }

            for (WatchEvent<?> event: key.pollEvents()) {
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
                WatchEvent<Path> ev = (WatchEvent<Path>)event;
                Path filename = ev.context();

                // Verify that the new
                //  file is a text file.
//                try {
//                    // Resolve the filename against the directory.
//                    // If the filename is "test" and the directory is "foo",
//                    // the resolved name is "test/foo".
//                    Path child = pathToWatch.resolve(filename);
//                    if (!Files.probeContentType(child).equals("text/plain")) {
//                        System.err.format("New file '%s' is not a plain text file.%n", filename);
//                        continue;
//                    }
//                } catch (IOException x) {
//                    System.err.println(x);
//                    continue;
//                }

                // Email the file to the
                //  specified email alias.
                Path child = pathToWatch.resolve(filename);
                System.out.format("Emailing file %s%n", filename);
                //Details left to reader....
                // log on rabbit mq
                Process(child);
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

    protected void Process(Path dicomFilePath)
    {
        DicomObject dcmObj;
        DicomInputStream din = null;
        try {
            String dicomFileName = dicomFilePath.toString();
            din = new DicomInputStream(new File(dicomFileName));
            dcmObj = din.readDicomObject();

            ResearchImage img = new ResearchImage();
            img.setPatientId(dcmObj.getString(Tag.PatientID));
            img.setPatientName(dcmObj.getString(Tag.PatientName));
            img.setAccessionNumber(dcmObj.getString(Tag.AccessionNumber));

            Gson gson = new Gson();
            String json = gson.toJson(img);
            System.out.println(json);


        }
        catch (IOException e) {
            e.printStackTrace();
            return;
        }
        finally {
            try {
                din.close();
            }
            catch (IOException ignore) {
            }
        }
    }
}
