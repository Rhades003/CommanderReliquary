package com.lasmagicas.back.Repository;

import com.lasmagicas.back.Model.DeckCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeckCardRepository extends JpaRepository<DeckCard,Long> {
}
