package dev.raminm.movies.repositories;

import dev.raminm.movies.entities.Watchlist;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface WatchlistRepository extends MongoRepository <Watchlist, String> {

    List<Watchlist> findWatchlistByImdbIdAndUserId(String imdbId, String UserId);

    List<Watchlist> findWatchlistByUserId(String UserId);
    void deleteWatchlistByUserIdAndImdbId(String userId, String imdbId);

}
