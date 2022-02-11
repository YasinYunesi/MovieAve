import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { baseImgURL } from "../Api";
import { database } from "../../firebase";
import Notiflix from "notiflix";
import "./MdBanner.scss";

const MdBanner = ({ movie, cast, genres }) => {
  // LOGIC //////////////////////////////////
  const [casts, setCasts] = useState([]);

  useEffect(() => {
    setCasts(cast?.slice(0, 5));
  }, [cast, movie]);

  const history = useHistory();

  // go back to the previous page on reload
  window.addEventListener("load", () => {
    history.push("/");
    alert("error");
  });

  // adding the movie to watch later
  function addToWatchLater() {
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
          Notiflix.Notify.success("Movie added to watch later!");
        }
      });
  }
  // adding the movie to My list
  function addToMyList() {
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
          Notiflix.Notify.success("Movie added to your list!");
        }
      });
  }

  // JSX //////////////////////////////////
  return (
    <div
      className='md_banner position-relative pt-5'
      style={
        (movie.backdrop_path || movie.poster_path) && {
          background: "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))",
          backgroundImage: `URL(${baseImgURL}/${movie?.backdrop_path || movie?.poster_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }
      }
    >
      {/* THE CONTENT */}
      <div className='md_banner_content ps-5 pt-3 pt-md-5 position-absolute'>
        {/* the title */}
        <h1 className='mb-4 display-5 fw-bold'>{movie.title || movie.original_title || "Untitled"}</h1>

        {/* the vote */}
        <h4 className='md_banner_vote d-flex align-items-center mb-3'>
          <span className='me-3'>{movie?.vote_average || "0.0"}</span> <span>/10</span>{" "}
          <p className='my-auto ms-3'>({movie.vote_count} reviews)</p>
        </h4>

        {/* time, genres, year */}
        <div className='md_banner_genre ps-2 mb-4 mb-md-5'>
          {/* run time */}
          <span>{movie.runtime}min</span>
          <i className='fa fa-dot-circle mx-4'></i>

          {/* genres */}
          <div className='d-inline'>
            {genres?.map((genre) => {
              return (
                <Link to={`/${genre.name === "Science Fiction" ? "sci-fi" : genre.name.toLowerCase()}`} key={genre.id}>
                  {genre.name},{" "}
                </Link>
              );
            })}
          </div>

          <i className='fa fa-dot-circle mx-4'></i>

          {/* release year */}
          <span>{movie.release_date?.substr(0, 4) || "2020"}</span>
        </div>

        {/* starring */}
        <h5 className='mb-3'>Starring</h5>
        <div className='md_banner_starring col-11 col-sm-8 mb-5 ps-2'>
          {casts.length < 1 ? (
            <span className='text-muted'>No cast found!</span>
          ) : (
            casts?.map((cast) => {
              return <span key={cast.name}>{cast.name}, </span>;
            })
          )}
        </div>

        {/* the buttons */}
        <div className='d-flex flex-md-row flex-column'>
          <button className='md_banner_btn btn shadow-none border-0' onClick={addToMyList}>
            <i className='fa fa-plus me-1' title='Add to your list'></i> My list
          </button>
          <button className='md_banner_btn btn shadow-none border-0 ms-md-4 mt-md-0 mt-3' onClick={addToWatchLater}>
            <i className='fa fa-bookmark me-1' title='Watch later'></i> Watch later
          </button>
        </div>
      </div>

      {/* THE SHADOWS */}
      <div className='md_banner_left_shadow position-absolute h-100 start-0 top-0'></div>
      <div className='md_banner_right_shadow position-absolute h-100 end-0 top-0 w-25'></div>
      <div className='md_banner_bottom_shadow position-absolute w-100 bottom-0 h-25'></div>
    </div>
  );
};

export default MdBanner;
