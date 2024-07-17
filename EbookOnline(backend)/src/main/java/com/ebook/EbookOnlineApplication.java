package com.ebook;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class EbookOnlineApplication {

	public static void main(String[] args) {
		SpringApplication.run(EbookOnlineApplication.class, args);
		System.out.println("ebook...");
	}

	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}

}
