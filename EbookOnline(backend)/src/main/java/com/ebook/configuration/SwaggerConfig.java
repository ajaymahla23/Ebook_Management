package com.ebook.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;

@Configuration
public class SwaggerConfig {
	
	@Bean
	public OpenAPI openAPI() {
		
		return new OpenAPI().info(new Info()
				.title("Book Management API")
				.description("this is book mangagemetn api")
				.version("1.0")
				.license(new License().name("Apache")));
		
	}

}
