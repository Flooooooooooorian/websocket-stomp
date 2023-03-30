package com.example.backend;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users/me")
public class UserController {

    @GetMapping
    public String getMe() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
}
