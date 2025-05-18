package com.lasmagicas.back.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.websocket.Decoder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.codec.Base64;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.security.*;
import java.security.spec.EncodedKeySpec;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Date;

import static org.springframework.cache.interceptor.SimpleKeyGenerator.generateKey;

public class JwtUtil {
    //@Value("#{aplication.security.jwt.secret-key}")
    private String keyOrigin = "+Ck0TDxFSrboNXUZxLZEDSMZK4glQ3EJJyeFAaQe4ghKXftfH2Hyi5eDjEwTg";

    public String generateToken(String email) throws NoSuchAlgorithmException, KeyStoreException {
        byte[] keyBytes = Decoders.BASE64URL.decode(keyOrigin);
        Key key = Keys.hmacShaKeyFor(keyBytes);

        KeyGenerator keyGen = KeyGenerator.getInstance("AES");
        SecureRandom random = new SecureRandom();

        Date creationDate = new Date();
        Date expirationDate = new Date(creationDate.getTime() + 86400000);
        System.out.println("email: "+email);
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(creationDate)
                .setExpiration(expirationDate)
                .signWith(key)
                .compact();
    }

    public String getEmailFromToken(String token) {
        System.out.println(token);
        if (token.startsWith("Bearer ") && !token.substring(7).equals("null")) {

            byte[] keyBytes = Decoders.BASE64URL.decode(keyOrigin);
            Key key = Keys.hmacShaKeyFor(keyBytes);
            String tokenFinal = token.substring(7);

            Claims claims = Jwts.parser()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(tokenFinal)
                    .getBody();

            System.out.println(claims);
            System.out.println(claims.getSubject());
            return claims.getSubject();
        }
        System.out.println("skip if");
        return null;

    }
}

