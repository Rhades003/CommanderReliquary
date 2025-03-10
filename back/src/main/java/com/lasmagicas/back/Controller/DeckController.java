package com.lasmagicas.back.Controller;

import com.lasmagicas.back.DTO.DeckResponse;
import com.lasmagicas.back.Model.Card;
import com.lasmagicas.back.Model.Deck;
import com.lasmagicas.back.Model.DeckCard;
import com.lasmagicas.back.Model.User;
//import com.lasmagicas.back.Repository.DeckCardRepository;
import com.lasmagicas.back.Repository.DeckCardRepository;
import com.lasmagicas.back.Repository.DeckRepository;
import com.lasmagicas.back.Repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static java.util.stream.Collectors.toList;

@RestController
@RequestMapping("decks")
public class DeckController {

    private static final Logger logger = LoggerFactory.getLogger(DeckController.class);

    @Autowired
    private DeckRepository deckRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private DeckCardRepository deckCardRepository;

    @CrossOrigin(origins = {"http://localhost:3000", "http://192.168.1.137:3000"})
    @PostMapping("/createDeck")
    public Deck create(@RequestBody DeckResponse deck) {
        //System.out.println(request.uri().getUserInfo());
        Optional<User> user = userRepository.findById(1L);

        if (user.isPresent()) {
            deck.setUserId(user.get().getId());
            Deck deckEntity = new Deck();
            deckEntity.setName(deck.getName());
            deckEntity.setCommander(deck.getCommander());
            deckEntity.setIdentity(deck.getIdentity());

            //List<User> userrr = user.stream().map(User::new).toList();

            //Forma nueva
            deckEntity.setUser(user.orElseThrow());

            /*Forma Old
            User userrr = new User();
            userrr.setId(user.get().getId());
            userrr.setCreatedAt(user.get().getCreatedAt());
            userrr.setDecks(user.get().getDecks());
            userrr.setName(user.get().getName());
            userrr.setEmail(user.get().getEmail());
            userrr.setPassword(user.get().getPassword());
            deckEntity.setUser(userrr);*/
            deckRepository.save(deckEntity);
            System.out.println(deckEntity.getId()+" "+  deckEntity.getCommander()+" "+ deckEntity.getUser()+" "+deckEntity.getIdentity()+" "+ deckEntity.getName());
        //return deck;
        }
        return null;
    }

    @CrossOrigin(origins = {"http://localhost:3000", "http://192.168.1.137:3000"})
    @GetMapping("/getDecks/{id_user}")
    public @ResponseBody List<DeckResponse> getDecksByUser(@PathVariable long id_user) {
        //return deckRepository.findAll(Pageable.ofSize(25));
        //System.out.println(request.uri().getUserInfo());
        //ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        //System.out.println("---------------------"+attr.getRequest().getSession(true).getId());
        Optional<User> user = userRepository.findById(id_user);

        if(user != null) return user.get().getDecks().stream().map(DeckResponse::new).collect(toList());
            //return deckRepository.findByUser(user);
        else return null;
    }

    @Transactional
    @CrossOrigin(origins = {"http://localhost:3000", "http://192.168.1.137:3000"})
    @GetMapping("/{id_deck}/cards/{id_card}")
    public void setCardDeck(@PathVariable long id_deck, @PathVariable String id_card){

        //puedes ir a base de datos a checkar que los ids existen
        Optional<Deck> deck = deckRepository.findById(1L);
        if (deck.isPresent()) {
            Deck deck1 = new Deck();
            deck1.setId(id_deck);
            DeckCard deckCard = new DeckCard(deck1, id_card);
            System.out.println("-------------PRINT------------------------");
            System.out.println("Crd: "+deckCard.getId_card()+" Deck: "+deckCard.getDeck().getId()+" Id_Propio del deckCard:"+deckCard.getId());
            System.out.println("------------------------------------------");
            deckCardRepository.save(deckCard);
        }

        //DeckCard  se compone de Card y Deck
        //creamos un objeto del deckCard con los ids, invoco al repo.save y se lo paso.

    }
}
