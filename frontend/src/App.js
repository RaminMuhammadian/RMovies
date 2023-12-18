import './App.css';
import api from './api/axiosConfig';
import {useState, useEffect} from 'react';
import Layout from './components/Layout';
import {Routes, Route} from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/Reviews';
import Login from './components/authentication/Login'; 
import Register from './components/authentication/Register'; 
import Watchlist from './components/watchlist/Watchlist';

function App() {

  const [movies, setMovies] = useState();
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);
  const [userId, setUserId] = useState(sessionStorage.getItem('user_id'))

  const getMovies = async () =>{
    
    try
    {

      const response = await api.get("/api/movies");

      setMovies(response.data);

    } 
    catch(err)
    {
      console.log(err);
    }
  }

  const getMovieData = async (movieId) => {
     
    try 
    {
        const response = await api.get(`/api/movies/${movieId}`);

        const singleMovie = response.data;

        setMovie(singleMovie);

        setReviews(singleMovie.reviews);
        

    } 
    catch (error) 
    {
      console.error(error);
    }

  }

  useEffect(() => {
    getMovies();
  },[])

  return (
    <div className="App">
      <Header  userId={userId} setUserId = {setUserId}/>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home movies={movies} />}></Route>
          <Route path="/Trailer/:ytTrailerId" element={<Trailer />} />
          <Route path="/Reviews/:movieId" element={<Reviews getMovieData={getMovieData} movie={movie} reviews={reviews} setReviews={setReviews} />} />
          <Route path="/login" element={<Login setUserId = {setUserId} />} /> {}
          <Route path="/register" element={<Register />} /> {}
          <Route path="/watchlist" element={<Watchlist movies ={movies} />} /> {}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
