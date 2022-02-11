import { fetchSci_fi } from "../Api";
import MovieList from "./MovieList";

const Sci_fi = ({ getMovieId }) => {
  return <MovieList API_URL={fetchSci_fi} title='Science fiction' getMovieId={getMovieId} />;
};

export default Sci_fi;
