package com.lasmagicas.back;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.FactoryBasedNavigableListAssert.assertThat;
import static org.springframework.test.util.AssertionErrors.assertEquals;

@SpringBootTest
public class UserControllerTest {


    private UserRepository userRepository;

    @Autowired
    UserController userController;

    @Test
    public void checkGetUsersTest(){

        Iterable<User> mockUsers = Arrays.asList(
                new User(1L,"Ruben"),
                new User(2L,"Bob")
        );

        Iterable<User> users = userController.getAllUser();
         //assertEquals("Nombre correcto", "Ruben", ((List<User>)).get(0).getName());

         //assertThat(this.userController.getForObjects())


    }
}




