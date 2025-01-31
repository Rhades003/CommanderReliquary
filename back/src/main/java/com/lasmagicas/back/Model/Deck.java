package com.lasmagicas.back.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
@Table(name = "decks")
public class Deck {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id")
    private Long id;

    @Column(name="name")
    private String name;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_user")
//    @CollectionTable(name = "users", joinColumns = @JoinColumn(name = "id"))
    //@JoinTable(name = "users")
//    @Column(name="id_user")
    private User user;

    @Column(name="commander")
    //Id de la carta del mongo
    private String commander;

    @Column(name="identity")
    private String identity;
}
