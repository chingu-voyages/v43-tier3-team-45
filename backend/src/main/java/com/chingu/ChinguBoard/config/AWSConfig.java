package com.chingu.ChinguBoard.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

@Configuration
public class AWSConfig {

    private final AWSProperties awsProperties;

    public AWSConfig(AWSProperties awsProperties) {
        this.awsProperties = awsProperties;
    }

    @Bean
    public S3Client s3Client() {
        AwsBasicCredentials basicCredentials = AwsBasicCredentials.create(awsProperties.accessKeyId(),
                awsProperties.secretKey());
        StaticCredentialsProvider staticCredentialsProvider = StaticCredentialsProvider.create(basicCredentials);
        Region region = Region.US_EAST_2;
        return S3Client.builder().region(region).credentialsProvider(staticCredentialsProvider).build();
    }

}
