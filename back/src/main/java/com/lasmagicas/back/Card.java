package com.lasmagicas.back;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(value = "Cards")
public class Card {
    @Id
    private String id;
    private String name;
    private String mana_cost;
    private String rarity;
    private String type_line;

    public Card(String id, String name, String mana_cost, String rarity, String type_line) {
        this.id = id;
        this.name = name;
        this.mana_cost = mana_cost;
        this.rarity = rarity;
        this.type_line = type_line;
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
}
