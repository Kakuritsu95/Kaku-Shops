package com.kakuritsu.kaku_shops.security.jwt;

import com.kakuritsu.kaku_shops.dto.UserDetailsDTO;
import com.kakuritsu.kaku_shops.security.user.ShopUserDetails;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.List;


@Component
@RequiredArgsConstructor
public class JwtUtils {
    @Value("${auth.token.jwtSecret}")
    private String jwtSecret;
    @Value("${auth.token.expirationInMils}")
    private int expirationTime;


    public String generateTokenForUser(Authentication authentication) {
        ShopUserDetails userPrincipal = (ShopUserDetails) authentication.getPrincipal();
        List<String> roles = userPrincipal.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList();
        return Jwts.builder()
                .setSubject(userPrincipal.getUsername())
                .claim("id", userPrincipal.getId())
                .claim("roles", roles)
                .claim("firstName", userPrincipal.getFirstName())
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + expirationTime))
                .signWith(key(), SignatureAlgorithm.HS256)
                .compact();
    }

    private Key key() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }

    public String getUsernameFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
    public UserDetailsDTO getUserDetailsFromToken(String token) {
        Claims claims = Jwts.parserBuilder().setSigningKey(key())
                .build()
                .parseClaimsJws(token)
                .getBody();
        String email = claims.getSubject();
        Long id = claims.get("id",Long.class);
        String firstName = claims.get("firstName", String.class);
        List<String> roles = claims.get("roles", List.class);
        return new UserDetailsDTO(id,firstName,email, roles);
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(key())
                    .build()
                    .parseClaimsJws(token);
            return true;

        } catch (UnsupportedJwtException | MalformedJwtException | SignatureException | IllegalArgumentException e) {
            throw new JwtException(e.getMessage());
        }
    }
    public String generateAccountActivationToken(String email){
        return Jwts.builder().setSubject(email).signWith(key(),SignatureAlgorithm.HS256).setExpiration(new Date(new Date().getTime()+expirationTime)).compact();
    }
}
