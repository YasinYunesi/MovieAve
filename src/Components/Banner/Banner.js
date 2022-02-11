import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { database } from "../../firebase";
import Notiflix from "notiflix";
import "./Banner.scss";

const Banner = ({ fetchDataApi, getMovieId }) => {
  // LOGIC /////////////////////////////////
  const [bannerMovie, setBannerMovie] = useState([]);
  const [width, setWidth] = useState(false);
  const [loading, setLoading] = useState(false);

  // the logic for less words in banner discription
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 750) {
        setWidth(true);
      } else {
        setWidth(false);
      }
    });
  }, []);

  // the truncate func for banner discription
  function truncate(text, n) {
    return text?.length > n ? text.substr(0, n) + "..." : text;
  }

  // fetching movies
  useEffect(() => {
    let cancel = true;
    const ac = new AbortController();

    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch(fetchDataApi, { signal: ac.signal });
        const data = await response.json();
        if (cancel) {
          setBannerMovie(data.results[Math.floor(Math.random() * data.results.length - 1)]);
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

    return () => {
      cancel = false;
      setLoading(false);
    };
  }, [fetchDataApi]);

  // adding the movie to watch later
  function addToWatchLater() {
    const watchLaterRef = database.ref("WatchLater");
    // adding the movie to the list
    watchLaterRef
      .orderByChild("id")
      .equalTo(bannerMovie.id)
      .once("value", (snapshot) => {
        if (snapshot.exists()) {
          Notiflix.Notify.warning("Movie already exists in the list!");
        } else {
          watchLaterRef.push(bannerMovie);
          Notiflix.Notify.success("Movie successfully added to watch later.");
        }
      });
  }
  // adding the movie to My list
  function addToMyList() {
    const myListRef = database.ref("MyList");
    // adding the movie to the list
    myListRef
      .orderByChild("id")
      .equalTo(bannerMovie.id)
      .once("value", (snapshot) => {
        if (snapshot.exists()) {
          Notiflix.Notify.warning("Movie already exists in the list!");
        } else {
          myListRef.push(bannerMovie);
          Notiflix.Notify.success("Movie successfully added to your list.");
        }
      });
  }

  // JSX /////////////////////////////////
  return loading ? (
    <div className='loading_container d-flex justify-content-center align-items-center'>
      <div className='spinner'>
        <div className='double-bounce1'></div>
        <div className='double-bounce2'></div>
      </div>
    </div>
  ) : (
    <div
      className='home_screen_banner position-relative mb-5'
      style={
        (bannerMovie?.backdrop_path || bannerMovie?.poster_path) && {
          background: "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))",
          backgroundImage: `URL(https://image.tmdb.org/t/p/original/${bannerMovie?.backdrop_path || bannerMovie?.poster_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }
      }
    >
      {/* the shadows */}
      <div className='banner_top_shadow position-absolute top-0 start-0 bottom-0 end-0'></div>
      <div className='banner_bottom_shadow position-absolute bottom-0 w-100'></div>

      {/* the content of banner */}
      <div className='banner_content ps-5 mt-lg-5 position-absolute'>
        <h1 className='fw-bold mb-4 display-5'>{bannerMovie?.title || bannerMovie?.original_title || "no title"}</h1>
        <div className='d-flex flex-md-row flex-column mb-5'>
          <button className='dark_btn btn shadow-none border-0' onClick={addToMyList}>
            <i className='fa fa-plus me-1' title='Add to your list'></i> My list
          </button>
          <button className='dark_btn btn shadow-none border-0 ms-md-4 mt-md-0 mt-3' onClick={addToWatchLater}>
            <i className='fa fa-clock me-1' title='Watch later'></i> Watch later
          </button>
        </div>
        <p className='col-11 col-md-7 col-xxl-5 pb-xxl-2'>
          {truncate(bannerMovie?.overview || "No Overview found!", width ? 420 : 320)}
        </p>
        <div className='d-md-flex align-items-md-center mt-5'>
          <h4>
            <span className='me-2'>
              <i className='fa fa-fire rounded-circle me-3'></i>
              {bannerMovie?.vote_average || "0.0"}
            </span>{" "}
            <span>/10</span>
          </h4>
          <Link
            className='light_btn btn shadow-none mt-4 mt-md-0 ms-md-5 mb-2 px-3 py-2'
            to={bannerMovie && `/movie-detail/${bannerMovie.id}`}
            onClick={() => getMovieId(bannerMovie.id)}
          >
            <i className='fa fa-info-circle me-2'></i>
            More info
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
