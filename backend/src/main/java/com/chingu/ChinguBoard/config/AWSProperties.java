package com.chingu.ChinguBoard.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("aws")
public record AWSProperties(String accessKeyId, String secretKey) {
    
}
