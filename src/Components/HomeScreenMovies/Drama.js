import { fetchDrama } from "../Api";
import MovieList from "./MovieList";

const NetflixOriginals = ({ getMovieId }) => {
  return <MovieList API_URL={fetchDrama} title='Drama' getMovieId={getMovieId} />;
};

export default NetflixOriginals;
