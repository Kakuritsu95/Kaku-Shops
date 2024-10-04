package com.kakuritsu.kaku_shops.service.converter;

import com.kakuritsu.kaku_shops.dto.ProductDto;
import com.kakuritsu.kaku_shops.model.Product;
import com.kakuritsu.kaku_shops.request.AddProductRequest;
import com.kakuritsu.kaku_shops.request.ProductUpdateRequest;
import lombok.RequiredArgsConstructor;
import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.stereotype.Service;



import static org.modelmapper.Conditions.isNotNull;

@RequiredArgsConstructor
@Service
public class ProductConverter implements IProductConverter {
    private final ModelMapper mapper;
    @Override
    public Product convertProductUpdateRequestToProduct(ProductUpdateRequest request, Product product) {
        TypeMap<ProductUpdateRequest, Product> typeMap = mapper.typeMap(ProductUpdateRequest.class, Product.class);
        typeMap.addMappings(mapper -> mapper.when(isNotNull()).map(ProductUpdateRequest::getName, Product::setName));
        typeMap.addMappings(mapper -> mapper.when(isNotNull()).map(ProductUpdateRequest::getBrand, Product::setBrand));
        typeMap.addMappings(mapper -> mapper.when(isNotNull()).map(ProductUpdateRequest::getPrice, Product::setPrice));
        typeMap.addMappings(mapper -> mapper.when(isNotNull()).map(ProductUpdateRequest::getInventory, Product::setInventory));
        typeMap.addMappings(mapper -> mapper.when(isNotNull()).map(ProductUpdateRequest::getDescription, Product::setDescription));
        typeMap.addMappings(mapper -> mapper.when(isNotNull()).map(ProductUpdateRequest::getCategory, Product::setCategory));
        typeMap.map(request,product);
        return product;
    }

    @Override
    public Product convertAddProductRequestToProduct(AddProductRequest request) {
      return mapper.map(request, Product.class);

    }

    @Override
    public ProductDto convertProductToProductDto(Product product) {
        TypeMap<Product, ProductDto> typeMap = mapper.typeMap(Product.class, ProductDto.class);
        typeMap.addMappings(mapper->mapper.skip(ProductDto::setImages));

        return typeMap.map(product);
    }
}
