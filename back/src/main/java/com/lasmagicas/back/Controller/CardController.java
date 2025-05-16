package com.lasmagicas.back.Controller;

import com.lasmagicas.back.Model.Filter;
import com.lasmagicas.back.Repository.CardRepository;
import com.lasmagicas.back.Model.Card;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.bson.Document;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://127.0.0.1:3000")
@RestController
@RequestMapping("cards")
public class CardController {

    @Autowired
    private CardRepository cardRepository;

    private static final List<String> MTG_ORDER = Arrays.asList("B", "G", "R", "U", "W");


    @CrossOrigin(origins = {"http://localhost:3000", "http://192.168.1.137:3000"})
    @GetMapping("/getAllCards/{index}")
    public Page<Card> getAllCards(@PathVariable int index) {
        return cardRepository.findAllByLegalitiesCommander("legal", Pageable.ofSize(100).withPage(index));
    }

    @CrossOrigin(origins = {"http://localhost:3000", "http://192.168.1.137:3000"})
    @GetMapping("/getRandomCard")
    public Page<Card> getRandomCards() {
        Random random = new Random();
        Page<Card> page = cardRepository.findAllByLegalitiesCommander("legal", Pageable.ofSize(1));
        int randomNumber = random.nextInt(1, page.getTotalPages());
        return cardRepository.findAllByLegalitiesCommander("legal", Pageable.ofSize(1).withPage(randomNumber));
    }

    @CrossOrigin(origins = {"http://localhost:3000", "http://192.168.1.137:3000"})
    @GetMapping("card/{id}")
    public Optional<Card> getCard(@PathVariable String id) {
        return cardRepository.findById(id);
    }


    @CrossOrigin(origins = {"http://localhost:3000", "http://192.168.1.137:3000"})
    @GetMapping("/card")
    public List<Card> getCardByName(@RequestParam String name) {
        Pageable pageable = PageRequest.of(0, 100);
        //return cardRepository.findByNameContainingIgnoreCase(name, pageable);
        Page page = cardRepository.findByNameContainingIgnoreCaseAndLegalitiesCommander(name, "legal", pageable);

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

    @CrossOrigin(origins = {"http://localhost:3000", "http://192.168.1.137:3000"})
    @GetMapping("/legendary/card")
    public List<Card> getLegendaryCardByName(@RequestParam String name) {
        Pageable pageable = PageRequest.of(0, 5);

        Page page = cardRepository.findByNameContainingIgnoreCaseAndTypeLineContainingIgnoreCaseAndLegalitiesCommander(name,"Legendary Creature", "legal",  pageable);

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


    @CrossOrigin(origins = {"http://localhost:3000", "http://192.168.1.137:3000"})
    @PostMapping("/megaFilter")
    public Page<Card> megaFilter(@RequestBody Filter filter){


        Pageable pageable = PageRequest.of(0, 20);
        System.out.println("-----------------------------------------------------------------");
        System.out.println(filter.getColorIdentity().size());
        Page<Card> result = null;
        filter.setColorIdentity(ordenarColoresMtg(filter.getColorIdentity()));
        System.out.println(filter.toString());

        if(filter.getColorIdentity().isEmpty()) {
            result = cardRepository.findCardsColorless(
                    filter.getName(),
                    filter.getTypeLine(),
                    filter.getRarity(),
                    filter.getPasive(),
                    filter.getCmc(),
                    pageable
            );
        }

        if(filter.getColorIdentity().size() == 1) {
            result = cardRepository.findCardsOneColor(
                    filter.getName(),
                    filter.getTypeLine(),
                    filter.getColorIdentity().get(0),
                    filter.getRarity(),
                    filter.getPasive(),
                    filter.getCmc(),
                    pageable
            );
        }
        if(filter.getColorIdentity().size() == 2) {
            result = cardRepository.findCardsTwoColors(
                    filter.getName(),
                    filter.getTypeLine(),
                    filter.getColorIdentity().get(0),
                    filter.getColorIdentity().get(1),
                    filter.getRarity(),
                    filter.getPasive(),
                    filter.getCmc(),
                    pageable);
        }
        if(filter.getColorIdentity().size() == 3) {
            result = cardRepository.findCardsThreeColors(
                    filter.getName(),
                    filter.getTypeLine(),
                    filter.getColorIdentity().get(0),
                    filter.getColorIdentity().get(1),
                    filter.getColorIdentity().get(2),
                    filter.getRarity(),
                    filter.getPasive(),
                    filter.getCmc(),
                    pageable);
        }
        if(filter.getColorIdentity().size() == 4) {
            result = cardRepository.findCardsFourColors(
                    filter.getName(),
                    filter.getTypeLine(),
                    filter.getColorIdentity().get(0),
                    filter.getColorIdentity().get(1),
                    filter.getColorIdentity().get(2),
                    filter.getColorIdentity().get(3),
                    filter.getRarity(),
                    filter.getPasive(),
                    filter.getCmc(),
                    pageable);
        }
        if (filter.getColorIdentity().size() == 5){
            result = cardRepository.findCardsFiveColors(
                    filter.getName(),
                    filter.getTypeLine(),
                    filter.getColorIdentity().get(0),
                    filter.getColorIdentity().get(1),
                    filter.getColorIdentity().get(2),
                    filter.getColorIdentity().get(3),
                    filter.getColorIdentity().get(4),
                    filter.getRarity(),
                    filter.getPasive(),
                    filter.getCmc(),
                    pageable);
        }

        System.out.println("llego muy lejos");

        return result;
    }

    public static List<String> ordenarColoresMtg(List<String> colores) {
        return colores.stream()
                .sorted(Comparator.comparingInt(MTG_ORDER::indexOf))
                .collect(Collectors.toList());
    }

}
