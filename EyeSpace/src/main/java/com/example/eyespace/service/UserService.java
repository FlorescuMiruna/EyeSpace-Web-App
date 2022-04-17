package com.example.eyespace.service;

import com.example.eyespace.domain.User;
import com.example.eyespace.exception.domain.EmailExistException;
import com.example.eyespace.exception.domain.UserNotFoundException;
import com.example.eyespace.exception.domain.UsernameExistException;

import java.util.List;

public interface UserService {

    User register(String firstName, String lastName, String username, String email) throws UserNotFoundException, UsernameExistException, EmailExistException;

    List<User> getUsers();

    User findUserByUsername(String username);

    User findUserByEmail(String email);
}
