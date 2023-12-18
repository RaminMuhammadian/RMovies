package dev.raminm.movies.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "watchlist")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Watchlist {
    @Id
    private String id;
    private String imdbId;
    private String userId;

    public Watchlist(String imdbId, String userId) {
        this.imdbId = imdbId;
        this.userId = userId;
    }
}
