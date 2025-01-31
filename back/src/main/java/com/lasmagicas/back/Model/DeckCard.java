package com.lasmagicas.back.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
//
//@Entity
//@Getter
//@Setter
//@NoArgsConstructor
//@AllArgsConstructor
//@Table(name = "decks-cards")
public class DeckCard {

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "deck_id")
    @Column(name="id_deck")
    private Deck id_deck;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "card_id")
    @Column(name="id_card")
    private Card id_card;
}
