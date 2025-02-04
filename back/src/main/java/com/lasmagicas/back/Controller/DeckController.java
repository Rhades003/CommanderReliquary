package com.lasmagicas.back.Controller;

import com.lasmagicas.back.DTO.DeckDto;
import com.lasmagicas.back.Model.Deck;
import com.lasmagicas.back.Model.User;
import com.lasmagicas.back.Repository.DeckRepository;
import com.lasmagicas.back.Repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toList;

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
        //System.out.println(request.uri().getUserInfo());
        Optional<User> user = userRepository.findById(1L);

        if (user.isPresent()) {
            deck.setUserId(user.get().getId());
            Deck deckEntity = new Deck();
            deckEntity.setName(deck.getName());
            deckEntity.setCommander(deck.getCommander());
            deckEntity.setIdentity(deck.getIdentity());

            //List<User> userrr = user.stream().map(User::new).toList();
            User userrr = new User();
            userrr.setId(user.get().getId());
            userrr.setCreatedAt(user.get().getCreatedAt());
            userrr.setDecks(user.get().getDecks());
            userrr.setName(user.get().getName());
            userrr.setEmail(user.get().getEmail());
            userrr.setPassword(user.get().getPassword());
            deckEntity.setUser(userrr);
            deckRepository.save(deckEntity);
            System.out.println(deckEntity.getId()+" "+  deckEntity.getCommander()+" "+ deckEntity.getUser()+" "+deckEntity.getIdentity()+" "+ deckEntity.getName());
        //return deck;
        }
        return null;
    }

    @CrossOrigin(origins = {"http://localhost:3000", "http://192.168.1.137:3000"})
    @GetMapping("/getDecks/{id_user}")
    public @ResponseBody List<DeckDto> getDecksByUser(@PathVariable long id_user) {
        //return deckRepository.findAll(Pageable.ofSize(25));
        //System.out.println(request.uri().getUserInfo());
        ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        System.out.println("---------------------"+attr.getRequest().getSession(true).getId());
        Optional<User> user = userRepository.findById(id_user);

        if(user != null) return user.get().getDecks().stream().map(DeckDto::new).collect(toList());
            //return deckRepository.findByUser(user);
        else return null;
    }

    public void setCardDeck(){

    }
}
