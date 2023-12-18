package dev.raminm.movies.request;

import lombok.Data;

@Data
public class SigninRequest {

    private String email;
    private String password;
}
