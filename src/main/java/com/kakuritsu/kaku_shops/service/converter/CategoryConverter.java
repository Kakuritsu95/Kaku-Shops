package com.kakuritsu.kaku_shops.service.converter;

import com.kakuritsu.kaku_shops.dto.CategoryDto;
import com.kakuritsu.kaku_shops.model.Category;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CategoryConverter implements ICategoryConverter {
    private final ModelMapper modelMapper;
    @Override
    public CategoryDto convertCategoryToCategoryDto(Category category) {
        return modelMapper.map(category, CategoryDto.class);
    }
}
