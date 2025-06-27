package mk.ukim.finki.mk.greenchallenge.service;

import mk.ukim.finki.mk.greenchallenge.model.Action;
import mk.ukim.finki.mk.greenchallenge.repository.ActionRepository;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ActionService {

    private final ActionRepository actionRepository;

    public ActionService(ActionRepository actionRepository) {
        this.actionRepository = actionRepository;
    }

    public Action logAction(Action action) {
        action.setDate(LocalDate.now());
        return actionRepository.save(action);
    }

    public List<Action> getActionsByUser(String userId) {
        return actionRepository.findByUserId(userId);
    }

    public void deleteActionById(String id) {
        actionRepository.deleteById(id);
    }

    public Action updateActionDescription(String actionId, String newDescription) {
        Action action = actionRepository.findById(actionId).orElseThrow(() ->
                new RuntimeException("Action not found")
        );
        action.setDescription(newDescription);
        return actionRepository.save(action);
    }

    public ActionRepository getActionRepository() {
        return actionRepository;
    }


}
