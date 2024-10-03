package com.kakuritsu.kaku_shops.controller;

import com.kakuritsu.kaku_shops.dto.CategoryDto;
import com.kakuritsu.kaku_shops.exceptions.AlreadyExistsException;
import com.kakuritsu.kaku_shops.exceptions.ResourceNotFoundException;
import com.kakuritsu.kaku_shops.model.Category;
import com.kakuritsu.kaku_shops.response.ApiResponse;
import com.kakuritsu.kaku_shops.service.category.ICategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("${api.prefix}/categories")
public class CategoryController {
    private final ICategoryService categoryService;
     @GetMapping
    public ResponseEntity<ApiResponse> getAllCategories(){
        try {
            List<CategoryDto> categories = categoryService.getAllCategories();
            return ResponseEntity.ok().body(new ApiResponse("Found!",categories));
        } catch (Exception e) {
           return ResponseEntity.status(INTERNAL_SERVER_ERROR).body(new ApiResponse("Error:", INTERNAL_SERVER_ERROR));
        }
    }
   @PostMapping("/add")
   public ResponseEntity<ApiResponse> addCategory(@RequestBody Category category){
       try {
           Category savedCategory = categoryService.addCategory(category);
           return ResponseEntity.ok().body(new ApiResponse("New category created", savedCategory));
       } catch (AlreadyExistsException e) {
           return ResponseEntity.status(CONFLICT).body(new ApiResponse(e.getMessage(), null));
       }

   }

   @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getCategoryById(@PathVariable Long id){
       try {
           Category category = categoryService.getCategoryById(id);
           return ResponseEntity.ok().body(new ApiResponse("Found!",category));
       } catch (ResourceNotFoundException e) {
           return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(),null));
       }

   }
    @GetMapping("/name/{name}")
    public ResponseEntity<ApiResponse> getCategoryByName(@PathVariable String name){
        try {
            Category category = categoryService.getCategoryByName(name);
            return ResponseEntity.ok().body(new ApiResponse("Found!",category));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(),null));
        }

    }


    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteCategoryById(@PathVariable Long id){
        try {
             categoryService.deleteCategory(id);
            return ResponseEntity.ok().body(new ApiResponse("Deleted",id));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(),null));
        }

    }
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateCategoryById(@PathVariable Long id, @RequestBody Category category){
        try {
            Category updatedCategory = categoryService.updateCategory(category,id);
            return ResponseEntity.ok().body(new ApiResponse("Updated category!",updatedCategory));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(),null));
        }
    }


}
