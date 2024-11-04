package com.kakuritsu.kaku_shops.service.product;

import com.kakuritsu.kaku_shops.dto.ProductDto;
import com.kakuritsu.kaku_shops.model.Product;
import com.kakuritsu.kaku_shops.model.User;
import com.kakuritsu.kaku_shops.request.AddProductRequest;
import com.kakuritsu.kaku_shops.request.FilterSortProductRequest;
import com.kakuritsu.kaku_shops.request.UpdateProductRequest;
import org.springframework.data.domain.Page;

import java.util.List;

public interface IProductService {
    Product addProduct(AddProductRequest request);

    Product getProductById(Long id);

    void deleteProductById(Long id);

    Product updateProduct(UpdateProductRequest product, Long productId);

    List<Product> getAllProducts();

    Page<ProductDto> getProductsByCategoryIdAndSearchParams(Long categoryId, FilterSortProductRequest request);

    List<Product> getProductsByCategory(String category);

    List<Product> getProductsByBrand(String brand);

    List<Product> getProductsByCategoryAndBrand(String category, String brand);

    List<Product> getProductsByName(String name);

    List<Product> getProductsByBrandAndName(String brand, String name);

    Long countProductsByBrandAndName(String brand, String name);

    float addRating(Long productId, User user, float rating);

}