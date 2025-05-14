package com.lasmagicas.back.Controller;

import com.lasmagicas.back.DTO.UserResponse;
import com.lasmagicas.back.Model.User;
import com.lasmagicas.back.Repository.UserRepository;
import com.lasmagicas.back.security.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
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

    JwtUtil jwtUtil = new JwtUtil();

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
    public @Valid String register(@Valid @RequestBody User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        try{
            userRepository.save(user);
            return user.getId().toString();
        } catch (RuntimeException e) {
            //throw new RuntimeException(e);
            return  e.toString();
        }

    }

    @CrossOrigin(origins = {"http://localhost:3000", "http://192.168.1.137:3000"})
    @PostMapping("/login")
    public HashMap<String, String> login(@Valid @RequestBody User user) throws NoSuchAlgorithmException, KeyStoreException {
        Optional<User> user2 = userRepository.findByEmail(user.getEmail());
        HashMap<String, String> data = new HashMap<>();
        data.put("status", "401");
        data.put("message","credenciales incorrectas");
        if (user2.isPresent()) {
            if (!passwordEncoder.matches(user.getPassword(), user2.get().getPassword())) return data;
        }
        else return data;

        System.out.println("Emial en el matodo login "+user.getEmail());
        String token = jwtUtil.generateToken(user.getEmail());


        data.put("status", "200");
        data.put("message","login succesfull");
        data.put("token", token);
        System.out.println(user.getName());
        System.out.println(user2.get().getName());
        data.put("name", user2.get().getName());
        return data;
    }

}
