package com.kakuritsu.kaku_shops.repository;

import com.kakuritsu.kaku_shops.dto.CategoryDto;
import com.kakuritsu.kaku_shops.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Set;

public interface CategoryRepository extends JpaRepository<Category,Long> {
    Category findByName(String name);

    @Query("SELECT c FROM Category c" +
            " JOIN products p" +
            " WHERE (p.name ILIKE %:keyword% OR p.brand ILIKE %:keyword% OR c.name ILIKE %:keyword%)" +
            " AND (:brand IS NULL OR p.brand=:brand)")
    List<Category> findCategoriesByKeyword(
            @Param("keyword") String keyword,
            @Param("brand") String brand
    );

    boolean existsByName(String name);
}
