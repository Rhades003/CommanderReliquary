package com.lasmagicas.back.Controller;

import com.lasmagicas.back.Model.User;
import com.lasmagicas.back.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
}
