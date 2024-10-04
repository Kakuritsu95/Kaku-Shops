package com.kakuritsu.kaku_shops.service.converter;

import com.kakuritsu.kaku_shops.dto.CategoryDto;
import com.kakuritsu.kaku_shops.model.Category;

public interface ICategoryConverter {
    CategoryDto convertCategoryToCategoryDto(Category category);

}
