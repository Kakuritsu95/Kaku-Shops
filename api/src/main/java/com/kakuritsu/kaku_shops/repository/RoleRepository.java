package com.kakuritsu.kaku_shops.repository;

import com.kakuritsu.kaku_shops.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;


public interface RoleRepository extends JpaRepository<Role,Long> {
    Role findByName(String name);
}
