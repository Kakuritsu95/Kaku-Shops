package com.kakuritsu.kaku_shops.response;

import com.kakuritsu.kaku_shops.dto.ProductDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.domain.Page;

import java.util.Set;

@Data
@AllArgsConstructor
public class SearchProductResultsResponse {
    private Set<String> brands;
    private Page<ProductDto> products;
}
