package com.kakuritsu.kaku_shops.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class GoogleRecaptchaValidationDto {
    private boolean success;
    @JsonProperty("error-codes")
    private List<String> errorCodes = new ArrayList<>();

}
