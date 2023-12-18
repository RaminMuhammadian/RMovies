package dev.raminm.movies.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.raminm.movies.entities.Watchlist;
import dev.raminm.movies.services.WatchlistService;

@RestController
@RequestMapping("/api/watchlist")
public class WatchlistController {
    @Autowired
    private WatchlistService watchlistService;


    @GetMapping("/watchlistUser/{userId}")
    public ResponseEntity<List<Watchlist>> getWatchlistUserByUserId(@PathVariable String userId) {
        List<Watchlist> watchlistUser = watchlistService.findWatchlistByUserId(userId);
        return new ResponseEntity<>(watchlistUser, HttpStatus.OK);
    }

    @PostMapping("/add/{imdbId}/{userId}")
    public ResponseEntity<String> addMovieToWatchlist(
            @PathVariable String imdbId,
            @PathVariable String userId
    ) {
        List<Watchlist> existingWatchlist = watchlistService.findWatchlistByImdbIdAndUserId(imdbId, userId);
        if (!existingWatchlist.isEmpty()) {
            return ResponseEntity.badRequest().body("Movie already in the watchlist.");
        } else {
            Watchlist watchlist = watchlistService.addToWatchlist(imdbId, userId);
            return ResponseEntity.status(HttpStatus.CREATED).body("Movie added to the watchlist successfully.");
        }
    }
    @DeleteMapping("/delete/{imdbId}/{userId}")
    public ResponseEntity<String> deleteMovieFromWatchlist(
            @PathVariable String imdbId,
            @PathVariable String userId
    ) {
        List<Watchlist> existingWatchlist = watchlistService.findWatchlistByImdbIdAndUserId(imdbId, userId);
        if (existingWatchlist.isEmpty()) {
            return ResponseEntity.badRequest().body("Movie not found in the watchlist.");
        } else {
            watchlistService.deleteWatchlistByUserIdAndImdbId(userId, imdbId);
            return ResponseEntity.ok("Movie deleted from the watchlist successfully.");
        }
    }

}
