import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { API_KEY, baseURL } from "../Components/Api";
import SpMovies from "./Navbar screens/SpMoviesList";

// accessing the "modal" to remove the "show" class on search
const modal = document.getElementsByClassName("sp_search_modal");

const SearchScreen = ({ getMovieId, getSearchQuery }) => {
  // LOGIC ///////////////////////////////////////
  const [firstMovieList, setFirstMovieList] = useState([]);
  const [loading, setLoading] = useState(null);

  const history = useHistory();

  // extracting the dynamic part (query) from url
  const { query } = useParams();

  // getting the movies from api
  useEffect(() => {
    let cancel = true;
    const ac = new AbortController();

    async function getFirstMovies() {
      setLoading(true);
      try {
        const response = await fetch(`${baseURL}/search/movie?api_key=${API_KEY}&query=${query}&page=1`, { signal: ac.signal });
        const data = await response.json();
        if (cancel) {
          setFirstMovieList(data.results);
          setLoading(false);
        }
        if (ac.signal.aborted) {
          console.log("Request has been aborted!");
          setLoading(false);
        }
      } catch (e) {
        console.log(e.message);
      }
    }
    getFirstMovies();

    // removing the "show" class from modal
    if (modal[0].classList.contains("show")) {
      modal[0].classList.remove("show");
    }

    // scrolling to the top on page render
    window.scrollTo(0, 0);

    // the cleanUp
    return () => {
      cancel = false;
      // aborting the fetch
      ac.abort();
    };
  }, [query, history]);

  // JSX ///////////////////////////////////////
  return (
    <div className='search_screen'>
      <SpMovies
        movies={firstMovieList}
        getMovieId={getMovieId}
        title={`Top results for : ${query}`}
        getSearchQuery={getSearchQuery}
        search
        loading={loading}
      />
    </div>
  );
};

export default SearchScreen;
