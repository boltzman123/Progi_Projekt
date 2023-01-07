package oop.service;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UploadService {
    public String uploadFile(MultipartFile file) throws Exception;

}
