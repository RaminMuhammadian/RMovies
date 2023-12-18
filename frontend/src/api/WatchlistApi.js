import axios from 'axios';

const BASE_URL = '/api/watchlist'; 

const WatchlistApi = {
  fetchWatchlist: async () => {
    const userId = sessionStorage.getItem('user_id');
    const response = await axios.get(`${BASE_URL}/watchlistUser/${userId}`);
    return response;
  },
  addMovieToWatchlist: async (imdbId, userId) => {
    const response = await axios.post(`${BASE_URL}/add/${imdbId}/${userId}`);
    return response;
  },
  deleteMovieFromWatchlist: async (imdbId) => {
    
    const userId = sessionStorage.getItem('user_id');
    const response = await axios.delete(`${BASE_URL}/delete/${imdbId}/${userId}`);
    return response;
  },
};

export default WatchlistApi;
