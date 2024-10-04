package com.kakuritsu.kaku_shops.service.product;


import com.kakuritsu.kaku_shops.service.converter.IProductConverter;
import com.kakuritsu.kaku_shops.exceptions.ResourceNotFoundException;
import com.kakuritsu.kaku_shops.model.Category;
import com.kakuritsu.kaku_shops.model.Product;
import com.kakuritsu.kaku_shops.repository.CategoryRepository;
import com.kakuritsu.kaku_shops.repository.ProductRepository;
import com.kakuritsu.kaku_shops.request.AddProductRequest;
import com.kakuritsu.kaku_shops.request.ProductUpdateRequest;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService implements IProductService{

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final IProductConverter productConverter;

    @Override
    public Product addProduct(AddProductRequest request) {
      // check if the category is found in the DB
      // If Yes, set it as the new product category
      // If No, then save it as a new category
      // Then set as the new product category
        Category category = Optional.ofNullable(categoryRepository.findByName(request.getCategory().getName())).orElseGet(()->{
            Category newCategory = new Category(request.getCategory().getName());
            return categoryRepository.save(newCategory);
        });
        request.setCategory(category);
        return productRepository.save(productConverter.convertAddProductRequestToProduct(request));
    }


    @Override
    public Product getProductById(Long id) {
        return productRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Product id: " + id + " not found found"));
    }

    @Override
    public void deleteProductById(Long id) {
     productRepository.findById(id).
             ifPresentOrElse(productRepository::delete,
                     ()->{throw new ResourceNotFoundException("Product id: " + id + " not found found");});
    }

    @Override
    public Product updateProduct(ProductUpdateRequest request, Long productId) {

        return productRepository.findById(productId)
                .map(existingProduct -> {
                    Category category = Optional.ofNullable(categoryRepository.findByName(request.getCategory().getName())).orElse(request.getCategory());
                    request.setCategory(category);
                    return productConverter.convertProductUpdateRequestToProduct(request, existingProduct);
                })
                .map(productRepository :: save)
                .orElseThrow(()-> new ResourceNotFoundException("Product id:"  + productId + "not found found"));
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategoryName(category);
    }

    @Override
    public List<Product> getProductsByBrand(String brand) {
        return productRepository.findByBrand(brand);
    }

    @Override
    public List<Product> getProductsByCategoryAndBrand(String category, String brand) {
       return productRepository.findByCategoryNameAndBrand(category, brand);
    }

    @Override
    public List<Product> getProductsByName(String name) {
        return productRepository.findByName(name);
    }

    @Override
    public List<Product> getProductsByBrandAndName(String brand, String name) {
       return productRepository.findByBrandAndName(brand,name);
    }

    @Override
    public Long countProductsByBrandAndName(String brand, String name) {
        return productRepository.countByBrandAndName(brand,name);
    }
}
