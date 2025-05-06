package com.lasmagicas.back.security;

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
    @Value("#{aplication.security.jwt.secret-key}")
    private String keyOrigin;

    public String generateToken(String email) throws NoSuchAlgorithmException, KeyStoreException {
        byte[] keyBytes = Decoders.BASE64URL.decode(keyOrigin);
        Key key = Keys.hmacShaKeyFor(keyBytes);

        KeyGenerator keyGen = KeyGenerator.getInstance("AES");
        SecureRandom random = new SecureRandom();

        Date creationDate = new Date();
        Date expirationDate = new Date(creationDate.getTime() + 86400000);
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(creationDate)
                .setExpiration(expirationDate)
                .signWith(key)
                .compact();
    }
}

