package com.kakuritsu.kaku_shops.service.converter;

import com.kakuritsu.kaku_shops.dto.ProductDto;
import com.kakuritsu.kaku_shops.model.Product;
import com.kakuritsu.kaku_shops.request.AddProductRequest;
import com.kakuritsu.kaku_shops.request.ProductUpdateRequest;

public interface IProductConverter {
   Product convertProductUpdateRequestToProduct(ProductUpdateRequest request, Product product);

   Product convertAddProductRequestToProduct(AddProductRequest request);

   ProductDto convertProductToProductDto(Product product);
}
