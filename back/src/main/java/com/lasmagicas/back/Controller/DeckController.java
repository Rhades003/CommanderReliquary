package com.lasmagicas.back.Controller;

import com.lasmagicas.back.DTO.DeckCardResponse;
import com.lasmagicas.back.DTO.DeckResponse;
import com.lasmagicas.back.Model.Card;
import com.lasmagicas.back.Model.Deck;
import com.lasmagicas.back.Model.DeckCard;
import com.lasmagicas.back.Model.User;
import com.lasmagicas.back.Repository.CardRepository;
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
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicReference;

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
    private CardRepository cardRepository;

    @Autowired
    private CardController cardController;

    JwtUtil jwtUtil = new JwtUtil();

    public @ResponseBody List<DeckCard> getAllCardsFromDeck(@PathVariable long deck_id) {
        return deckCardRepository.findByDeck_Id(deck_id);
    }

    @CrossOrigin(origins = {"http://localhost:3000", "http://192.168.1.137:3000"})
    @PostMapping("/createDeck")
    public DeckResponse create(@RequestBody DeckResponse deck, @RequestHeader("Authorization") String token) {

        String email = jwtUtil.getEmailFromToken(token);
        System.out.println("email es este: " + email);
        Optional<User> user = userRepository.findByEmail(email);

        if (user.isPresent()) {
            deck.setUserId(user.get().getId());
            Deck deckEntity = new Deck();
            deckEntity.setName(deck.getName());
            deckEntity.setCommander(deck.getCommander());
            deckEntity.setIdentity(deck.getIdentity());

            //Forma nueva
            deckEntity.setUser(user.orElseThrow());

            deckRepository.save(deckEntity);
            System.out.println(deckEntity.getId() + " " + deckEntity.getCommander() + " " + deckEntity.getUser() + " " + deckEntity.getIdentity() + " " + deckEntity.getName());


            return deck;
        }
        return null;
    }

    @CrossOrigin(origins = {"http://localhost:3000", "http://192.168.1.137:3000"})
    @DeleteMapping("/deleteDeck/{id}")
    public String delete(@PathVariable long id, @RequestHeader("Authorization") String token) {
        String email = jwtUtil.getEmailFromToken(token);
        System.out.println("email es este: " + email);
        Optional<User> user = userRepository.findByEmail(email);

        if (user.isPresent()) {
            Optional<Deck> deck = deckRepository.findById(id);
            if(user.get().getId() == deck.get().getUser().getId()) {
                deckRepository.deleteById(id);
                return "Deck con id: "+id+"eliminado con éxito";
            }
            return "Error no tienes permisos sobre este deck";
        }
        return "Error usuario no encontrado";
    }

    @CrossOrigin(origins = {"http://localhost:3000", "http://192.168.1.137:3000"})
    @GetMapping("/getDecks")
    public @ResponseBody List<DeckResponse> getDecksByUser(@RequestHeader("Authorization") String token) {


        String email = jwtUtil.getEmailFromToken(token);
        System.out.println("email es este: " + email);
        Optional<User> user = userRepository.findByEmail(email);
        //System.out.println("Id es este: " + user.get().getId());
        if (user.isPresent()) {

            List<DeckResponse> decks = user.get().getDecks().stream().map(DeckResponse::new).collect(toList());

            decks.forEach((deck) -> {
                Optional<Card> cardCommander = cardController.getCard(deck.getCommander());
                deck.setCommanderInfo(cardCommander);
                List<Optional<Card>> cards = new ArrayList<>();
                List<DeckCard> decksCards = getAllCardsFromDeck(deck.getId());

                decksCards.forEach((deckCard -> {

                    Optional<Card> card = cardController.getCard(deckCard.getId_card());
                    if (card.isPresent()) cards.add(cardController.getCard(deckCard.getId_card()));

                }));

                deck.setCards(cards);
            });
            return decks;
        } else return null;
    }

    @Transactional
    @CrossOrigin(origins = {"http://localhost:3000", "http://192.168.1.137:3000"})
    @GetMapping("/{id_deck}/card/{id_card}")
    public DeckCardResponse setCardDeck(@PathVariable long id_deck, @PathVariable String id_card) {

        Optional<Card> card = cardController.getCard(id_card);
        Optional<Deck> deck = deckRepository.findById(id_deck);

        if (deck.isPresent()) {
            System.out.println(id_card);
            deck.get().getDeckCards().forEach(c -> System.out.println(c.getId_card()));
            if (deck.get().getDeckCards().stream().anyMatch(b -> b.getId_card().equals(id_card)) && !card.get().getTypeLine().contains("Basic Land")) {
                return null;
            }


            Deck deckEntity = deck.get();
            // No es necesario crear un nuevo objeto Deck
            DeckCard deckCard = new DeckCard(deckEntity, id_card);

            deckCardRepository.save(deckCard);

            if (card.isPresent()) {
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
    public String deleteCardDeck(@PathVariable long id_deck, @PathVariable String id_card) {

        //Optional<Deck> deck = deckRepository.findById(id_deck);
        List<DeckCard> deckCards = deckCardRepository.findByDeck_Id(id_deck);
        Optional<DeckCard> deckCardOptional = deckCards.stream().filter(a -> a.getId_card().equals(id_card)).findFirst();

        if (deckCardOptional.isPresent()) {
            DeckCard deckCard = deckCardOptional.get();
            deckCardRepository.delete(deckCard);
            return "Deleted card with id: " + id_card;
        }

        return null;
    }

    @Transactional
    @CrossOrigin(origins = {"http://localhost:3000", "http://192.168.1.137:3000"})
    @PutMapping("/edit/{id_deck}")
    public DeckResponse editDeck(@RequestBody DeckResponse newDeck, @PathVariable long id_deck, @RequestHeader("Authorization") String token) {
        System.out.println(newDeck);
        System.out.println(id_deck);

        String email = jwtUtil.getEmailFromToken(token);
        Optional<User> user = userRepository.findByEmail(email);

        Optional<Deck> oldDeck = deckRepository.findById(id_deck);

        if (user.isPresent() && oldDeck.isPresent() && user.get().getId().equals(oldDeck.get().getUser().getId())) {
            System.out.println(oldDeck.toString());
            Optional<Card> oldCommander = cardRepository.findById(oldDeck.get().getCommander());
            Optional<Card> newCommander = cardRepository.findById(newDeck.getCommander());
            Deck deck = oldDeck.get();

            if (Arrays.equals(oldCommander.get().getColor_identity(), newCommander.get().getColor_identity())) {

                deck.setName(newDeck.getName());
                deck.setCommander(newDeck.getCommander());
                deckRepository.save(deck);
                return newDeck;
            }

            else {

                deck.setName(newDeck.getName());
                deck.setCommander(newDeck.getCommander());
                deck.setIdentity(newDeck.getIdentity());
                System.out.println("Identityyyyyyyyyyyyyy: "+newDeck.getIdentity());
                List<DeckCard> deckCards = getAllCardsFromDeck(oldDeck.get().getId());
                List<String> identityNewCommander = Arrays.asList(newCommander.get().getColor_identity());
                int i = 0;

                deckCards.forEach(deckCard -> {
                    Optional<Card> card = cardRepository.findById(deckCard.getId_card());
                    if (!card.isPresent()) return;

                    List<String> cardColors = Arrays.asList(card.get().getColor_identity());
                    List<String> newCommanderColors = Arrays.asList(newCommander.get().getColor_identity());

                    System.out.println("colors card: ");
                    System.out.println(cardColors.toString());

                    System.out.println("colors commander: ");
                    System.out.println(newCommanderColors.toString());
                    if(!newCommanderColors.containsAll(cardColors)) deckCardRepository.deleteById(deckCard.getId());

                });
                deck.getDeckCards().clear();
                deckRepository.save(deck);
                return newDeck;
            }
        }
        return null;

    }
}
