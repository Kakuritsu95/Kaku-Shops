package com.kakuritsu.kaku_shops.service.image;

import com.kakuritsu.kaku_shops.dto.ImageDto;
import com.kakuritsu.kaku_shops.exceptions.ResourceNotFoundException;
import com.kakuritsu.kaku_shops.model.Image;
import com.kakuritsu.kaku_shops.model.Product;
import com.kakuritsu.kaku_shops.repository.ImageRepository;
import com.kakuritsu.kaku_shops.service.product.IProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ImageService implements IImageService {
    private final ImageRepository imageRepository;
    private final IProductService productService;

    @Override
    public Image getImageById(Long id) {
        return imageRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Image not found!"));
    }

    @Override
    public void deleteImageById(Long id) {
        imageRepository.findById(id).ifPresentOrElse(imageRepository::delete, () -> {
            throw new ResourceNotFoundException("Image not found!");
        });
    }

    @Override
    public List<ImageDto> saveImages(List<MultipartFile> files, Long productId) {
        Product product = productService.getProductById(productId);
        List<ImageDto> savedImageDto = new ArrayList<>();
        for (MultipartFile file : files) {
            try {
                Image newImage = Image.builder()
                        .fileName(file.getOriginalFilename())
                        .fileType(file.getContentType())
                        .image(new SerialBlob(file.getBytes()))
                        .product(product)
                        .build();
                String buildDownloadUrl = "/api/v1/images/download/";
                newImage.setDownloadUrl(buildDownloadUrl + newImage.getId());
                Image savedImage = imageRepository.save(newImage);
                savedImage.setDownloadUrl(buildDownloadUrl + savedImage.getId());
                savedImageDto.add(new ImageDto(newImage.getId(), newImage.getFileName(),newImage.getDownloadUrl()));
                imageRepository.save(savedImage);
            } catch (IOException | SQLException e) {
               throw new RuntimeException(e.getMessage());
            }

    }
   return savedImageDto;
}

    @Override
    public void updateImage(MultipartFile file, Long imageId) {
        Image image = getImageById(imageId);
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