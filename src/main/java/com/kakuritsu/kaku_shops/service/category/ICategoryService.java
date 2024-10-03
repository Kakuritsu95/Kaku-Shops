package com.kakuritsu.kaku_shops.service.category;

import com.kakuritsu.kaku_shops.dto.CategoryDto;
import com.kakuritsu.kaku_shops.model.Category;

import java.util.List;

public interface ICategoryService {
    Category getCategoryById(Long id);
    Category getCategoryByName(String name);
    List<CategoryDto> getAllCategories();
    Category addCategory(Category category);
    Category updateCategory(Category category,Long id);
    void deleteCategory(Long id);
}
