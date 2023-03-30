package com.chingu.ChinguBoard.service;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetUrlRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.S3Exception;

@Service
public class S3Service {

    private final S3Client s3;

    static final String BUCKET_NAME = "chinguboard-dev";

    public S3Service(S3Client s3) {
        this.s3 = s3;
    }

    public String upload(MultipartFile file) throws S3Exception {
        try {
            String filename = StringUtils.cleanPath(file.getOriginalFilename());
            Map<String, String> metadata = new HashMap<>();
            metadata.put("Content-Type", file.getContentType());
            metadata.put("Content-Length", String.valueOf(file.getSize()));
            String key = UUID.randomUUID().toString() + "_" + filename;
            PutObjectRequest putOb = PutObjectRequest.builder()
                    .bucket(BUCKET_NAME)
                    .key(key)
                    .metadata(metadata)
                    .build();
            s3.putObject(putOb, RequestBody.fromInputStream(file.getInputStream(), file.getSize()));

            // get the URL for the stored image
            GetUrlRequest getUrl = GetUrlRequest.builder()
                    .bucket(BUCKET_NAME)
                    .key(key)
                    .build();
            String imageUrl = s3.utilities().getUrl(getUrl).toExternalForm();
            return imageUrl;
        } catch (IOException e) {
            throw S3Exception.builder()
                    .message("Error uploading to S3 bucket")
                    .cause(e)
                    .build();
        }

    }
}
