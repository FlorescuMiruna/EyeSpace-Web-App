package com.example.eyespace.service.impl;

import com.example.eyespace.domain.User;
import com.example.eyespace.domain.UserPrincipal;
//import com.example.eyespace.exception.domain.EmailExistException;
//import com.example.eyespace.exception.domain.UserNotFoundException;
//import com.example.eyespace.exception.domain.UsernameExistException;
import com.example.eyespace.repository.UserRepository;
import com.example.eyespace.service.UserService;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

//import static com.example.eyespace.constant.UserImplConstant.*;
//import static com.example.eyespace.enumeration.Role.*;
import static org.apache.commons.lang3.StringUtils.EMPTY;

@Service
@Transactional
@Qualifier("userDetailsService")
public class UserServiceImpl implements UserService, UserDetailsService {

    private Logger LOGGER = LoggerFactory.getLogger(getClass());
    private UserRepository userRepository;


    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;

    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findUserByUsername(username);
        if (user == null) {
            LOGGER.error("User not found by username" + username);
            throw new UsernameNotFoundException("User not found by username" + username);
        } else {
            user.setLastLoginDateDisplay(user.getLastLoginDate());
            user.setLastLoginDate(new Date());
            userRepository.save(user);
            UserPrincipal userPrincipal = new UserPrincipal(user);
            LOGGER.info("Returning found user by username:" + username);
            return userPrincipal;
        }
    }
}
