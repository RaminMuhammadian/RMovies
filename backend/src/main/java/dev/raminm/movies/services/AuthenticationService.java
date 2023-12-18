package dev.raminm.movies.services;

import dev.raminm.movies.entities.User;
import dev.raminm.movies.request.RefreshTokenRequest;
import dev.raminm.movies.request.SignUpRequest;
import dev.raminm.movies.request.SigninRequest;
import dev.raminm.movies.response.JwtAuthenticationResponse;

public interface AuthenticationService {

    User signup(SignUpRequest signUpRequest);

    JwtAuthenticationResponse signin(SigninRequest signinRequest);

    JwtAuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest);
}
