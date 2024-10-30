package com.kakuritsu.kaku_shops.request;

import lombok.Data;

@Data
public class FilterSortProductRequest {
    private String brand;
    private String category;
    private String PriceSortBy;
    private Integer minPrice;
    private Integer maxPrice;
    private String inStock;
    private String recent;
    private int page;
    private int size = 5;
}
