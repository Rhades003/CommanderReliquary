package com.lasmagicas.back;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CardController {

    @Autowired
    private CardRepository cardRepository;


    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/getAllCard/{index}")
    public Page<Card> getAllUser(@PathVariable int index){
        cardRepository.findAll(Pageable.ofSize(25));
        return cardRepository.findAll(Pageable.ofSize(25).withPage(index));
    }


    public CardController(CardRepository cardRepository) {
        this.cardRepository = cardRepository;
    }
}
