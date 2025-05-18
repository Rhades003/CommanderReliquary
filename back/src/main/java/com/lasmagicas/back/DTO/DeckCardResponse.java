package com.lasmagicas.back.DTO;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.lasmagicas.back.Model.Card;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@NoArgsConstructor
@Getter @Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DeckCardResponse {
    Long deckId;
    Card card;

    public DeckCardResponse(com.lasmagicas.back.Model.DeckCard deckCardEntity, Card card){

        this.deckId = deckCardEntity.getDeck().getId();
        this.card = card;

    }
}