package com.ebook.configuration;

import java.util.Arrays;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@Configuration
@EnableWebMvc
public class CorsConfig {

	private static final Long MAX_AGE = 3600L; // 1 hour
	private static final int CORS_FILTER_ORDER = -102;

	@Bean
	public CorsFilter corsFilter() {
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		CorsConfiguration config = new CorsConfiguration();
		config.setAllowCredentials(true);
		config.addAllowedOrigin("http://localhost:5173");
		config.setAllowedHeaders(
				Arrays.asList(
						HttpHeaders.AUTHORIZATION, 
						HttpHeaders.CONTENT_TYPE, 
						HttpHeaders.ACCEPT));
		config.setAllowedMethods(Arrays.asList(
				HttpMethod.GET.name(), 
				HttpMethod.POST.name(), 
				HttpMethod.PUT.name(),
				HttpMethod.DELETE.name()));
		config.setMaxAge(MAX_AGE);
		source.registerCorsConfiguration("/**", config);
		return new CorsFilter(source);
	}

	@Bean
	public FilterRegistrationBean<CorsFilter> corsFilterRegistration() {
		FilterRegistrationBean<CorsFilter> registrationBean = new FilterRegistrationBean<>(corsFilter());
		registrationBean.setOrder(CORS_FILTER_ORDER); // Ensure this filter is registered first
		return registrationBean;
	}

}
