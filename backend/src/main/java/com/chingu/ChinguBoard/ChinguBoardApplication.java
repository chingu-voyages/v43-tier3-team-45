package com.chingu.ChinguBoard;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import com.chingu.ChinguBoard.config.RSAKeyProperties;

@SpringBootApplication
@EnableConfigurationProperties(RSAKeyProperties.class)
public class ChinguBoardApplication {

	public static void main(String[] args) {
		SpringApplication.run(ChinguBoardApplication.class, args);
	}

}
