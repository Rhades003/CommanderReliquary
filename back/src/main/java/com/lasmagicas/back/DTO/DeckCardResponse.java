package com.lasmagicas.back.DTO;


import com.fasterxml.jackson.annotation.JsonInclude;
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
    String cardId;

    public DeckCardResponse(com.lasmagicas.back.Model.DeckCard deckCardEntity, String id_card){

        this.deckId = deckCardEntity.getDeck().getId();
        this.cardId = id_card;

    }
}