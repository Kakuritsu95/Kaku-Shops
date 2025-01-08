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


    boolean existsByNameAndBrand(String name, String brand);

    @Query(value = "SELECT * FROM product p ORDER BY p.created_at DESC LIMIT :numberOfLatestProductsToFind", nativeQuery = true)
    List<Product> findLatestProducts(int numberOfLatestProductsToFind);

    @Query(value = "SELECT * FROM product p ORDER BY p.sell_count DESC LIMIT :numberOfBestSellerProductsToFind", nativeQuery = true)
    List<Product> findBestSellerProducts(int numberOfBestSellerProductsToFind);

    @Query(" SELECT DISTINCT brand" +
            " FROM Product p JOIN category c" +
            " WHERE c.id = :categoryId")
    Set<String> findDistinctBrands(
            @Param("categoryId") Long categoryId
    );
    @Query("SELECT DISTINCT brand" +
            " FROM Product p" +
            " JOIN category c" +
            " WHERE (p.name LIKE %:keyword% OR p.brand LIKE %:keyword% OR c.name LIKE %:keyword%)" +
            " AND (:categoryName IS NULL OR c.name=:categoryName)")
    Set<String> findDistinctBrandsByKeyword(
            @Param("keyword") String keyword,
            @Param("categoryName") String categoryName
    );

    @Query("SELECT p" +
            " FROM Product p" +
            " JOIN category c" +
            " WHERE p.name LIKE %:keyword% OR p.brand LIKE %:keyword% OR c.name LIKE %:keyword%")
    Page<Product> findProductsBySearchKeyword(@Param("keyword") String keyword, PageRequest page);
    @Query("SELECT p FROM Product p JOIN category c WHERE p.name LIKE %:keyword% OR p.brand LIKE %:keyword% OR c.name LIKE %:keyword%")
    Page<Product> findProductsByKeywordAndFilters(@Param("keyword") String keyword, PageRequest page);
}
