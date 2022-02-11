import { fetchRomance } from "../Api";
import MovieList from "./MovieList";

const NetflixOriginals = ({ getMovieId }) => {
  return <MovieList API_URL={fetchRomance} title='Romance' getMovieId={getMovieId} />;
};

export default NetflixOriginals;
