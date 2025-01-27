package com.lasmagicas.back.Controller;

import com.lasmagicas.back.Repository.CardRepository;
import com.lasmagicas.back.Model.Card;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("cards")
public class CardController {

    @Autowired
    private CardRepository cardRepository;


    @CrossOrigin(origins = {"http://localhost:3000", "http://192.168.1.137:3000"})
    @GetMapping("/{index}")
    public Page<Card> getAllCards(@PathVariable int index){
        return cardRepository.findAll(Pageable.ofSize(25).withPage(index));
    }

    @CrossOrigin(origins = {"http://localhost:3000", "http://192.168.1.137:3000"})
    @GetMapping("/getAllCard")
    public List<Card> getAllCards(){
        cardRepository.findAll();
        return cardRepository.findAll();
    }


    public CardController(CardRepository cardRepository) {
        this.cardRepository = cardRepository;
    }
}
