import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { baseImgURL } from "../../Components/Api";
import { database } from "../../firebase";
import SpMoviesNav from "../../Components/SpMoviesNav/SpMoviesNav";
import SideBar from "../../Components/SideBar/SideBar";
import Notiflix from "notiflix";
import noResultImg from "../../Assets/Illustration/noResult2.svg";
import noResultImg2 from "../../Assets/Illustration/noResult4.svg";
import "./SpMoviesList.scss";

// accessing the "modal-backdrop" div
const modal_backdrop = document.getElementsByClassName("modal-backdrop");

const SpMovies = ({ movies, data, title, removeWatch, removeList, getMovieId, getSearchQuery, search, loading }) => {
  // LOGIC /////////////////////////////////
  const [sideHeight, setSideHeight] = useState(true);
  const [toTop, setToTop] = useState(false);
  const [noResult, setNoResult] = useState(false);
  const [shortMovieList, setShortMovieList] = useState(false);

  // getting the side height from navbar
  function sideHeightHandler(i) {
    setSideHeight(i);
  }

  // the truncate func for movie detail discription
  function truncate(text, n) {
    return text?.length > n ? text.substr(0, n) + "..." : text;
  }

  // all side effects
  useEffect(() => {
    // check if one movie is in the list
    if (movies.length === 1) {
      setShortMovieList(true);
    }

    // revealing the pgination and no Result
    setTimeout(() => {
      setNoResult(true);
    }, 1200);

    // to top btn
    window.addEventListener("scroll", () => {
      if (window.scrollY > 1000) {
        setToTop(true);
      } else {
        setToTop(false);
      }
    });

    // removing the modal-backdrop
    modal_backdrop.length >= 1 && modal_backdrop[0].classList.remove("modal-backdrop");

    // scrolling to the top on page render
    window.scrollTo(0, 0);

    // the warning for clearing the whole list
    setTimeout(() => {
      if ((removeWatch || removeList) && movies.length >= 1) {
        Notiflix.Report.warning(
          "Warning",
          "Dear user, due to some slight problems in our website you cannot remove a single movie from this list. However, if you want to clear the list completely there's a button at the end of this page to do so. Thanks for your patience.",
          "close"
        );
      }
    }, 1000);
  }, [removeList, removeWatch, movies]);

  // clearing the "watch later" or "my list"
  function clearWatchList() {
    const watchLaterRef = database.ref("WatchLater");
    watchLaterRef
      .remove()
      .then(() => {
        Notiflix.Notify.success("List successfully cleard.");
      })
      .catch((error) => {
        Notiflix.Notify.failure(error.message);
      });
  }
  function clearMyList() {
    const myListRef = database.ref("MyList");
    myListRef
      .remove()
      .then(() => {
        Notiflix.Notify.success("List successfully cleard.");
      })
      .catch((error) => {
        Notiflix.Notify.failure(error.message);
      });
  }

  // JSX /////////////////////////////////
  return (
    <div className='sp_movies'>
      {/* Navbar */}
      <SpMoviesNav sideHeightHandler={sideHeightHandler} getSearchQuery={getSearchQuery} />

      {/* main part start */}
      <div className='sp_main d-lg-flex'>
        {/* sideBar */}
        <SideBar data={data} sideHeight={sideHeight} />

        {/* main content start */}
        <div className={`sp_main_content ${shortMovieList && "sp_main_short"} py-5 col-11 col-lg-9 col-xl-10 mx-auto`}>
          {/* the main title */}
          <h1 className='sp_main_title text-white pt-5 text-center ps-lg-5 text-lg-start pb-4'>{title}</h1>

          {/* the cards and pagination and loading */}
          {/* no movie in the search list */}
          {movies.length <= 0 && noResult && search && (
            <div className={`${!sideHeight ? "sp_empty_container_long" : "sp_empty_container"}`}>
              <div className='sp_empty d-lg-flex justify-content-between col-12 col-lg-10 px-5 rounded-3 mt-5 py-5 text-white mx-auto'>
                <div>
                  <h1 className='fw-bold text-center text-lg-start'>Not a single match found for "{title.substr(18)}" !</h1>
                  <h5 className='mt-5'>Search help</h5>
                  <ul className='mt-3'>
                    <li>Check your search for typos</li>
                    <li>Change your search query</li>
                    <li>The movie you're searching for may be deleted or not yet on our site</li>
                  </ul>
                </div>
                <img className='col-12 col-lg-4' src={noResultImg} alt='No result found!' />
              </div>
            </div>
          )}
          {/* no movie in (watch later || my list) list */}
          {movies.length <= 0 && noResult && (removeWatch || removeList) && !search && (
            <div className='sp_empty_container'>
              <div className='sp_empty text-white col-12 col-lg-10 mx-auto px-5 rounded-3 mt-5 py-5 d-lg-flex align-items-center justify-content-around'>
                <div className='col-12 col-lg-5 mx-auto text-center mb-5 mb-lg-0'>
                  <h1>No movie in your list yet! maybe add one?</h1>
                  <Link to='/trending' className='btn shadow-none border-0 text-white mt-4 py-2 px-4'>
                    Check out trending movies!
                  </Link>
                </div>
                <img className='col-10 col-lg-3 mx-auto' src={noResultImg2} alt='No result' />
              </div>
            </div>
          )}
          {loading ? (
            <div className='loading_container pt-5 mt-5'>
              <div className='spinner'>
                <div className='double-bounce1'></div>
                <div className='double-bounce2'></div>
              </div>
            </div>
          ) : (
            movies.length >= 1 && (
              <div className='sp_cards_container pt-5'>
                {movies.map((movie) => {
                  return (
                    movie.overview.length > 100 && (
                      <div
                        className='sp_card d-flex mb-5 col-12 col-md-9 col-lg-9 col-xl-11 col-xxl-9 mx-auto position-relative'
                        key={movie.id}
                      >
                        {/* movie detail start */}
                        <div className='movie_detail col-12 col-xl-6 p-3'>
                          <div className='movie_detail_top d-xl-flex'>
                            <div className='movie_detail_top_img col-12 col-xl-2 mb-3 mb-xl-0'>
                              <Link
                                to={movie.poster_path && movie.backdrop_path ? `/movie-detail/${movie.id}` : "/not_found"}
                                onClick={() => getMovieId(movie.id)}
                                className='col-12'
                              >
                                <img className='w-100 h-100' src={`${baseImgURL}${movie.poster_path}`} alt='movie img' />
                              </Link>
                            </div>
                            <div className='movie_detail_top_text ps-xl-3 w-100'>
                              <Link
                                to={movie.poster_path && movie.backdrop_path ? `/movie-detail/${movie.id}` : "/not_found"}
                                onClick={() => getMovieId(movie.id)}
                              >
                                <h2 className='mb-1'>{truncate(movie.name || movie.title || movie.original_title, 27)}</h2>
                              </Link>
                              <p>{movie.release_date?.substr(0, 4) || movie.first_air_date?.substr(0, 4)}</p>
                              <div className='movie_detail_top_imdb mt-3 d-flex align-items-center justify-content-between'>
                                <span>{movie.vote_average}</span>
                                <span className='me-3 me-xl-5 px-2 py-1'>IMDb</span>
                              </div>
                            </div>
                          </div>
                          <div className='movie_detail_center pe-1 mt-3'>
                            <p>{truncate(movie.overview, 200)}</p>
                          </div>
                          <div className='movie_detail_end mt-5'>
                            <div className='position-absolute bottom-0 mb-2'>
                              {!removeList && (
                                <button
                                  className='btn shadow-none border-0'
                                  title='Add to your list'
                                  onClick={() => {
                                    const myListRef = database.ref("MyList");
                                    // adding the movie to the list
                                    myListRef
                                      .orderByChild("id")
                                      .equalTo(movie.id)
                                      .once("value", (snapshot) => {
                                        if (snapshot.exists()) {
                                          Notiflix.Notify.warning("Movie already exists in the list!");
                                        } else {
                                          myListRef.push(movie);
                                          Notiflix.Notify.success("Movie added to your list.");
                                        }
                                      });
                                  }}
                                >
                                  <i className='fa fa-heart'></i>
                                </button>
                              )}
                              {!removeWatch && (
                                <button
                                  className='btn shadow-none border-0'
                                  title='Add to watch later'
                                  onClick={() => {
                                    const watchLaterRef = database.ref("WatchLater");
                                    // adding the movie to the list
                                    watchLaterRef
                                      .orderByChild("id")
                                      .equalTo(movie.id)
                                      .once("value", (snapshot) => {
                                        if (snapshot.exists()) {
                                          Notiflix.Notify.warning("Movie already exists in the list!");
                                        } else {
                                          watchLaterRef.push(movie);
                                          Notiflix.Notify.success("Movie added to watch later.");
                                        }
                                      });
                                  }}
                                >
                                  <i className='fa fa-clock'></i>
                                </button>
                              )}
                            </div>
                            <Link
                              className='more_info_btn btn shadow-none border-0 position-absolute bottom-0 me-3 mb-2'
                              to={movie.poster_path && movie.backdrop_path ? `/movie-detail/${movie.id}` : "/not_found"}
                              title='More info about the movie'
                              onClick={() => getMovieId(movie.id)}
                            >
                              more info
                            </Link>
                          </div>
                        </div>
                        {/* movie detail end */}
                        {/* shadow start */}
                        <div className='movie_shadow position-absolute start-50 h-100 d-none d-xl-block'></div>
                        {/* shadow end */}
                        {/* movie poster start */}
                        <div className='movie_poster col-6 d-none d-xl-block text-center'>
                          <img className='w-100 h-100' src={`${baseImgURL}${movie.backdrop_path}`} alt='No poster found!' />
                        </div>
                        {/* movie poster end */}
                      </div>
                    )
                  );
                })}

                {/* the clear list btn for "watch later" and "my list" */}
                {(removeList || removeWatch) && (
                  <div className='col-10 mx-auto text-end pt-5'>
                    {removeList && (
                      <button
                        className='clear_list btn shadow-none border-0 py-2 px-4'
                        title='Clear the whole list'
                        onClick={clearMyList}
                      >
                        Clear list
                      </button>
                    )}
                    {removeWatch && (
                      <button
                        className='clear_list btn shadow-none border-0 py-2 px-4'
                        title='Clear the whole list'
                        onClick={clearWatchList}
                      >
                        Clear list
                      </button>
                    )}
                  </div>
                )}
              </div>
            )
          )}
        </div>
        {/* main content end */}
      </div>
      {/* main part end */}

      {/* back to top btn */}
      <button
        className={`sp_to_top btn shadow-none border-0 position-fixed bottom-0 start-50 d-flex align-items-center px-3 py-2 ${
          toTop ? "active" : ""
        }`}
        onClick={() => window.scrollTo(0, 0)}
      >
        <i className='fa fa-chevron-up'></i>
      </button>
    </div>
  );
};

export default SpMovies;
