package com.kakuritsu.kaku_shops.controller;

import com.kakuritsu.kaku_shops.dto.UserDetailsDTO;
import com.kakuritsu.kaku_shops.exceptions.CookieException;
import com.kakuritsu.kaku_shops.exceptions.ResourceNotFoundException;
import com.kakuritsu.kaku_shops.helpers.CookieManagementService;
import com.kakuritsu.kaku_shops.request.LoginRequest;
import com.kakuritsu.kaku_shops.response.ApiResponse;
import com.kakuritsu.kaku_shops.security.jwt.JwtUtils;
import com.kakuritsu.kaku_shops.service.user.IUserService;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.prefix}/auth")
public class AuthController {
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;
    private final CookieManagementService cookieManagementService;
    private final IUserService userService;


    @PostMapping("/login")
    public ResponseEntity<ApiResponse> loginUser(@Valid @RequestBody LoginRequest loginRequest, HttpServletRequest request, HttpServletResponse response) {
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
            String jwtToken = jwtUtils.generateTokenForUser(authentication);
            UserDetailsDTO userClaims =  jwtUtils.getUserDetailsFromToken(jwtToken);
            cookieManagementService.generateAndReturnCookieByNameAndValue(response,"auth",jwtToken);

            return ResponseEntity.ok().body(new ApiResponse("Login Successful", userClaims));

        } catch (AuthenticationException e) {
            return ResponseEntity.status(UNAUTHORIZED).body(new ApiResponse(e.getMessage(), "null"));
        }
    }
    @PostMapping("/authenticate")
    public ResponseEntity<ApiResponse> authenticateUserWithAuthCookie(HttpServletRequest request){
        try {
            String jwtToken = cookieManagementService.getCookieValueByName(request,"auth").orElseThrow(()-> new CookieException("Invalid or expired cookie login to renew authentication"));
            UserDetailsDTO userDetails = jwtUtils.getUserDetailsFromToken(jwtToken);
            return ResponseEntity.accepted().body(new ApiResponse("Authenticated",userDetails));
        } catch (CookieException e) {
           return ResponseEntity.status(UNAUTHORIZED).body(new ApiResponse(e.getMessage(),null));
        }
    }
    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response){
        cookieManagementService.deleteCookieByName(request, response,"auth");
        return ResponseEntity.accepted().body("Logged out");
    }

    @PutMapping("/activate-account/{verificationToken}")
    public ResponseEntity<ApiResponse> verifyAccountByVerificationToken(@PathVariable String verificationToken){
        try {
            userService.activateUserByVerificationToken(verificationToken);
            return ResponseEntity.ok().body(new ApiResponse("ok",null));
        } catch (JwtException e) {
            return ResponseEntity.status(BAD_REQUEST).body(new ApiResponse("Invalid or expired token",null));
        }
        catch (ResourceNotFoundException e){
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(),null));
        }
    }

}


