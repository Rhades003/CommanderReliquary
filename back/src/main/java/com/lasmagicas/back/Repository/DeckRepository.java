package com.lasmagicas.back.Repository;

import com.lasmagicas.back.DTO.DeckWithoutCardsResponse;
import com.lasmagicas.back.Model.Deck;
import com.lasmagicas.back.Model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DeckRepository extends JpaRepository<Deck, Long> {
    List<Deck> findByUser(Optional<User> user);

    @Query("SELECT new com.lasmagicas.back.DTO.DeckWithoutCardsResponse(d.id, d.name, d.user.id, d.commander, d.identity, d.isPublic) " +
            "FROM Deck d WHERE LOWER(d.name) LIKE LOWER(CONCAT('%', :name, '%')) AND d.isPublic = true")
    Page<DeckWithoutCardsResponse> findPublicDecksWithoutIdentity(String name, Pageable pageable);

    @Query("SELECT new com.lasmagicas.back.DTO.DeckWithoutCardsResponse(d.id, d.name, d.user.id, d.commander, d.identity, d.isPublic) " +
            "FROM Deck d WHERE LOWER(d.name) LIKE LOWER(CONCAT('%', :name, '%')) AND d.isPublic = true AND d.identity = :identity")
    Page<DeckWithoutCardsResponse> findPublicDecksWithIdentity(String name, String identity, Pageable pageable);

    @Query("SELECT d FROM Deck d WHERE d.id = :id AND d.isPublic = true")
    Optional<Deck> findDeckById(Long id);
}
