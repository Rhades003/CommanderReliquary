package com.lasmagicas.back.Controller;

import com.lasmagicas.back.DTO.DeckDto;
import com.lasmagicas.back.Model.Card;
import com.lasmagicas.back.Model.Deck;
import com.lasmagicas.back.Model.User;
import com.lasmagicas.back.Repository.DeckRepository;
import com.lasmagicas.back.Repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("decks")
public class DeckController {

    private static final Logger logger = LoggerFactory.getLogger(DeckController.class);

    @Autowired
    private DeckRepository deckRepository;
    @Autowired
    private UserRepository userRepository;

    @CrossOrigin(origins = {"http://localhost:3000", "http://192.168.1.137:3000"})
    @PostMapping("/createDeck")
    public Deck create(@RequestBody DeckDto deck) {

        Optional<User> user = userRepository.findById(deck.getId());

        if (user.isPresent()) {
            System.out.println(deck.getId());
            System.out.println(deck.getUserId());
            System.out.println(deck.getName());
            //deckRepository.save(deck);
            //System.out.println(deck.getId());
        //return deck;
        }
        return null;
    }

    @CrossOrigin(origins = {"http://localhost:3000", "http://192.168.1.137:3000"})
    @GetMapping("/getDecks/{id_user}")
    public @ResponseBody List<DeckDto> getDecksByUser(@PathVariable long id_user) {
        //return deckRepository.findAll(Pageable.ofSize(25));
        Optional<User> user = userRepository.findById(id_user);

        if(user != null) return user.get().getDecks().stream().map(DeckDto::new).collect(Collectors.toList());
            //return deckRepository.findByUser(user);
        else return null;
    }

    public void setCardDeck(){

    }
}
