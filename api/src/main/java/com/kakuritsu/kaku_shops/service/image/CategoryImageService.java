package com.kakuritsu.kaku_shops.service.image;

import com.kakuritsu.kaku_shops.dto.ImageDto;
import com.kakuritsu.kaku_shops.exceptions.ResourceNotFoundException;
import com.kakuritsu.kaku_shops.model.Category;
import com.kakuritsu.kaku_shops.model.CategoryImage;
import com.kakuritsu.kaku_shops.repository.CategoryImageRepository;
import com.kakuritsu.kaku_shops.service.category.ICategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
@Service
@RequiredArgsConstructor
public class CategoryImageService implements IImageService {
    private final CategoryImageRepository imageRepository;
    private final ICategoryService categoryService;

    @Override
    public CategoryImage getImageById(Long id) {
        return imageRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Image not found!"));
    }

    @Override
    public void deleteImageById(Long id) {
        imageRepository.findById(id).ifPresentOrElse(imageRepository::delete, () -> {
            throw new ResourceNotFoundException("Image not found!");
        });
    }

    @Override
    public List<ImageDto> saveImages(List<MultipartFile> files, Long categoryId) {
        Category category = categoryService.getCategoryById(categoryId);
        List<ImageDto> savedImageDto = new ArrayList<>();
        for (MultipartFile file : files) {
            try {
                CategoryImage newImage = CategoryImage.builder()
                        .fileName(file.getOriginalFilename())
                        .fileType(file.getContentType())
                        .image(new SerialBlob(file.getBytes()))
                        .category(category)
                        .build();
                String buildDownloadUrl = "/api/v1/category-images/download/";
                newImage.setDownloadUrl(buildDownloadUrl + newImage.getId());
                CategoryImage savedImage = imageRepository.save(newImage);
                savedImage.setDownloadUrl(buildDownloadUrl + savedImage.getId());
                savedImageDto.add(new ImageDto(newImage.getId(), newImage.getFileName(), newImage.getDownloadUrl()));
                imageRepository.save(savedImage);
            } catch (IOException | SQLException e) {
                throw new RuntimeException(e.getMessage());
            }
        }
        return savedImageDto;
    }

    @Override
    public void updateImage(MultipartFile file, Long imageId) {
        CategoryImage image = getImageById(imageId);
        try {
            image.setFileType(file.getContentType());
            image.setFileName(file.getOriginalFilename());
            image.setImage(new SerialBlob(file.getBytes()));
            imageRepository.save(image);
        } catch (IOException | SQLException e) {
            throw new RuntimeException(e.getMessage());
        }
    }
}
