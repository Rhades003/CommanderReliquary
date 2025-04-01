package com.lasmagicas.back.Controller;

import com.lasmagicas.back.DTO.UserResponse;
import com.lasmagicas.back.Model.User;
import com.lasmagicas.back.Repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpRequest;
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
    public String login(@Valid @RequestBody User user){
        Optional<User> user2 = userRepository.findByEmail(user.getEmail());

        if (user2.isPresent()) {
            if (!passwordEncoder.matches(user.getPassword(), user2.get().getPassword())) return "Contraseña incorrecto";
        }
        else return "Usuario con el email requerido no encontrado";

        return "true";
    }
}
