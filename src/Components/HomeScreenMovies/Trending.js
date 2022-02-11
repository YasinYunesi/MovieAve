import { fetchTrending } from "../Api";
import MovieList from "./MovieList";

const Trending = ({ getMovieId }) => {
  return <MovieList API_URL={fetchTrending} title='Trending now' getMovieId={getMovieId} />;
};

export default Trending;
