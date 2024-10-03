package com.kakuritsu.kaku_shops.service.category;

import com.kakuritsu.kaku_shops.dto.CategoryDto;
import com.kakuritsu.kaku_shops.exceptions.AlreadyExistsException;
import com.kakuritsu.kaku_shops.exceptions.ResourceNotFoundException;
import com.kakuritsu.kaku_shops.model.Category;
import com.kakuritsu.kaku_shops.model.Product;
import com.kakuritsu.kaku_shops.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryService implements ICategoryService {
    private final CategoryRepository categoryRepository;
    @Override
    public Category getCategoryById(Long id) {
        return categoryRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Category not found!"));
    }

    @Override
    public Category getCategoryByName(String name) {
        return categoryRepository.findByName(name);
    }

    @Override
    public List<CategoryDto> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
             return categories.stream()
                .map(category -> {
                    CategoryDto categoryDto = new CategoryDto();
                    categoryDto.setId(category.getId());
                    categoryDto.setName(category.getName());
                    return categoryDto;
                        }
                ).collect(Collectors.toList());
    }

    @Override
    public Category addCategory(Category category) {
        return Optional.of(category).filter(c->!categoryRepository.existsByName(c.getName()))
                .map(categoryRepository::save).orElseThrow(()->new AlreadyExistsException(category.getName()+" already Exists"));
    }

    @Override
    public Category updateCategory(Category category,Long id) {
        return Optional.ofNullable(getCategoryById(id))
                .map(oldCategory->{
                    oldCategory.setName(category.getName());
                    return categoryRepository.save(oldCategory);
                }) .orElseThrow(()-> new ResourceNotFoundException("Category not found!"));

    }

    @Override
    public void deleteCategory(Long id) {
        categoryRepository.findById(id)
                .ifPresentOrElse(categoryRepository::delete
                        ,()->{throw new ResourceNotFoundException("Category not found!");}
                );
    }
}
