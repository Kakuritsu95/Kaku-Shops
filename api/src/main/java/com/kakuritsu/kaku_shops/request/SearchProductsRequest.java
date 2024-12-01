package com.kakuritsu.kaku_shops.request;

import lombok.Data;

@Data
public class SearchProductsRequest {
    private String keyword;
    private String category;
    private String brand;
    private String sortBy;
    private boolean inStock;
    private int page = 1;
    private int size = 10;
}
