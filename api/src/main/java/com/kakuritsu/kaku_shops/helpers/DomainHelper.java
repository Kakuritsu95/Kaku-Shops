package com.kakuritsu.kaku_shops.helpers;

import jakarta.servlet.http.HttpServletRequest;

public class DomainHelper {
  static public String getServerDomain(HttpServletRequest request) {
        String scheme = request.getScheme();
        String serverName = request.getServerName();
        int serverPort = request.getServerPort();


        String baseUrl = scheme + "://" + serverName;
        if (serverPort != 80 && serverPort != 443) {
            baseUrl += ":" + serverPort;
        }

        return baseUrl;
    }
}
