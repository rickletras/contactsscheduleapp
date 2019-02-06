package com.contactSchedule.springmysql;

import java.util.stream.LongStream;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;

import com.contactSchedule.controller.ContactController;
import com.contactSchedule.springmysql.model.Contact;
import com.contactSchedule.springmysql.repository.ContactRepository;

@SpringBootApplication
@ComponentScan(basePackageClasses = ContactController.class)
public class SpringMysqlApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringMysqlApplication.class, args);
	}
	
	@Bean
	CommandLineRunner init(ContactRepository repository) {
		return args -> {
			repository.deleteAll();
			LongStream.range(1, 11)
					.mapToObj(i -> new Contact(i, "Contact " + i, "contact" + i + "@email.com", "(111) 111-1111"))
					.map(v -> repository.save(v))
					.forEach(System.out::println);
		};

	}

}

