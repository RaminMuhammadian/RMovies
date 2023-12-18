package dev.raminm.movies.controllers;

import dev.raminm.movies.entities.Role;
import dev.raminm.movies.entities.User;
import dev.raminm.movies.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class AdminController implements CommandLineRunner {
    @Autowired
    private UserRepository userRepository;

    public void run(String... args) {
        User adminAccount = userRepository.findByRole(Role.ADMIN);

        if (null == adminAccount) {
            User user = new User();
            user.setEmail("admin@gmail.com");
            user.setFirstname("admin");
            user.setSecondname("admin");
            user.setRole(Role.ADMIN);
            user.setPassword(new BCryptPasswordEncoder().encode("admin")); // Password hashed using BCrypt.
            userRepository.save(user); 
        }
    }

    @GetMapping
    public ResponseEntity<String> sayHello() {
        return ResponseEntity.ok("Hi Admin"); 
    }
}
