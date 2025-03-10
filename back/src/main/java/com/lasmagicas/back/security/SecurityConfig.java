package com.lasmagicas.back.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        return http.authorizeHttpRequests(request ->
                request.requestMatchers("/cards/**").permitAll()
                        .requestMatchers("/users/**").permitAll()
                        .requestMatchers("/decks/**").permitAll()
                        .requestMatchers("/decks/create").permitAll()
                        .requestMatchers("/decks/**").permitAll()
                        .requestMatchers("/decks/getDecks/**").permitAll()
                        .requestMatchers("/decks/{id_deck}/cards/{id_card}").permitAll()
                        //.authenticated()
                )
                .formLogin(Customizer.withDefaults())
                .httpBasic(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.disable())
                .build();

    }
}
