package com.timmhus104.Tmultitool;

import com.timmhus104.Tmultitool.repo.EventRepo;
import com.timmhus104.Tmultitool.repo.UserRepo;
import com.timmhus104.Tmultitool.repo.todoRepo.TodoListRepo;
import com.timmhus104.Tmultitool.service.Pusher;
import jakarta.annotation.Nonnull;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.IOException;
import java.net.URISyntaxException;

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
            .allowedOrigins("https://tims-multitool.vercel.app", "https://tims-multitool-git-main-tymoteuszmh.vercel.app", "https://tims-multitool-tymoteuszmh.vercel.app", "http://localhost:4200")
            .allowedMethods("*");
      }
    };
  }

    @Bean
    public Pusher pusher(UserRepo userRepo, EventRepo eventRepo, TodoListRepo todoListRepo) {
        return new Pusher(userRepo, eventRepo, todoListRepo);
    }

    @Scheduled(cron = "0 0 6 * * *")
    public void scheduleSendNotification() throws IOException, URISyntaxException, InterruptedException {
        ConfigurableApplicationContext context = SpringApplication.run(TmultitoolApplication.class);
        Pusher pusher = context.getBean(Pusher.class);
        pusher.sendNotification();
        context.close();
    }
}
