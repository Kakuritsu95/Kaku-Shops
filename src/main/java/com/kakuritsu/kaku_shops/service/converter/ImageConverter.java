package com.kakuritsu.kaku_shops.service.converter;

import com.kakuritsu.kaku_shops.dto.ImageDto;
import com.kakuritsu.kaku_shops.model.Image;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ImageConverter implements IImageConverter{
private final ModelMapper mapper;
    @Override
    public ImageDto convertImageToImageDto(Image image) {
        return mapper.map(image, ImageDto.class);
    }
}
