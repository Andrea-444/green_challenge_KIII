package mk.ukim.finki.mk.greenchallenge.service;

import mk.ukim.finki.mk.greenchallenge.model.User;
import mk.ukim.finki.mk.greenchallenge.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void addPoints(User user, int points) {
        user.setPoints(user.getPoints() + points);
        userRepository.save(user);
    }

    // Use MongoDB query method for top 3 by points (more efficient)
    public List<User> getTop3Users() {
        return userRepository.findTop3ByOrderByPointsDesc();
    }

    // Changed Long to String id to match MongoDB id type
    public Optional<User> getUser(String id) {
        return userRepository.findById(id);
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
