package com.kakuritsu.kaku_shops.service.product;

import com.kakuritsu.kaku_shops.dto.ProductDto;
import com.kakuritsu.kaku_shops.dto.ProductsSearchResult;
import com.kakuritsu.kaku_shops.model.Product;
import com.kakuritsu.kaku_shops.model.User;
import com.kakuritsu.kaku_shops.request.AddProductRequest;
import com.kakuritsu.kaku_shops.request.FilterSortProductRequest;
import com.kakuritsu.kaku_shops.request.SearchProductsRequest;
import com.kakuritsu.kaku_shops.request.UpdateProductRequest;
import org.springframework.data.domain.Page;

import java.util.List;

public interface IProductService {
    Product addProduct(AddProductRequest request);

    Product getProductById(Long id);

    void deleteProductById(Long id);

    Product updateProduct(UpdateProductRequest product, Long productId);

    List<ProductDto> getBestSellerProducts();

    List<Product> getAllProducts();

    Page<ProductDto> getProductsByCategoryIdAndSearchParams(Long categoryId, FilterSortProductRequest request);

    Page<ProductDto> getProductsBySearchKeyword(String keyword);
    ProductsSearchResult getSearchResultsWithFilters(SearchProductsRequest searchRequest);
    double addRating(Long productId, User user, double rating);

    List<ProductDto> getLatestProducts();

}