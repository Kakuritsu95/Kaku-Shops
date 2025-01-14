package com.kakuritsu.kaku_shops.request;

import com.fasterxml.jackson.annotation.JsonSetter;
import lombok.Data;

@Data
public class SearchProductsRequest {

    private String keyword;
    private String category;
    private String brand;
    private String sortBy;
    private boolean inStock;
    private boolean popular;
    private boolean newArrivals;
    private Integer minPrice;
    private Integer maxPrice;
    private int page = 1;
    private int size = 9;
    @JsonSetter("keyword")
    public void setKeyword(String keyword) {
        if (keyword != null) {
            this.keyword = keyword.toLowerCase();
        } else {
            this.keyword = null;
        }
    }
}
