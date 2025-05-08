package com.lasmagicas.back.Controller;

import com.lasmagicas.back.Repository.CardRepository;
import com.lasmagicas.back.Model.Card;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://127.0.0.1:3000")
@RestController
@RequestMapping("cards")
public class CardController {

    @Autowired
    private CardRepository cardRepository;


    @CrossOrigin(origins = {"http://localhost:3000", "http://192.168.1.137:3000"})
    @GetMapping("/getAllCards/{index}")
    public Page<Card> getAllCards(@PathVariable int index){
        return cardRepository.findAll(Pageable.ofSize(25).withPage(index));
    }

    @CrossOrigin(origins = {"http://localhost:3000", "http://192.168.1.137:3000"})
    @GetMapping("card/{id}")
    public Optional<Card> getCard(@PathVariable String id){
        return cardRepository.findById(id);
    }
    @CrossOrigin(origins = {"http://localhost:3000", "http://192.168.1.137:3000"})
    @GetMapping("/card")
    public List<Card> getCardByName(@RequestParam String name){
        Pageable pageable = PageRequest.of(0, 100);
        //return cardRepository.findByNameContainingIgnoreCase(name, pageable);
        Page page = cardRepository.findByNameContainingIgnoreCase(name, pageable);

        List<Card> listCards = page.getContent();

        List<Card> filterCards = listCards.stream()
                .collect(Collectors.toMap(
                        Card::getName,
                        card -> card,
                        (existing, replacement) -> existing))
                .values()
                .stream()
                .collect(Collectors.toList());

        filterCards.forEach(card -> System.out.println(card.getName()));
        return filterCards;
    }


    public CardController(CardRepository cardRepository) {
        this.cardRepository = cardRepository;
    }
}
