package mk.ukim.finki.mk.greenchallenge.web;

import jakarta.servlet.http.HttpSession;
import mk.ukim.finki.mk.greenchallenge.model.Action;
import mk.ukim.finki.mk.greenchallenge.model.User;
import mk.ukim.finki.mk.greenchallenge.service.ActionService;
import mk.ukim.finki.mk.greenchallenge.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

// @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/actions")
public class ActionController {

    private final ActionService actionService;
    private final UserService userService;

    public ActionController(ActionService actionService, UserService userService) {
        this.actionService = actionService;
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<Action> logAction(@RequestBody Action action, HttpSession session) {
        String userId = (String) session.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(401).build();
        }

        Optional<User> userOpt = userService.getUser(userId);
        if (userOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        User user = userOpt.get();
        action.setUserId(userId);
        userService.addPoints(user, action.getPoints());
        Action savedAction = actionService.logAction(action);
        return ResponseEntity.ok(savedAction);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Action>> getUserActions(@PathVariable String userId, HttpSession session) {
        String sessionUserId = (String) session.getAttribute("userId");
        if (sessionUserId == null || !sessionUserId.equals(userId)) {
            return ResponseEntity.status(401).build();
        }

        List<Action> actions = actionService.getActionsByUser(userId);
        return ResponseEntity.ok(actions);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateAction(@PathVariable String id, @RequestBody Action updatedAction, HttpSession session) {
        String userId = (String) session.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        Optional<Action> actionOpt = actionService.getActionRepository().findById(id);
        if (actionOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Action action = actionOpt.get();
        if (!action.getUserId().equals(userId)) {
            return ResponseEntity.status(403).body("Forbidden");
        }

        int oldPoints = action.getPoints();
        int newPoints = updatedAction.getPoints();
        int diff = newPoints - oldPoints;

        action.setDescription(updatedAction.getDescription());
        action.setPoints(newPoints);

        userService.addPoints(userService.getUser(userId).get(), diff);
        actionService.getActionRepository().save(action);
        return ResponseEntity.ok("Action updated successfully.");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAction(@PathVariable String id, HttpSession session) {
        String userId = (String) session.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        Optional<Action> actionOpt = actionService.getActionRepository().findById(id);
        if (actionOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Action action = actionOpt.get();
        if (!action.getUserId().equals(userId)) {
            return ResponseEntity.status(403).body("Forbidden");
        }

        Optional<User> userOpt = userService.getUser(userId);
        userOpt.ifPresent(user -> userService.addPoints(user, -action.getPoints()));

        actionService.getActionRepository().delete(action);
        return ResponseEntity.ok("Action deleted successfully.");
    }
}
