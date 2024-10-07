package com.kakuritsu.kaku_shops.service.converter;

import com.kakuritsu.kaku_shops.dto.ImageDto;
import com.kakuritsu.kaku_shops.model.Image;

public interface IImageConverter {
    ImageDto convertImageToImageDto(Image image);
}
