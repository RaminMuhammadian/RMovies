package dev.raminm.movies.repositories;


import dev.raminm.movies.entities.Role;
import dev.raminm.movies.entities.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {


    Optional<User> findByEmail(String email);

    User findByRole(Role role);
}