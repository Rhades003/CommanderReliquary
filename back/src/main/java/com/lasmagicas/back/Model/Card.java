package com.lasmagicas.back.Model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@Document(value = "Cards")
public class Card {
    @Id
    private String id;
    private String name;
    private String mana_cost;
    private String rarity;
    private String power;
    private String toughness;
    private String set;
    private String cmc;

    @Field("type_line")
    @JsonProperty("type_line")
    private String typeLine;
    private CardImage image_uris;
    private String[] keywords;
    private String[] color_identity;
    private String oracle_text;
    private Legality legalities;

    @JsonProperty("card_faces")
    private List<Card> card_faces;

}
