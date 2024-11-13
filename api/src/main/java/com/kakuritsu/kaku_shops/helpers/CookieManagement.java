package com.kakuritsu.kaku_shops.helpers;


import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.util.Arrays;
import java.util.Optional;
import java.util.UUID;


public class CookieManagement {
    public static Optional<String> getCookieValueByName(HttpServletRequest request, String cookieName){
        Cookie[] cookies = request.getCookies();
        if(cookies==null){
            return Optional.empty();
        }
        return Arrays.stream(cookies).filter(cookie -> cookie.getName().equals(cookieName)).findFirst().map(Cookie::getValue);
    }
    public static String generateAndReturnCookieByNameAndValue(
            HttpServletRequest request,
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
        cookie.setMaxAge(7*24*60*60);
        cookie.setPath("/");
        response.addCookie(cookie);
        return cookie.getValue();
    }
}
