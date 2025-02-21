package com.lasmagicas.back.Model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(value = "Cards")
public class Card {
    @Id
    private String id;
    private String name;
    private String mana_cost;
    private String rarity;
    private String type_line;
    private CardImage image_uris;
    private String[] keywords;
    //@JsonProperty("legalities")
    //private Legalities legalities;

    @JsonProperty("card_faces")
    private List<Card> card_faces;

    public Card() {
    }

    public Card(String id, String name, String mana_cost, String rarity, String type_line, CardImage image_uris) {
        this.id = id;
        this.name = name;
        this.mana_cost = mana_cost;
        this.rarity = rarity;
        this.type_line = type_line;
        this.image_uris = image_uris;
        //this.legalities = legalities;
        //this.keywords = keywords;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMana_cost() {
        return mana_cost;
    }

    public void setMana_cost(String mana_cost) {
        this.mana_cost = mana_cost;
    }

    public String getRarity() {
        return rarity;
    }

    public void setRarity(String rarity) {
        this.rarity = rarity;
    }

    public String getType_line() {
        return type_line;
    }

    public void setType_line(String type_line) {
        this.type_line = type_line;
    }

    public CardImage getImage_uris() {
        return image_uris;
    }

    public void setImage_uris(CardImage image_uris) {
        this.image_uris = image_uris;
    }

    /*
    public String[] getKeywords() {
        return keywords;
    }

    public void setKeywords(String[] keywords) {
        this.keywords = keywords;
    }

    public Legalities getLegalities() {
        return legalities;
    }

    public void setLegalities(Legalities legalities) {
        this.legalities = legalities;
    }
    */
    public List<Card> getCard_faces() {
        return card_faces;
    }

    public void setCard_faces(List<Card> card_faces) {
        this.card_faces = card_faces;
    }
}
