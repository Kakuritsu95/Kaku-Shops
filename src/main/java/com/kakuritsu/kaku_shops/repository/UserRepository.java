package com.kakuritsu.kaku_shops.repository;

import com.kakuritsu.kaku_shops.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
    boolean existsByEmail(String email);
}
