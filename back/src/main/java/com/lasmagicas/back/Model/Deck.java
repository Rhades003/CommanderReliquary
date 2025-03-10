package com.lasmagicas.back.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
@Table(name = "decks")
public class Deck {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="name")
    private String name;


    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "id_user")
    private User user;


    //@ManyToOne(cascade = CascadeType.MERGE)
    //@JoinColumn(name = "id_card")
    //private DeckCard deckCard;
    @OneToMany(mappedBy = "deck", cascade = CascadeType.ALL)
    private List<DeckCard> deckCards;

    @Column(name="commander")
    //Id de la carta del mongo
    private String commander;

    @Column(name="identity")
    private String identity;

}
