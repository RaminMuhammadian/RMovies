import './Hero.css';
import React, { useState, useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import WatchlistApi from '../../api/WatchlistApi'; 

const Hero = ({ movies }) => {
  const navigate = useNavigate();
  const [watchlist, setWatchlist] = useState([]);
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

  const imdbIdExists = (targetImdbId) => {
    return watchlist.some(movie => movie.imdbId === targetImdbId);
  };
  

  function reviews(movieId) {
    navigate(`/Reviews/${movieId}`);
  }

  const addMovie = async (newMovie) => {
    try {
      const userId = sessionStorage.getItem('user_id');
      await WatchlistApi.addMovieToWatchlist(newMovie, userId);
      fetchWatchlist();
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  };

  return (
    <div className="movie-carousel-container">
      <Carousel>
        {movies &&
          movies.map((movie) => (
            <Paper key={movie.imdbId}>
              <div className="movie-card-container">
                <div className="movie-card" style={{ '--img': `url(${movie.backdrops?.[0] || ''})` }}>
                  <div className="movie-detail">
                    <div className="movie-poster">
                      <img src={movie.poster || ''} alt="" />
                    </div>
                    <div className="movie-title">
                      <h4>{movie.title || 'Unknown Title'}</h4>
                    </div>
                   
                    <div className="add-movie-button-container">
                    {isLoggedIn && !imdbIdExists(movie.imdbId) && (
                      <Button variant="info" onClick={() => addMovie(movie.imdbId)}>
                        Add to watchlist
                      </Button>
                    )}
                  </div>                  
                    <div className="movie-buttons-container">
                      <Link to={`/Trailer/${movie.trailerLink?.substring(movie.trailerLink.length - 11) || ''}`}>
                        <div className="play-button-icon-container">
                          <FontAwesomeIcon className="play-button-icon" icon={faCirclePlay} />
                        </div>
                      </Link>
                      <div className="movie-review-button-container">
                        <Button variant="info" onClick={() => reviews(movie.imdbId)}>
                          Reviews
                        </Button>
                        

                     
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Paper>
          ))}
      </Carousel>
    </div>
  );
};

export default Hero;
