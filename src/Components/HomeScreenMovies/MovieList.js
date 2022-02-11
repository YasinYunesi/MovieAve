import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseImgURL } from "../Api";
import Slider from "react-slick";
import "./MovieList.scss";

// Custom slider arrows
function SampleNextArrow({ onClick }) {
  return (
    <button className='carousel_btn btn shadow-none border-0 rounded-circle position-absolute' onClick={onClick}>
      <i className='fa fa-chevron-right' />
    </button>
  );
}
function SamplePrevArrow({ onClick }) {
  return (
    <button className='carousel_btn btn shadow-none border-0 rounded-circle position-absolute me-5' onClick={onClick}>
      <i className='fa fa-chevron-left' />
    </button>
  );
}

const MovieList = ({ API_URL, title, getMovieId }) => {
  // LOGIC //////////////////////////////
  const [movies, setMovies] = useState([]);

  // fetching movies
  useEffect(() => {
    let cancel = true;
    const ac = new AbortController();

    async function fetchData() {
      try {
        const response = await fetch(API_URL, { signal: ac.signal });
        const data = await response.json();
        if (cancel) {
          setMovies(data.results);
        }
        if (ac.signal.aborted) {
          console.log("Request has been aborted!");
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
  }, [API_URL]);

  // the truncate func for movie detail discription
  function truncate(text, n) {
    return text?.length > n ? text.substr(0, n) + "..." : text;
  }

  // React slick settings
  const settings = {
    infinite: true,
    lazyLoad: true,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 690,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // JSX //////////////////////////////
  return (
    <div className='movie_list_container mt-5 pb-4'>
      {/* the title and btns */}
      <div className='d-flex justify-content-between px-2'>
        <h1 className='fw-bold mb-4'>{title}</h1>
      </div>

      {/* the carousel */}
      <Slider className='movie_list' {...settings}>
        {movies.map((movie) => {
          return (
            // the condition blow is to prevent dead link
            movie.poster_path && (
              <div className='movie_container position-relative' key={movie.id}>
                <img className='movie_img col-12' src={`${baseImgURL}/${movie.poster_path}`} alt='Movie poster' />
                <div className='movie_detail h-100 position-absolute pt-4'>
                  <div className='play_btn_container text-end position-absolute end-0'>
                    <Link
                      className='play_btn btn fs-5 shadow-none rounded-circle me-4'
                      to={`/movie-detail/${movie.id}`}
                      onClick={() => getMovieId(movie.id)}
                    >
                      <i className='fa fa-play'></i>
                    </Link>
                  </div>
                  <h4 className='ps-2 mb-2 fw-bold'>
                    {truncate(movie.name || movie.title || movie.original_title, 20) || "Untitled"}
                  </h4>
                  <p className='ms-3'>{movie.release_date?.substr(0, 4) || movie.first_air_date?.substr(0, 4)}</p>
                  <div className='d-flex align-items-center justify-content-between px-2'>
                    <span className='px-3 py-1 rounded-1'>IMDb</span>
                    <h5 className='my-auto'>
                      {movie.vote_average} <span>/10</span>
                    </h5>
                  </div>
                  <p className='ps-3 pe-1 pt-4'>{truncate(movie.overview, 85) || "No overview found for this movie!"}</p>
                  <div className='d-flex justify-content-end px-2 mt-5'>
                    <Link className='btn shadow-none' to={`/movie-detail/${movie.id}`} onClick={() => getMovieId(movie.id)}>
                      More info
                    </Link>
                  </div>
                </div>
              </div>
            )
          );
        })}
      </Slider>
    </div>
  );
};

export default MovieList;
