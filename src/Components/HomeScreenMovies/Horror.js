import { fetchHorror } from "../Api";
import MovieList from "./MovieList";

const NetflixOriginals = ({ getMovieId }) => {
  return <MovieList API_URL={fetchHorror} title='Horror' getMovieId={getMovieId} />;
};

export default NetflixOriginals;
