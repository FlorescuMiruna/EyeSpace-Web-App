package com.example.eyespace.resource;

import com.example.eyespace.exception.ExceptionHandling;
import com.example.eyespace.exception.domain.EmailExistException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
//@RequestMapping(value = "/user")
@RequestMapping(path = {"/","/user"})
public class UserResource extends ExceptionHandling {

    @GetMapping("/home")
    public String showUser() throws EmailExistException {
       // return "App works";
        throw new EmailExistException("This email adress is already taken");
    }
}
