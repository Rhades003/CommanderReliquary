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

    public DeckCard(com.lasmagicas.back.Model.DeckCard deckCardEntity){

        this.deckId = deckCardEntity.getId_deck().getId();
        this.cardId = deckCardEntity.getId_card().getId();

    }
}