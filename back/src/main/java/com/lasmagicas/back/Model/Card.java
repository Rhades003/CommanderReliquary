package com.lasmagicas.back.Model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

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
    private String type_line;
    private CardImage image_uris;
    private String[] keywords;

    //@JsonProperty("legalities")
    private Legalities legalities;

    @JsonProperty("card_faces")
    private List<Card> card_faces;

}
