package com.lasmagicas.back.Controller;

import com.lasmagicas.back.DTO.DeckCardResponse;
import com.lasmagicas.back.DTO.DeckResponse;
import com.lasmagicas.back.Model.Card;
import com.lasmagicas.back.Model.Deck;
import com.lasmagicas.back.Model.DeckCard;
import com.lasmagicas.back.Model.User;
import com.lasmagicas.back.Repository.DeckCardRepository;
import com.lasmagicas.back.Repository.DeckRepository;
import com.lasmagicas.back.Repository.UserRepository;
import com.lasmagicas.back.security.JwtUtil;
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

@CrossOrigin(origins = "http://127.0.0.1:3000")
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

    JwtUtil jwtUtil = new JwtUtil();

    @CrossOrigin(origins = {"http://localhost:3000", "http://192.168.1.137:3000"})
    @PostMapping("/createDeck")
    public DeckResponse create(@RequestBody DeckResponse deck) {
        Optional<User> user = userRepository.findById(10L);

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


        return deck;
        }
        return null;
    }

    public @ResponseBody List<DeckCard> getAllCardsFromDeck(@PathVariable long deck_id) {
        return deckCardRepository.findByDeck_Id(deck_id);
    }


    @CrossOrigin(origins = {"http://localhost:3000", "http://192.168.1.137:3000"})
    @GetMapping("/getDecks")
    public @ResponseBody List<DeckResponse> getDecksByUser(@RequestHeader("Authorization") String token) {

        String email = jwtUtil.getEmailFromToken(token);
        System.out.println("email es este: "+email);
        Optional<User> user = userRepository.findByEmail(email);
        System.out.println("Id es este: "+user.get().getId());
        if(user.isPresent()) {

            List<DeckResponse> decks = user.get().getDecks().stream().map(DeckResponse::new).collect(toList());

            decks.forEach((deck) -> {
                Optional<Card> cardCommander = cardController.getCard(deck.getCommander());
                deck.setCommanderInfo(cardCommander);
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
    @GetMapping("/{id_deck}/card/{id_card}")
    public DeckCardResponse setCardDeck(@PathVariable long id_deck, @PathVariable String id_card){


        Optional<Deck> deck = deckRepository.findById(id_deck);
        if (deck.isPresent()) {
            System.out.println(id_card);
            deck.get().getDeckCards().forEach(c -> System.out.println(c.getId_card()));
            if(deck.get().getDeckCards().stream().anyMatch(b -> b.getId_card().equals(id_card))){
                return null;
            }


            Deck deckEntity = deck.get();
            // No es necesario crear un nuevo objeto Deck
            DeckCard deckCard = new DeckCard(deckEntity, id_card);

            deckCardRepository.save(deckCard);
            Optional<Card> card = cardController.getCard(id_card);
            if(card.isPresent()) {
                Card cardNormal = card.get();
                DeckCardResponse deckCardResponse = new DeckCardResponse(deckCard, cardNormal);// Guarda el DeckCard
                return deckCardResponse;
            }
            return null;

        }
        return null;
    }

    @Transactional
    @CrossOrigin(origins = {"http://localhost:3000", "http://192.168.1.137:3000"})
    @DeleteMapping("/{id_deck}/card/{id_card}")
    public String deleteCardDeck(@PathVariable long id_deck, @PathVariable String id_card){

        //Optional<Deck> deck = deckRepository.findById(id_deck);
        List<DeckCard> deckCards = deckCardRepository.findByDeck_Id(id_deck);
        Optional<DeckCard> deckCardOptional = deckCards.stream().filter(a -> a.getId_card().equals(id_card)).findFirst();

        if (deckCardOptional.isPresent()) {
            DeckCard deckCard = deckCardOptional.get();
            deckCardRepository.delete(deckCard);
            return "Deleted card with id: "+id_card;
        }

        return null;
    }
}
