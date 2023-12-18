import React, { useState, useEffect } from 'react';
import WatchlistApi from '../../api/WatchlistApi'; 
import {Button } from 'react-bootstrap';


const Watchlist = ({ movies }) => {
  const [watchlist, setWatchlist] = useState([]);
  const [newMovie, setNewMovie] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem('user_id'));

  useEffect(() => {
    fetchWatchlist();
    setIsLoggedIn(!!sessionStorage.getItem('user_id'));
  }, []);


  const fetchWatchlist = async () => {
    try {
      const response = await WatchlistApi.fetchWatchlist();
      setWatchlist(response.data);
    } catch (error) {
      console.error('Error fetching watchlist:', error);
    }
  };

  const addMovie = async () => {
    try {
      const userId = sessionStorage.getItem('user_id');
      await WatchlistApi.addMovieToWatchlist(newMovie, userId);
      setNewMovie('');
      fetchWatchlist();
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  };

  const deleteMovie = async (imdbId) => {
    try {
      await WatchlistApi.deleteMovieFromWatchlist(imdbId);
      fetchWatchlist();
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };


  return (
    <div className="watchlist-container">
      <h1 className="watchlist-title">My Watchlist</h1>
      {isLoggedIn && movies && (
        <ul className="movie-list">
          {movies.map((movie) => (
            watchlist.map((watch) => {
              if (movie.imdbId === watch.imdbId) {
                return (
                  <div className="movie-card-container">
                    <div className="movie-card" style={{ '--img': `url(${movie.backdrops?.[0] || ''})` }}>
                      {movie.title} {}
                      <Button variant="danger" onClick={() => deleteMovie(movie.imdbId)}>
                        Remove
                      </Button>
                    </div>
                  </div>
                );
              }
            })
          ))}
        </ul>
      )}
    </div>
  );
};

export default Watchlist;
