package com.kakuritsu.kaku_shops.service.cookie;


import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Optional;
import java.util.UUID;

@Component
public class CookieManagementService {
    @Value("${guestCart.token.expirationInSecs}") int cartTokenExpTime;
    @Value("${auth.token.expirationInSecs}") int authTokenExpTime;
    public  Optional<String> getCookieValueByName(HttpServletRequest request, String cookieName){
        Cookie[] cookies = request.getCookies();
        if(cookies==null){
            return Optional.empty();
        }
        return Arrays.stream(cookies).filter(cookie -> cookie.getName().
                equals(cookieName)).
                findFirst().
                map(Cookie::getValue);
    }

    public  String generateAndReturnCookieByNameAndValue(
            HttpServletResponse response,
            String cookieName,
            String cookieValue
    ) {

        if(cookieValue==null){
            cookieValue = UUID.randomUUID().toString();
        }
        Cookie cookie = new Cookie(cookieName, cookieValue);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        if(cookieName.equals("cart")) {
            cookie.setMaxAge(cartTokenExpTime);
        } else if(cookieName.equals("auth")) {
            cookie.setMaxAge(authTokenExpTime);
        }
        response.addCookie(cookie);
        return cookie.getValue();
    }
    public void deleteCookieByName(HttpServletRequest request, HttpServletResponse response,  String cookieName) {
         Cookie[] cookies =  request.getCookies();
         Optional <Cookie> cookieToDelete =  Arrays.stream(cookies).filter(cookie -> cookie.getName().equals(cookieName)).findFirst();
         cookieToDelete.ifPresent(cookie -> {
             cookie.setMaxAge(0);
             cookie.setPath("/");
             response.addCookie(cookie);
         });

    }
}
