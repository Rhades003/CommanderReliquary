package com.lasmagicas.back.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "decksCards")
public class DeckCard {
//    @ManyToMany(cascade = CascadeType.ALL)
//    @JoinColumn(name = "deck_id")


//    @ManyToMany(cascade = CascadeType.ALL)
//    @JoinColumn(name = "id_deck", referencedColumnName = "id")
//    @Column(name="id_deck")
//    private Deck id_deck;

//    @ManyToMany(cascade = CascadeType.ALL)
//    @JoinColumn(name = "card_id")
//    @Column(name="id_card")
//    private Card id_card;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_deck")
    private Deck deck;

    //@ManyToOne
    @JoinColumn(name = "id_card")
    private String id_card;

    public DeckCard(Deck deck, String id_card) {
        this.deck = deck;
        this.id_card = id_card;
    }
}
