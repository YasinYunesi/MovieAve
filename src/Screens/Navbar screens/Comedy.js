import { useEffect, useState } from "react";
import { fetchComedy } from "../../Components/Api";
import SpMoviesList from "./SpMoviesList";

const Comedy = ({ getMovieId, getSearchQuery }) => {
  // LOGIC ///////////////////////////////
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(null);

  // fetching movies from api
  useEffect(() => {
    let cancel = true;
    const ac = new AbortController();

    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch(fetchComedy, { signal: ac.signal });
        const data = await response.json();
        if (cancel) {
          setMovies(data.results);
          setLoading(false);
        }
        if (ac.signal.aborted) {
          console.log("Request has been aborted!");
          setLoading(false);
        }
      } catch (e) {
        return;
      }
    }

    fetchData();

    // the cleanUp
    return () => {
      cancel = false;
      // aborting the fetch
      ac.abort();
    };
  }, []);

  // JSX ///////////////////////////////
  return (
    <div>
      <SpMoviesList
        movies={movies}
        getMovieId={getMovieId}
        getSearchQuery={getSearchQuery}
        data='comedy'
        title='Comedy'
        loading={loading}
      />
    </div>
  );
};

export default Comedy;
