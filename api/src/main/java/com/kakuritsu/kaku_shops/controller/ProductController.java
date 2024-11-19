package com.kakuritsu.kaku_shops.controller;

import com.kakuritsu.kaku_shops.dto.ProductDto;

import com.kakuritsu.kaku_shops.dto.ProductsSearchResult;
import com.kakuritsu.kaku_shops.exceptions.AlreadyExistsException;
import com.kakuritsu.kaku_shops.exceptions.ResourceNotFoundException;
import com.kakuritsu.kaku_shops.model.Product;

import com.kakuritsu.kaku_shops.model.User;
import com.kakuritsu.kaku_shops.repository.ProductRepository;
import com.kakuritsu.kaku_shops.request.AddProductRequest;
import com.kakuritsu.kaku_shops.request.FilterSortProductRequest;
import com.kakuritsu.kaku_shops.request.UpdateProductRequest;
import com.kakuritsu.kaku_shops.response.ApiResponse;
import com.kakuritsu.kaku_shops.service.converter.ProductConverter;
import com.kakuritsu.kaku_shops.service.product.IProductService;
import com.kakuritsu.kaku_shops.service.user.IUserService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

import static org.springframework.http.HttpStatus.CONFLICT;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@RequiredArgsConstructor
@RestController
@RequestMapping("${api.prefix}/products")
public class ProductController {
    private final IProductService productService;
    private final ProductConverter productConverter;
    private final ProductRepository productRepository;
    private final IUserService userService;
    private final ModelMapper mapper;
    @GetMapping
    public ResponseEntity<ApiResponse> getAllProducts(){
        List<Product> products = productService.getAllProducts();
        List <ProductDto> productDtos = productConverter.convertProductsToProductDtos(products);
        return ResponseEntity.ok().body(new ApiResponse("Success", productDtos));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getProductById(@PathVariable Long id){
        try {
            Product product = productService.getProductById(id);
            ProductDto productDto = productConverter.convertProductToProductDto(product);
            return ResponseEntity.ok().body(new ApiResponse("Success", productDto));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(),NOT_FOUND));
        }
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse> addNewProduct(@Valid @RequestBody AddProductRequest product){
        try {
            Product newProduct = productService.addProduct(product);
            ProductDto newProductDto = productConverter.convertProductToProductDto(newProduct);
            return ResponseEntity.ok().body(new ApiResponse("Success!",newProductDto));
        } catch (AlreadyExistsException e) {
            return ResponseEntity.status(CONFLICT).body(new ApiResponse(e.getMessage(),null));
        }
    }
    @PatchMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse> updateProduct(@RequestBody @Valid UpdateProductRequest product, @PathVariable Long id){
        try {
            Product updatedProduct = productService.updateProduct(product,id);
            ProductDto updatedProductDto = productConverter.convertProductToProductDto(updatedProduct);
            return ResponseEntity.ok().body(new ApiResponse("Updated product!", updatedProductDto));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(),null));
        }
    }
    @PostMapping("/{id}/rate")
    public ResponseEntity<ApiResponse> rateProduct(@PathVariable Long id, @Digits(integer = 1 ,fraction = 1) @DecimalMin("1.0") @DecimalMax("5.0") @RequestBody BigDecimal userRating){
        User user = userService.getAuthenticatedUser();
        double rating = productService.addRating(id,user,userRating.doubleValue());
        return ResponseEntity.ok().body(new ApiResponse("good", rating));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse> deleteProduct(@PathVariable Long id ){
        try {
            productService.deleteProductById(id);
            return ResponseEntity.ok().body(new ApiResponse("Deleted!", id));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(),null));
        }
    }
    @GetMapping("/by-brand-and-name")
    public ResponseEntity<ApiResponse> getProductsByBrandAndName(@RequestParam String brand, @RequestParam String name){
        try {
            List<Product> products = productService.getProductsByBrandAndName(brand,name);
            List<ProductDto> productDtos = productConverter.convertProductsToProductDtos(products);
            if(products.isEmpty()){
               return ResponseEntity.status(NOT_FOUND).body(new ApiResponse("No products found",null));
            }
            return ResponseEntity.ok().body(new ApiResponse("success!", productDtos));
        } catch (Exception e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(),null));
        }
    }
    @GetMapping("/by-category-and-brand")
    public ResponseEntity<ApiResponse> getProductsByCategoryAndBrand(@RequestParam String category, @RequestParam String brand){
        try {
            List<Product> products = productService.getProductsByCategoryAndBrand(category, brand);
            if(products.isEmpty()){
                return ResponseEntity.status(NOT_FOUND).body(new ApiResponse("No products found",null));
            }
            List<ProductDto> productDtos = productConverter.convertProductsToProductDtos(products);
            return ResponseEntity.ok().body(new ApiResponse("success!", productDtos));
        } catch (Exception e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(),null));
        }
    }
    @GetMapping("/by-name")
    public ResponseEntity<ApiResponse> getProductsByName(@RequestParam String name){
        try {
            List<Product> products = productService.getProductsByName(name);
            if(products.isEmpty()){
                return ResponseEntity.status(NOT_FOUND).body(new ApiResponse("No products found",null));
            }
            List<ProductDto> productDtos = productConverter.convertProductsToProductDtos(products);
            return ResponseEntity.ok().body(new ApiResponse("success!", productDtos));
        } catch (Exception e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(),null));
        }
    }
    @GetMapping("/by-brand")
    public ResponseEntity<ApiResponse> getProductsByBrand(@RequestParam String brand){
        try {
            List<Product> products = productService.getProductsByBrand(brand);
            if(products.isEmpty()){
                return ResponseEntity.status(NOT_FOUND).body(new ApiResponse("No products found",null));
            }
            List<ProductDto> productDtos = productConverter.convertProductsToProductDtos(products);
            return ResponseEntity.ok().body(new ApiResponse("success!", productDtos));
        } catch (Exception e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(),null));
        }
    }
    @GetMapping("/by-category")
    public ResponseEntity<ApiResponse> getProductsByCategory(@RequestParam String category){
        try {
            List<Product> products = productService.getProductsByCategory(category);
            if(products.isEmpty()){
                return ResponseEntity.status(NOT_FOUND).body(new ApiResponse("No products found",null));
            }
            List<ProductDto> productDtos = productConverter.convertProductsToProductDtos(products);
            return ResponseEntity.ok().body(new ApiResponse("success!", productDtos));
        } catch (Exception e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(),null));
        }
    }
    @GetMapping("/count/by-brand-and-name")
    public ResponseEntity<ApiResponse> countProductsByBrandAndName(@RequestParam String brand, @RequestParam String name){
        try {
            var numberOfProducts = productService.countProductsByBrandAndName(brand,name);
            return ResponseEntity.ok().body(new ApiResponse("success!", numberOfProducts));
        } catch (Exception e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(),null));
        }
    }
    @GetMapping("/brands/{categoryId}")
    public ResponseEntity<ApiResponse> getDistinctBrand(@PathVariable Long categoryId){
        Set<String> associatedBrands = productRepository.findDistinctBrands(categoryId);
        return ResponseEntity.ok().body(new ApiResponse("ok", associatedBrands));
    }

    @GetMapping("/search/{categoryId}")
    public ResponseEntity<ApiResponse> getProductsByCategoryAndSearchParams(@PathVariable Long categoryId, @ModelAttribute FilterSortProductRequest request){
        Page<ProductDto> productDtos = productService.getProductsByCategoryIdAndSearchParams(categoryId,request);
        return ResponseEntity.ok().body(new ApiResponse("ok",productDtos));
    }
    @GetMapping("/search")
    public ResponseEntity<ApiResponse> getProductsBySearchKeyword(@RequestParam String keyword){
        Page<ProductDto> productDtos = productService.getProductsBySearchKeyword(keyword);
        return ResponseEntity.ok().body(new ApiResponse("search results",productDtos));
    }
    @GetMapping("/results")
    public ResponseEntity<ApiResponse> getProductsSearchResultsByKeyword(@RequestParam String keyword){
        ProductsSearchResult result = productService.getProductsByKeywordAndFilters(keyword);
        return ResponseEntity.ok().body(new ApiResponse("ok result", result));

    }
}
