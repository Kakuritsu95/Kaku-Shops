package com.kakuritsu.kaku_shops.service.GoogleRecaptcha;


import com.kakuritsu.kaku_shops.dto.GoogleRecaptchaValidationDto;
import com.kakuritsu.kaku_shops.exceptions.RecaptchaValidationException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
@Service
public class GoogleRecaptchaService {
    @Value("${app.recaptcha.secret}")
    private String RECAPTCHA_SECRET;
    private final String RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";
    public void validateRecaptcha(String recaptchaClientResponse){
        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
        formData.add("secret", RECAPTCHA_SECRET);
        formData.add("response", recaptchaClientResponse);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        HttpEntity<MultiValueMap<String,String>> request = new HttpEntity<>(formData,httpHeaders);
        RestTemplate restTemplate = new RestTemplate();
        GoogleRecaptchaValidationDto captchaResponse = restTemplate.postForObject(RECAPTCHA_VERIFY_URL, request, GoogleRecaptchaValidationDto.class);
        assert captchaResponse != null;
        if(!captchaResponse.isSuccess()){
            throw new RecaptchaValidationException(String.join(",",captchaResponse.getErrorCodes()));
        }
    }
}
