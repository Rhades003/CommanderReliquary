package com.lasmagicas.back;

import com.lasmagicas.back.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


    @Repository
    public interface UserRepository extends JpaRepository<User, Long> {
}
