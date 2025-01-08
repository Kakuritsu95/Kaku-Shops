package com.kakuritsu.kaku_shops.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class FilterSortProductRequest {
    private String brand;
    private String sortBy;
    private Integer minPrice;
    private Integer maxPrice;
    private boolean inStock;
    private String recent;
    private int page = 1;
    private int size = 9;
}
