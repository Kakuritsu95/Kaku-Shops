package com.kakuritsu.kaku_shops.repository;

import com.kakuritsu.kaku_shops.dto.CategoryDto;
import com.kakuritsu.kaku_shops.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category,Long> {
    Category findByName(String name);

    boolean existsByName(String name);
}
