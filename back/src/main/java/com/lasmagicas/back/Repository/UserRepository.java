package com.lasmagicas.back.Repository;

import com.lasmagicas.back.Model.Deck;
import com.lasmagicas.back.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
    public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
