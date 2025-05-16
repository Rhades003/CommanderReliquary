package com.lasmagicas.back;

import com.lasmagicas.back.Model.Card;
import com.lasmagicas.back.Repository.CardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.domain.*;
import org.springframework.data.repository.query.FluentQuery;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;

@SpringBootApplication
public class BackApplication {



	public static void main(String[] args) {
		SpringApplication.run(BackApplication.class, args);
	}

}
