package com.lasmagicas.back.Repository;

import com.lasmagicas.back.Model.Card;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;


public interface CardRepository extends MongoRepository<Card,String>{

    //AndLegalitiesCommander
    Page<Card> findAllByLegalitiesCommander(String commander, Pageable pageable);
    Page<Card> findByNameContainingIgnoreCaseAndLegalitiesCommander(String name ,String commander ,Pageable pageable);


    Page<Card> findByNameContainingIgnoreCaseAndTypeLineContainingIgnoreCaseAndLegalitiesCommander(String name,String type_line, String commander, Pageable pageable);

    //    $and [
    //      {type_line: RegExp("creature", "i")},
    //      {type_line: RegExp("legendary", "i")}
    //    ]
    //{ color_identity: { $eq: ["B", "U"] }, type_line: RegExp("legendary", "i" $and "", "i")}
    //          Name IgnoreMayus                 TypeLine Ignore Mayus          Legal in commander    OracleText Ignore Mayus       Rarity


    //findByNameContainingIgnoreCaseAndTypeLineContainingIgnoreCaseAndLegalitiesCommanderAndOracleTextContainingIgnoreCaseAndRarityAndManaCost
    @Query ("{ and: [ {type_line: RegExp('creature', 'i')}, {type_line: RegExp('legendary', 'i')} ], color_identity: { $eq: ['W'] }, name: RegExp('akroma', 'i'), $and: [ {keywords: RegExp('flying', 'i')}, {keywords: RegExp('first Strike', 'i')}]}")
    Page<Card> prueba( Pageable pageable);
    //String name,String type_line, String commander,
}
