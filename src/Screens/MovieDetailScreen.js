import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { API_KEY, baseURL } from "../Components/Api";
import Navbar from "../Components/Navbar/Navbar";
import MdBanner from "../Components/Movie detail/MdBanner";
import MdLeft from "../Components/Movie detail/MdLeft";
import MdCenter from "./../Components/Movie detail/MdCenter";
import MdRight from "./../Components/Movie detail/MdRight";
import NotFoundScreen from "./NotFoundScreen";
import "./MovieDetailScreen.scss";

const MovieDetailScreen = ({ getMovieId, getSearchQuery }) => {
  // LOGIC /////////////////////////////
  const [movie, setMovie] = useState([]);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [backdrops, setBackdrops] = useState([]);
  const [posters, setPosters] = useState([]);
  const [genres, setGenres] = useState([]);
  const [similars, setSimilars] = useState([]);
  const [loading, setLoading] = useState(null);

  const history = useHistory();

  // extracting the dynamic part (id) from url
  const { id } = useParams();

  useEffect(() => {
    let cancel = true;
    const ac = new AbortController();

    // fetching the movie from api
    async function fetchMovie() {
      setLoading(true);
      try {
        const response = await fetch(`${baseURL}/movie/${id}?api_key=${API_KEY}`, { signal: ac.signal });
        const data = await response.json();
        if (cancel) {
          setMovie(data);
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
    fetchMovie();

    // fetching the movie from api
    async function fetchGenres() {
      try {
        const response = await fetch(`${baseURL}/movie/${id}?api_key=${API_KEY}`, { signal: ac.signal });
        const data = await response.json();
        if (cancel) {
          setGenres(data.genres);
        }
        if (ac.signal.aborted) {
          console.log("Request has been aborted!");
        }
      } catch (e) {
        return;
      }
    }
    fetchGenres();

    // fetching the cast from api
    async function fetchCast() {
      try {
        const response = await fetch(`${baseURL}/movie/${id}/credits?api_key=${API_KEY}`, { signal: ac.signal });
        const data = await response.json();
        if (cancel) {
          setCast(data.cast);
        }
        if (ac.signal.aborted) {
          console.log("Request has been aborted!");
        }
      } catch (e) {
        return;
      }
    }
    fetchCast();

    // fetching the reviews from api
    async function fetchReviews() {
      try {
        const response = await fetch(`${baseURL}/movie/${id}/reviews?api_key=${API_KEY}`, { signal: ac.signal });
        const data = await response.json();
        if (cancel) {
          setReviews(data.results);
        }
        if (ac.signal.aborted) {
          console.log("Request has been aborted!");
        }
      } catch (e) {
        return;
      }
    }
    fetchReviews();

    // fetching the backdrops from api
    async function fetchBackdrops() {
      try {
        const response = await fetch(`${baseURL}/movie/${id}/images?api_key=${API_KEY}`, { signal: ac.signal });
        const data = await response.json();
        if (cancel) {
          setBackdrops(data.backdrops);
        }
        if (ac.signal.aborted) {
          console.log("Request has been aborted!");
        }
      } catch (e) {
        return;
      }
    }
    fetchBackdrops();

    // fetching the posters from api
    async function fetchPosters() {
      try {
        const response = await fetch(`${baseURL}/movie/${id}/images?api_key=${API_KEY}`, { signal: ac.signal });
        const data = await response.json();
        if (cancel) {
          setPosters(data.posters);
        }
        if (ac.signal.aborted) {
          console.log("Request has been aborted!");
        }
      } catch (e) {
        return;
      }
    }
    fetchPosters();

    // fetching the posters from api
    async function fetchSimilars() {
      try {
        const response = await fetch(`${baseURL}/movie/${id}/similar?api_key=${API_KEY}`, { signal: ac.signal });
        const data = await response.json();
        if (cancel) {
          setSimilars(data.results);
        }
        if (ac.signal.aborted) {
          console.log("Request has been aborted!");
        }
      } catch (e) {
        return;
      }
    }
    fetchSimilars();

    // scrolling to the top on page render
    window.scrollTo(0, 0);

    // the cleanUp
    return () => {
      cancel = false;
      // aborting the fetch
      ac.abort();
    };
  }, [id, history]);

  // JSX /////////////////////////////
  return loading ? (
    <div className='loading_container d-flex align-items-center justify-content-center'>
      <div className='spinner'>
        <div className='double-bounce1'></div>
        <div className='double-bounce2'></div>
      </div>
    </div>
  ) : movie.status_code === 34 ? (
    <NotFoundScreen getSearchQuery={getSearchQuery} />
  ) : (
    <div className='movie_detail pb-4'>
      {/* the Navbar */}
      <Navbar position='position-absolute' />
      {/* the banner */}
      <MdBanner movie={movie} cast={cast} genres={genres} />

      <div className='d-xl-flex align-items-start py-5 px-4 px-md-5'>
        {/* the left side (cast, reviews) */}
        <MdLeft cast={cast} reviews={reviews} />

        <div className='d-xxl-flex col-12 col-xl-6 ps-xl-3'>
          {/* the center section (posters) */}
          <MdCenter backdrops={backdrops} posters={posters} />

          {/* the right side (similar movies) */}
          <MdRight similars={similars} getMovieId={getMovieId} />
        </div>
      </div>
    </div>
  );
};

export default MovieDetailScreen;
