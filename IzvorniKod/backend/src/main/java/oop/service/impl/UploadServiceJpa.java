package oop.service.impl;

import oop.service.UploadService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.List;

@Service
public class UploadServiceJpa implements UploadService {
    private static final String path = System.getProperty("user.dir")+"/images/";
    @Override
    public String uploadFile(MultipartFile file) throws Exception{
        String url = new String();
        File directory = new File(path);
        if(!directory.exists()){
            directory.mkdir();
        }
        System.out.println(file);
        if(!file.getOriginalFilename().isEmpty()) {
            BufferedOutputStream outputStream = new BufferedOutputStream(
                    new FileOutputStream(new File(path, file.getOriginalFilename())));
            url = path + file.getOriginalFilename();
            outputStream.write(file.getBytes());
            outputStream.flush();
            outputStream.close();
        } else {
            throw new Exception();
        }
        System.out.println(url);
        return url;
    }
}
