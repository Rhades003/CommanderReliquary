package com.lasmagicas.back;

import com.lasmagicas.back.Model.Card;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface CardRepository extends MongoRepository<Card,String>{
}
