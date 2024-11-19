package com.kakuritsu.kaku_shops.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
public class ProductsSearchResult {
    Page<ProductDto> products;
    Set<String> relevantBrands;
    List<CategoryDto>relevantCategories;
}
