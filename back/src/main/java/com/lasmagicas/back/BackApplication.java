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

		CardRepository cardRepository = new CardRepository() {
			@Override
			public Page<Card> findAllByLegalitiesCommander(String commander, Pageable pageable) {
				return null;
			}

			@Override
			public Page<Card> findByNameContainingIgnoreCaseAndLegalitiesCommander(String name, String commander, Pageable pageable) {
				return null;
			}

			@Override
			public Page<Card> findByNameContainingIgnoreCaseAndTypeLineContainingIgnoreCaseAndLegalitiesCommander(String name, String type_line, String commander, Pageable pageable) {
				return null;
			}

			@Override
			public Page<Card> prueba(Pageable pageable) {
				return null;
			}

			@Override
			public <S extends Card> S insert(S entity) {
				return null;
			}

			@Override
			public <S extends Card> List<S> insert(Iterable<S> entities) {
				return List.of();
			}

			@Override
			public <S extends Card> List<S> findAll(Example<S> example) {
				return List.of();
			}

			@Override
			public <S extends Card> List<S> findAll(Example<S> example, Sort sort) {
				return List.of();
			}

			@Override
			public <S extends Card> List<S> saveAll(Iterable<S> entities) {
				return List.of();
			}

			@Override
			public List<Card> findAll() {
				return List.of();
			}

			@Override
			public List<Card> findAllById(Iterable<String> strings) {
				return List.of();
			}

			@Override
			public <S extends Card> S save(S entity) {
				return null;
			}

			@Override
			public Optional<Card> findById(String s) {
				return Optional.empty();
			}

			@Override
			public boolean existsById(String s) {
				return false;
			}

			@Override
			public long count() {
				return 0;
			}

			@Override
			public void deleteById(String s) {

			}

			@Override
			public void delete(Card entity) {

			}

			@Override
			public void deleteAllById(Iterable<? extends String> strings) {

			}

			@Override
			public void deleteAll(Iterable<? extends Card> entities) {

			}

			@Override
			public void deleteAll() {

			}

			@Override
			public List<Card> findAll(Sort sort) {
				return List.of();
			}

			@Override
			public Page<Card> findAll(Pageable pageable) {
				return null;
			}

			@Override
			public <S extends Card> Optional<S> findOne(Example<S> example) {
				return Optional.empty();
			}

			@Override
			public <S extends Card> Page<S> findAll(Example<S> example, Pageable pageable) {
				return null;
			}

			@Override
			public <S extends Card> long count(Example<S> example) {
				return 0;
			}

			@Override
			public <S extends Card> boolean exists(Example<S> example) {
				return false;
			}

			@Override
			public <S extends Card, R> R findBy(Example<S> example, Function<FluentQuery.FetchableFluentQuery<S>, R> queryFunction) {
				return null;
			}
		};

		Pageable pageable  = PageRequest.of(0, 100);
		Page<Card> ej = cardRepository.prueba(pageable);

		System.out.println(ej);
	}

}
