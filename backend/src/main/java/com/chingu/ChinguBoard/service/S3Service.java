package com.chingu.ChinguBoard.service;

import org.springframework.stereotype.Service;

import software.amazon.awssdk.services.s3.S3Client;

@Service
public class S3Service {

    private final S3Client s3Client;

    static final String BUCKET_NAME = "chinguboard-dev";

    public S3Service(S3Client s3Client) {
        this.s3Client = s3Client;
    }

    public void upload() {
        
    }
}
