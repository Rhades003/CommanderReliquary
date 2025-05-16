package com.lasmagicas.back.Repository;

import com.lasmagicas.back.Model.Card;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;


public interface CardRepository extends MongoRepository<Card, String> {

    //AndLegalitiesCommander
    Page<Card> findAllByLegalitiesCommander(String commander, Pageable pageable);

    Page<Card> findByNameContainingIgnoreCaseAndLegalitiesCommander(String name, String commander, Pageable pageable);


    Page<Card> findByNameContainingIgnoreCaseAndTypeLineContainingIgnoreCaseAndLegalitiesCommander(String name, String type_line, String commander, Pageable pageable);

    @Query("""
            {
              "$and": [
                { "name": { "$regex": ?0, "$options": "i" } },
                { "type_line": { "$regex": ?1, "$options": "i" } },
                { "color_identity": { "$eq": [] } },
                { "rarity": { "$regex": ?2, "$options": "i" } },
                { "$or": [
                    { "oracle_text": { "$regex": ?3, "$options": "i" } },
                    { "card_faces.0.oracle_text": { "$regex": ?3, "$options": "i" } },
                    { "card_faces.1.oracle_text": { "$regex": ?3, "$options": "i" } }
                  ]
                },
                { "set_name": { "$regex": ?4, "$options": "i" } }
              ]
            }
            """)
    Page<Card> findCardsColorless(String name, String typeLine, String rarity, String pasive, String setName, Pageable pageable);


    @Query("""
            {
              "$and": [
                { "name": { "$regex": ?0, "$options": "i" } },
                { "type_line": { "$regex": ?1, "$options": "i" } },
                { "color_identity": { "$eq": [?2] } },
                { "rarity": { "$regex": ?3, "$options": "i" } },
                { "$or": [
                    { "oracle_text": { "$regex": ?4, "$options": "i" } },
                    { "card_faces.0.oracle_text": { "$regex": ?4, "$options": "i" } },
                    { "card_faces.1.oracle_text": { "$regex": ?4, "$options": "i" } }
                  ]
                },
                { "set_name": { "$regex": ?5, "$options": "i" } }
              ]
            }
            """)
    Page<Card> findCardsOneColor(
            String name,
            String type_line,
            String color1,
            String rarity,
            String pasive,
            String setName,
            Pageable pageable
    );


    @Query("""
            {
              "$and": [
                { "name": { "$regex": ?0, "$options": "i" } },
                { "type_line": { "$regex": ?1, "$options": "i" } },
                { "color_identity": { "$eq": [?2, ?3] } },
                { "rarity": { "$regex": ?4, "$options": "i" } },
                { "$or": [
                    { "oracle_text": { "$regex": ?5, "$options": "i" } },
                    { "card_faces.0.oracle_text": { "$regex": ?5, "$options": "i" } },
                    { "card_faces.1.oracle_text": { "$regex": ?5, "$options": "i" } }
                  ]
                },
                { "set_name": { "$regex": ?6, "$options": "i" } }
              ]
            }
            """)
    Page<Card> findCardsTwoColors(
            String name,
            String type_line,
            String color1,
            String color2,
            String rarity,
            String pasive,
            String setName,
            Pageable pageable
    );


    @Query("""
            {
              "$and": [
                { "name": { "$regex": ?0, "$options": "i" } },
                { "type_line": { "$regex": ?1, "$options": "i" } },
                { "color_identity": { "$eq": [?2, ?3, ?4] } },
                { "rarity": { "$regex": ?5, "$options": "i" } },
                { "$or": [
                    { "oracle_text": { "$regex": ?6, "$options": "i" } },
                    { "card_faces.0.oracle_text": { "$regex": ?6, "$options": "i" } },
                    { "card_faces.1.oracle_text": { "$regex": ?6, "$options": "i" } }
                  ]
                },
                { "set_name": { "$regex": ?7, "$options": "i" } }
              ]
            }
            """)
    Page<Card> findCardsThreeColors(
            String name,
            String type_line,
            String color1,
            String color2,
            String color3,
            String rarity,
            String pasive,
            String setName,
            Pageable pageable
    );


    @Query("""
            {
              "$and": [
                { "name": { "$regex": ?0, "$options": "i" } },
                { "type_line": { "$regex": ?1, "$options": "i" } },
                { "color_identity": { "$eq": [?2, ?3, ?4, ?5] } },
                { "rarity": { "$regex": ?6, "$options": "i" } },
                { "$or": [
                    { "oracle_text": { "$regex": ?7, "$options": "i" } },
                    { "card_faces.0.oracle_text": { "$regex": ?7, "$options": "i" } },
                    { "card_faces.1.oracle_text": { "$regex": ?7, "$options": "i" } }
                  ]
                },
                { "set_name": { "$regex": ?8, "$options": "i" } }
              ]
            }
            """)
    Page<Card> findCardsFourColors(
            String name,
            String type_line,
            String color1,
            String color2,
            String color3,
            String color4,
            String rarity,
            String pasive,
            String setName,
            Pageable pageable
    );


    @Query("""
            {
              "$and": [
                { "name": { "$regex": ?0, "$options": "i" } },
                { "type_line": { "$regex": ?1, "$options": "i" } },
                { "color_identity": { "$eq": [?2, ?3, ?4, ?5, ?6] } },
                { "rarity": { "$regex": ?7, "$options": "i" } },
                { "$or": [
                    { "oracle_text": { "$regex": ?8, "$options": "i" } },
                    { "card_faces.0.oracle_text": { "$regex": ?8, "$options": "i" } },
                    { "card_faces.1.oracle_text": { "$regex": ?8, "$options": "i" } }
                  ]
                },
                { "set_name": { "$regex": ?9, "$options": "i" } }
              ]
            }
            """)
    Page<Card> findCardsFiveColors(String name, String type_line, String color1, String color2, String color3, String color4, String color5, String rarity, String pasive, String setName, Pageable pageable);
}



