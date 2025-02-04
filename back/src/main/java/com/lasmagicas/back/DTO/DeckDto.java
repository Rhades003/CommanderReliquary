package com.lasmagicas.back.DTO;

import com.lasmagicas.back.Model.Card;
import com.lasmagicas.back.Model.Deck;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DeckDto {
    Long id;
    String name;
    Long userId;
    String commander;
    String identity;
    //Card[] cards;

    public DeckDto(Deck deckEntity){

        this.id = deckEntity.getId();
        this.userId = deckEntity.getId();
        this.name = deckEntity.getName();
        this.commander = deckEntity.getCommander();
        this.identity = deckEntity.getIdentity();
    }
}
