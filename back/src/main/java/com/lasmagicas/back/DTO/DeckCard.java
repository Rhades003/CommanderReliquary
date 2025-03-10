package com.lasmagicas.back.DTO;


import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@NoArgsConstructor
@Getter @Setter
public class DeckCard {
    Long deckId;
    String cardId;

    public DeckCard(com.lasmagicas.back.Model.DeckCard deckCardEntity, String id_card){

        this.deckId = deckCardEntity.getDeck().getId();
        this.cardId = id_card;

    }
}