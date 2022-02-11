import { fetchAction } from "../Api";
import MovieList from "./MovieList";

const NetflixOriginals = ({ getMovieId }) => {
  return <MovieList API_URL={fetchAction} title='Action' getMovieId={getMovieId} />;
};

export default NetflixOriginals;
