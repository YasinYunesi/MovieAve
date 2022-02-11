import { useState } from "react";
import { useEffect } from "react";
import { fetchTopRated } from "../Api";
import MovieList from "./MovieList";

const NetflixOriginals = ({ getMovieId }) => {
  // LOGIC //////////////////////////////
  const [movies, setMovies] = useState([]);

  // fetching movies
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(fetchTopRated);
      const data = await response.json();
      setMovies(data.results);
    }
    fetchData();
  }, []);

  // the truncate func for movie detail discription
  function truncate(text, n) {
    return text?.length > n ? text.substr(0, n) + "..." : text;
  }

  // JSX //////////////////////////////
  return <MovieList movies={movies} truncate={truncate} title='Top Rated' getMovieId={getMovieId} />;
};

export default NetflixOriginals;
