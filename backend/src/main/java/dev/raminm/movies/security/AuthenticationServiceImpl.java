package dev.raminm.movies.security;

import dev.raminm.movies.entities.Role;
import dev.raminm.movies.entities.User;
import dev.raminm.movies.repositories.UserRepository;
import dev.raminm.movies.request.RefreshTokenRequest;
import dev.raminm.movies.request.SignUpRequest;
import dev.raminm.movies.request.SigninRequest;
import dev.raminm.movies.response.JwtAuthenticationResponse;
import dev.raminm.movies.services.AuthenticationService;
import dev.raminm.movies.services.JWTService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepository; 

    private final PasswordEncoder passwordEncoder; 

    private final AuthenticationManager authenticationManager; 

    private final JWTService jwtService; 

    // Method to register a new user.
    public User signup(SignUpRequest signUpRequest) {
        User user = new User();

        user.setEmail(signUpRequest.getEmail());
        user.setFirstname(signUpRequest.getFirstName());
        user.setSecondname(signUpRequest.getLastName());
        user.setRole(Role.USER); 
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword())); 

        return userRepository.save(user); 
    }

    // Method for user sign-in.
    public JwtAuthenticationResponse signin(SigninRequest signinRequest) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(signinRequest.getEmail(), signinRequest.getPassword()));

        var user = userRepository.findByEmail(signinRequest.getEmail()).orElseThrow(() -> new IllegalArgumentException("Invalid email or password."));

        // Generate a new JWT token and a refresh token for the user.
        var jwt = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(new HashMap<>(), user);

        JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse();

        jwtAuthenticationResponse.setToken(jwt);
        jwtAuthenticationResponse.setRefreshToken(refreshToken);
        jwtAuthenticationResponse.setUserId(user.getId());
        return jwtAuthenticationResponse;
    }

    // Method to refresh the JWT token using a refresh token.
    public JwtAuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest) {
       
        String userEmail = jwtService.extractUserName(refreshTokenRequest.getToken());
       
        User user = userRepository.findByEmail(userEmail).orElseThrow();

        // Check if the refresh token is valid.
        if (jwtService.isTokenValid(refreshTokenRequest.getToken(), user)) {
            // Generate a new JWT token and use the provided refresh token.
            var jwt = jwtService.generateToken(user);

            JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse();

            jwtAuthenticationResponse.setToken(jwt);
            jwtAuthenticationResponse.setRefreshToken(refreshTokenRequest.getToken());
            return jwtAuthenticationResponse;
        }
        return null;
    }
}
