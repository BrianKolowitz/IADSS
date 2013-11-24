package foo.bar;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Path;

public class HelloApp {
    public static void main(String[] args) throws IOException {
        ApplicationContext context = new ClassPathXmlApplicationContext("spring-config.xml");
        //HelloService helloService = context.getBean(HelloService.class);
        //System.out.println(helloService.sayHello());
        DICOMWatchService dicomWatchService = context.getBean((DICOMWatchService.class));
        Path pathToWatch = FileSystems.getDefault().getPath("/home/parallels/data/dicom_in");
        dicomWatchService.Watch(pathToWatch);
    }
}
