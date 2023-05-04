package com.timmhus104.Tmultitool;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class TmultitoolApplication {

	public static void main(String[] args) {
		SpringApplication.run(TmultitoolApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer()
	{
		String[] allowDomains = new String[3];
		allowDomains[0] = "http://localhost:4200";
		allowDomains[1] = "http://192.168.1.102:8081";
		allowDomains[2] = "http://localhost:8080";

		System.out.println("CORS configuration....");
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(@NonNull CorsRegistry registry) {
				registry.addMapping("/**").allowedOrigins(allowDomains);
			}
		};
	}
}
