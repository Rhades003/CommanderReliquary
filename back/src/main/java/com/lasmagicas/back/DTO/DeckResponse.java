package com.lasmagicas.back.DTO;

import com.lasmagicas.back.Model.Card;
import com.lasmagicas.back.Model.Deck;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Optional;

@Data
@NoArgsConstructor
public class DeckResponse {
    Long id;
    String name;
    Long userId;
    String commander;
    String identity;
    List<Optional<Card>> cards;

    public DeckResponse(Deck deckEntity){

        this.id = deckEntity.getId();
        this.userId = deckEntity.getUser().getId();
        this.name = deckEntity.getName();
        this.commander = deckEntity.getCommander();
        this.identity = deckEntity.getIdentity();
    }
}
