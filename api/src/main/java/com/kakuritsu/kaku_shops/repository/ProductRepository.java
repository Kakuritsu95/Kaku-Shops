package com.kakuritsu.kaku_shops.repository;

import com.kakuritsu.kaku_shops.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Set;

public interface ProductRepository extends JpaRepository<Product,Long>, JpaSpecificationExecutor<Product> {
    List<Product> findByCategoryName(String category);

    List<Product> findByBrand(String brand);

    List<Product> findByCategoryNameAndBrand(String category, String brand);

    List<Product> findByName(String name);

    List<Product> findByBrandAndName(String brand, String name);

    Long countByBrandAndName(String brand, String name);

    boolean existsByNameAndBrand(String name, String brand);

    @Query("SELECT DISTINCT brand FROM Product p JOIN category c WHERE c.id = :categoryId")
    Set<String> findDistinctBrands(
            @Param("categoryId") Long categoryId
    );
    @Query("SELECT DISTINCT brand FROM Product p JOIN category c WHERE p.name LIKE %:keyword% OR p.brand LIKE %:keyword% OR c.name LIKE %:keyword%")
    Set<String> findDistinctBrandsByKeyword(
            @Param("keyword") String keyword
    );

    @Query("SELECT p FROM Product p JOIN category c WHERE p.name LIKE %:keyword% OR p.brand LIKE %:keyword% OR c.name LIKE %:keyword%")
    Page<Product> findProductsBySearchKeyword(@Param("keyword") String keyword, PageRequest page);
    @Query("SELECT p FROM Product p JOIN category c WHERE p.name LIKE %:keyword% OR p.brand LIKE %:keyword% OR c.name LIKE %:keyword%")
    Page<Product> findProductsByKeywordAndFilters(@Param("keyword") String keyword, PageRequest page);
}
