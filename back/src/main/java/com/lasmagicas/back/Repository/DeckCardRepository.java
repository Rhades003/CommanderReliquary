package com.lasmagicas.back.Repository;

import com.lasmagicas.back.Model.DeckCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface DeckCardRepository extends JpaRepository<DeckCard,Long> {

    List<DeckCard> findByDeck_Id(Long deck_id);

    //Optional<DeckCard> findById_card(String card_id);
}

