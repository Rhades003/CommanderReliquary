package com.lasmagicas.back.Controller;

import com.lasmagicas.back.DTO.UserResponse;
import com.lasmagicas.back.Model.User;
import com.lasmagicas.back.Repository.UserRepository;
import com.lasmagicas.back.security.JwtUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpRequest;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @CrossOrigin(origins = {"http://localhost:3000", "http://192.168.1.137:3000"})
    @GetMapping("/getAllUsers")
    public @ResponseBody Iterable<UserResponse> getAllUser(){

        List<UserResponse> userList = userRepository.findAll().stream().map(UserResponse::new).toList();

        userList.forEach(System.out::println);
        Iterable<UserResponse> userIterable = userList;

        return  userIterable;
        //return (Iterable<UserResponse>) userRepository.findAll().stream().map(UserResponse::new).collect(toList()).iterator();
    }

    @CrossOrigin(origins = {"http://localhost:3000", "http://192.168.1.137:3000"})
    @GetMapping("/getUser/{id}")
    public @ResponseBody Optional<User> getUser(@PathVariable long id){
        return userRepository.findById(id);
    }

    @CrossOrigin(origins = {"http://localhost:3000", "http://192.168.1.137:3000"})
    @PostMapping("/register")
    public User register(@Valid @RequestBody User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
       userRepository.save(user);
       return user;
    }

    @CrossOrigin(origins = {"http://localhost:3000", "http://192.168.1.137:3000"})
    @PostMapping("/login")
    public HashMap<String, String> login(@Valid @RequestBody User user, HttpSession session) throws NoSuchAlgorithmException, KeyStoreException {
        Optional<User> user2 = userRepository.findByEmail(user.getEmail());
        HashMap<String, String> data = new HashMap<>();
        data.put("status", "401");
        data.put("message","credenciales incorrectas");
        if (user2.isPresent()) {
            if (!passwordEncoder.matches(user.getPassword(), user2.get().getPassword())) return data;
        }
        else return data;

        JwtUtil jwtUtil = new JwtUtil();
        String token = jwtUtil.generateToken(user.getUsername());


        data.put("status", "200");
        data.put("message","login succesfull");
        data.put("token", token);
        return data;
    }

}
