package mk.ukim.finki.mk.greenchallenge.model;

//import jakarta.persistence.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

import java.time.LocalDate;

@Data
@Document(collection = "actions")
public class Action {
    @Id
    private String id;

    private String description;

    private LocalDate date;

    private String userId;  // Store user ID here as reference

    private int points;
}
