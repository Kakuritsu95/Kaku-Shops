package com.kakuritsu.kaku_shops.repository;

import com.kakuritsu.kaku_shops.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    boolean existsByEmail(String email);

    User findByEmail(String email);

    Optional<User> findByEmailAndIsEnabledFalse(String email);
}
