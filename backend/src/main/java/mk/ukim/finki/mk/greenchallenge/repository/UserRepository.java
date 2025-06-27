package mk.ukim.finki.mk.greenchallenge.repository;

import mk.ukim.finki.mk.greenchallenge.model.User;
//import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByUsername(String username);
    List<User> findTop3ByOrderByPointsDesc();
}