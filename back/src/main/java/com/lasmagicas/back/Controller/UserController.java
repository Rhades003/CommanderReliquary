package com.lasmagicas.back.Controller;

import com.lasmagicas.back.Model.User;
import com.lasmagicas.back.Repository.UserRepository;
import jakarta.validation.Valid;
import org.apache.catalina.connector.RequestFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpRequest;
import java.util.Optional;

@RestController
@RequestMapping("users")
public class UserController {

    @Autowired
    private UserRepository userRepository;


    @CrossOrigin(origins = {"http://localhost:3000", "http://192.168.1.137:3000"})
    @GetMapping("/getAllUsers")
    public @ResponseBody Iterable<User> getAllUser(){
        return userRepository.findAll();
    }

    @CrossOrigin(origins = {"http://localhost:3000", "http://192.168.1.137:3000"})
    @GetMapping("/getUser/{id}")
    public @ResponseBody Optional<User> getUser(@PathVariable long id){
        return userRepository.findById(id);
    }

    @CrossOrigin(origins = {"http://localhost:3000", "http://192.168.1.137:3000"})
    @PostMapping("/register")
    public User register(@Valid @RequestBody User user){
       userRepository.save(user);
       return user;
    }
}
