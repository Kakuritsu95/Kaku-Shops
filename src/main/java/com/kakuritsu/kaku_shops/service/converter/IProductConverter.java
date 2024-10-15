package com.kakuritsu.kaku_shops.service.converter;

import com.kakuritsu.kaku_shops.dto.ProductDto;
import com.kakuritsu.kaku_shops.model.Product;
import com.kakuritsu.kaku_shops.request.AddProductRequest;
import com.kakuritsu.kaku_shops.request.UpdateProductRequest;

import java.util.List;

public interface IProductConverter {
   Product convertProductUpdateRequestToProduct(UpdateProductRequest request, Product product);

   Product convertAddProductRequestToProduct(AddProductRequest request);

   ProductDto convertProductToProductDto(Product product);

  List <ProductDto> convertProductsToProductDtos(List<Product> products);
}
