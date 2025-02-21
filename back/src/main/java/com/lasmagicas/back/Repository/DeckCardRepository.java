package com.lasmagicas.back.Repository;

import com.lasmagicas.back.Model.Card;
import com.lasmagicas.back.Model.DeckCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface DeckCardRepository extends JpaRepository<DeckCard,String> {
}
