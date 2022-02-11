import { fetchComedy } from "../Api";
import MovieList from "./MovieList";

const NetflixOriginals = ({ getMovieId }) => {
  return <MovieList API_URL={fetchComedy} title='Comedy' getMovieId={getMovieId} />;
};

export default NetflixOriginals;
