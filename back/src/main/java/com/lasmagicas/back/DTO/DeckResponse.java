package com.lasmagicas.back.DTO;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.lasmagicas.back.Model.Card;
import com.lasmagicas.back.Model.Deck;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Optional;

@Data
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DeckResponse {
    Long id;
    String name;
    Long userId;
    String commander;
    Optional<Card> commanderInfo;
    String identity;
    List<Optional<Card>> cards;
    Boolean isPublic;

    public DeckResponse(Deck deckEntity){

        this.id = deckEntity.getId();
        this.userId = deckEntity.getUser().getId();
        this.name = deckEntity.getName();
        this.commander = deckEntity.getCommander();
        this.identity = deckEntity.getIdentity();
        this.isPublic = deckEntity.getIsPublic();
        //this.cards = deckEntity.getDeckCards().g.stream().map(Card::new).collect(Collectors.toList());
    }
    
}
