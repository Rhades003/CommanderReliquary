package com.lasmagicas.back.Repository;

import com.lasmagicas.back.Model.Card;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;


public interface CardRepository extends MongoRepository<Card,String>{

    //AndLegalitiesCommander
    Page<Card> findAllByLegalitiesCommander(String commander, Pageable pageable);
    Page<Card> findByNameContainingIgnoreCaseAndLegalitiesCommander(String name ,String commander ,Pageable pageable);

}
