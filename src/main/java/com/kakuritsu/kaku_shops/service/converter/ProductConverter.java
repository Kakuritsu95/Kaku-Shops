package com.kakuritsu.kaku_shops.service.converter;

import com.kakuritsu.kaku_shops.dto.ImageDto;
import com.kakuritsu.kaku_shops.dto.ProductDto;
import com.kakuritsu.kaku_shops.model.Image;
import com.kakuritsu.kaku_shops.model.Product;
import com.kakuritsu.kaku_shops.request.AddProductRequest;
import com.kakuritsu.kaku_shops.request.ProductUpdateRequest;
import lombok.RequiredArgsConstructor;
import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.stereotype.Service;


import java.util.List;

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
        ProductDto productDto = mapper.map(product, ProductDto.class);
        List<Image>images = product.getImages();
        List<ImageDto> imageDtos = images.stream().map(image->mapper.map(image, ImageDto.class)).toList();
        productDto.setImages(imageDtos);
        return productDto;

    }

    @Override
    public List<ProductDto> convertProductsToProductDtos(List<Product> products) {
        return products.stream().map(this::convertProductToProductDto).toList();
    }
}
