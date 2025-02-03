package com.lasmagicas.back.Controller;

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
    public Deck create(@RequestBody Deck deck) {

        Optional<User> user = userRepository.findById(deck.getUser().getId());
        logger.info("----------------------------------------------------"+user);
        System.out.println("//////////////////////////////////////////////"+user);
        if (user.isPresent()) {
            deckRepository.save(deck);
        return deck;
        }
        return null;
    }

    @CrossOrigin(origins = {"http://localhost:3000", "http://192.168.1.137:3000"})
    @GetMapping("/getDecks/{id_user}")
    public @ResponseBody List<Deck> getDecksByUser(@PathVariable long id_user) {
        //return deckRepository.findAll(Pageable.ofSize(25));
        Optional<User> user = userRepository.findById(id_user);

        logger.info("----------------------------------------------------"+user);
        if(user != null) return user.get().getDecks();
            //return deckRepository.findByUser(user);
        else return null;
    }
}
