package com.bobabliss.security;

import java.util.Date;
import java.util.function.Function;
import java.nio.charset.StandardCharsets;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

      @Value("${jwt.secret}")
      private String secret;

      @Value("${jwt.expiration}")
      private long expiration;

      public String generateToken(UserDetails userDetails) {

            return Jwts.builder()
                        .setSubject(userDetails.getUsername())
                        .setIssuedAt(new Date())
                        .setExpiration(new Date(System.currentTimeMillis() + expiration))
                        .signWith(Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8)))
                        .compact();
      }

      public String extractUsername(String token) {

            return extractClaim(token, Claims::getSubject);
      }

      public boolean isTokenValid(String token, UserDetails userDetails) {

            String username = extractUsername(token);

            return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
      }

      private boolean isTokenExpired(String token) {

            return extractExpiration(token).before(new Date());
      }

      private Date extractExpiration(String token) {

            return extractClaim(token, Claims::getExpiration);
      }

      public <T> T extractClaim(String token, Function<Claims, T> resolver) {

            Claims claims = extractAllClaims(token);

            return resolver.apply(claims);
      }

      private Claims extractAllClaims(String token) {

            return Jwts.parser()
                        .verifyWith(Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8)))
                        .build()
                        .parseSignedClaims(token)
                        .getPayload();
      }
}