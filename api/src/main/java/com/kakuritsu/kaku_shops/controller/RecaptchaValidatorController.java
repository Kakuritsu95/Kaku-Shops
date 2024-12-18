package com.kakuritsu.kaku_shops.controller;

import com.kakuritsu.kaku_shops.exceptions.RecaptchaValidationException;
import com.kakuritsu.kaku_shops.service.GoogleRecaptcha.GoogleRecaptchaService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
@RequestMapping("try")
public class RecaptchaValidatorController {

    private final GoogleRecaptchaService recaptchaService;
  @GetMapping("/{response}")
  public void validateCaptcha(@PathVariable String response){
     try {
         recaptchaService.validateRecaptcha(response);
         System.out.println("success");
     } catch(RecaptchaValidationException e){
         System.out.print(e.getMessage());
     }

  }

}
