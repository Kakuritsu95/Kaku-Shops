package com.kakuritsu.kaku_shops.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ImageDto {
    private Long imageId;
    private String imageName;
    private String downloadUrl;
}
