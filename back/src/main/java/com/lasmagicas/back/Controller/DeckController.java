package com.lasmagicas.back.Controller;

import com.lasmagicas.back.DTO.DeckResponse;
import com.lasmagicas.back.Model.Card;
import com.lasmagicas.back.Model.Deck;
import com.lasmagicas.back.Model.DeckCard;
import com.lasmagicas.back.Model.User;
import com.lasmagicas.back.Repository.DeckCardRepository;
import com.lasmagicas.back.Repository.DeckRepository;
import com.lasmagicas.back.Repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static java.util.stream.Collectors.toList;

@RestController
@RequestMapping("decks")
@Slf4j
public class DeckController {
    private static final Logger logger = LoggerFactory.getLogger(DeckController.class);

    @Autowired
    private DeckRepository deckRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private DeckCardRepository deckCardRepository;

    @Autowired
    private CardController cardController;

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

            //Forma nueva
            deckEntity.setUser(user.orElseThrow());

            deckRepository.save(deckEntity);
            System.out.println(deckEntity.getId()+" "+  deckEntity.getCommander()+" "+ deckEntity.getUser()+" "+deckEntity.getIdentity()+" "+ deckEntity.getName());
        //return deck;
        }
        return null;
    }

    public @ResponseBody List<DeckCard> getAllCardsFromDeck(@PathVariable long deck_id) {
        return deckCardRepository.findByDeck_Id(deck_id);
    }


    @CrossOrigin(origins = {"http://localhost:3000", "http://192.168.1.137:3000"})
    @GetMapping("/getDecks/{id_user}")
    public @ResponseBody List<DeckResponse> getDecksByUser(@PathVariable long id_user) {

        Optional<User> user = userRepository.findById(id_user);
        if(user.isPresent()) {

            //return user.get().getDecks().stream().map(DeckResponse::new).collect(toList());
            List<DeckResponse> decks = user.get().getDecks().stream().map(DeckResponse::new).collect(toList());

            decks.forEach((deck) -> {
                List<Optional<Card>> cards = new ArrayList<>();
                List<DeckCard> decksCards= getAllCardsFromDeck(deck.getId());

                    decksCards.forEach((deckCard -> {

                        Optional<Card> card = cardController.getCard(deckCard.getId_card());
                        if(card.isPresent()) cards.add(cardController.getCard(deckCard.getId_card()));

                    }));

                deck.setCards(cards);
            });
            return decks;
        }

        else return null;
    }

    @Transactional
    @CrossOrigin(origins = {"http://localhost:3000", "http://192.168.1.137:3000"})
    @GetMapping("/{id_deck}/cards/{id_card}")
    public void setCardDeck(@PathVariable long id_deck, @PathVariable String id_card){


        Optional<Deck> deck = deckRepository.findById(id_deck);
        if (deck.isPresent()) {
            Deck deckEntity = deck.get();  // No es necesario crear un nuevo objeto Deck
            DeckCard deckCard = new DeckCard(deckEntity, id_card);

            deckCardRepository.save(deckCard);  // Guarda el DeckCard
        }
    }
}
