package com.timmhus104.Tmultitool;

import jakarta.annotation.Nonnull;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
@SpringBootApplication
public class TmultitoolApplication {

	public static void main(String[] args) {
		SpringApplication.run(TmultitoolApplication.class, args);
	}
  @Bean
  public WebMvcConfigurer corsConfigurer() {
    return new WebMvcConfigurer() {
      @Override
      public void addCorsMappings(@Nonnull CorsRegistry registry) {
        registry.addMapping("/**")
            .allowedOrigins("https://tims-multitool.vercel.app", "https://tims-multitool-git-main-tymoteuszmh.vercel.app", "https://tims-multitool-tymoteuszmh.vercel.app")
            .allowedMethods("*");
      }
    };
  }
}
