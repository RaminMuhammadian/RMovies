package dev.raminm.movies.services;


import dev.raminm.movies.entities.Watchlist;
import dev.raminm.movies.repositories.WatchlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WatchlistService {
    @Autowired
    private WatchlistRepository watchlistRepository;

    public List<Watchlist> findWatchlistByUserId(String userId) {
        return watchlistRepository.findWatchlistByUserId(userId);
    }

    public List<Watchlist> findWatchlistByImdbIdAndUserId(String imdbId, String userId) {
        return watchlistRepository.findWatchlistByImdbIdAndUserId(imdbId, userId);
    }

    public Watchlist addToWatchlist(String imdbId, String userId) {
        Watchlist watchlist = new Watchlist(imdbId, userId);
        return watchlistRepository.save(watchlist);
    }
    public void deleteWatchlistByUserIdAndImdbId(String userId, String imdbId) {
        watchlistRepository.deleteWatchlistByUserIdAndImdbId(userId, imdbId);
    }
}


