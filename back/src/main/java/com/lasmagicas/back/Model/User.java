package com.lasmagicas.back;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.math.BigInteger;


@Entity
@Getter @Setter @NoArgsConstructor
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id")
    private Long id;

    @Column(name="name")
    private String name;

    @Column(name="email", unique = true, nullable = false)
    private String email;

    @Column(name = "password",  nullable = false)
    private String passwrd;

    public User(Long id, String name, String email, String passwrd) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.passwrd = passwrd;
    }
}
