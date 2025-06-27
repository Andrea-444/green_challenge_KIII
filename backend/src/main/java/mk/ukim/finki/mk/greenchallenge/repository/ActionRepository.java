package mk.ukim.finki.mk.greenchallenge.repository;

import mk.ukim.finki.mk.greenchallenge.model.Action;
//import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ActionRepository extends MongoRepository<Action, String> {
    List<Action> findByUserId(String userId);
}
