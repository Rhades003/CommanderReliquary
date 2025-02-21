package com.lasmagicas.back.DTO;


import com.lasmagicas.back.Model.Card;
import com.lasmagicas.back.Model.Deck;
import com.lasmagicas.back.Model.DeckCard;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@NoArgsConstructor
@Getter @Setter
public class DeckCardDto {
    Long deckId;
    String cardId;

    public DeckCardDto(DeckCard deckCardEntity){

        this.deckId = deckCardEntity.getId_deck().getId();
        this.cardId = deckCardEntity.getId_card().getId();

    }
}