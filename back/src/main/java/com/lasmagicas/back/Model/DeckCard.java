package com.lasmagicas.back.Model;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
<<<<<<< HEAD
//@Entity
@Getter
@Setter
=======
@Entity
@Getter @Setter
>>>>>>> deckCardsNotWorking
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@Table(name = "decksCards")
public class DeckCard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "deck_id")
    private Deck deck;

    //@ManyToOne
    @Column(name = "card_id")
    private String id_card;

    public DeckCard(Deck deck, String id_card) {
        this.id = null;
        this.deck = deck;
        this.id_card = id_card;
    }
}
