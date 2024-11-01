package com.kakuritsu.kaku_shops.service.converter;

import com.kakuritsu.kaku_shops.dto.ProductDto;
import com.kakuritsu.kaku_shops.model.Product;
import com.kakuritsu.kaku_shops.request.AddProductRequest;
import com.kakuritsu.kaku_shops.request.UpdateProductRequest;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.stereotype.Service;

import java.util.List;

import static org.modelmapper.Conditions.isNotNull;

@RequiredArgsConstructor
@Service
public class ProductConverter {
    private final ModelMapper mapper;

    public Product convertProductUpdateRequestToProduct(UpdateProductRequest request, Product product) {
        TypeMap<UpdateProductRequest, Product> typeMap = mapper.typeMap(UpdateProductRequest.class, Product.class);
        typeMap.addMappings(mapper -> mapper.when(isNotNull()).map(UpdateProductRequest::getName, Product::setName));
        typeMap.addMappings(mapper -> mapper.when(isNotNull()).map(UpdateProductRequest::getBrand, Product::setBrand));
        typeMap.addMappings(mapper -> mapper.when(isNotNull()).map(UpdateProductRequest::getPrice, Product::setPrice));
        typeMap.addMappings(mapper -> mapper.when(isNotNull()).map(UpdateProductRequest::getInventory, Product::setInventory));
        typeMap.addMappings(mapper -> mapper.when(isNotNull()).map(UpdateProductRequest::getDescription, Product::setDescription));
        typeMap.addMappings(mapper -> mapper.when(isNotNull()).map(UpdateProductRequest::getCategory, Product::setCategory));
        typeMap.map(request,product);

        return product;

    }


    public Product convertAddProductRequestToProduct(AddProductRequest request) {
      return mapper.map(request, Product.class);

    }



    public ProductDto convertProductToProductDto(Product product) {
        return mapper.map(product, ProductDto.class);
    }


    public List<ProductDto> convertProductsToProductDtos(List<Product> products) {
        return products.stream().map(this::convertProductToProductDto).toList();
    }
}
