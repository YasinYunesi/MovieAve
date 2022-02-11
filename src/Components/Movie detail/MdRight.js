import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { baseImgURL } from "../Api";
import "./MdRight.scss";

const MdRight = ({ similars, getMovieId }) => {
  // LOGIC ////////////////////////////////////
  const [topMovies, setTopMovies] = useState([]);
  const [bottomMovies, setBottomMovies] = useState([]);

  useEffect(() => {
    // slicing and grouping the similar movies by two
    setTopMovies(similars?.slice(0, 2));
    setBottomMovies(similars?.slice(2, 4));
  }, [similars]);

  // JSX ////////////////////////////////////
  return (
    <div className='md_right pt-3 col-12 col-xxl-5'>
      {/* the title */}
      <h2 className='md_title me-4 pb-4'>Similar movies</h2>

      {/* two top similars */}
      <div className='md_right_movies d-flex align-items-center justify-content-around mb-4'>
        {topMovies?.map((movie) => {
          return (
            <Link
              to={`/movie-detail/${movie.id}`}
              className='md_right_movie col-4 position-relative'
              key={movie.title}
              onClick={() => getMovieId(movie.id)}
            >
              <div className='md_right_backdrop position-absolute w-100 h-100'></div>
              <div className='md_right_img'>
                <img className='w-100 h-100' src={`${baseImgURL}/${movie.poster_path}`} alt='movie poster' />
              </div>
              <h6 className='position-absolute bottom-0 start-0 text-white px-2'>{movie.title}</h6>
            </Link>
          );
        })}
      </div>

      {/* two bottom similars */}
      <div className='md_right_movies d-flex align-items-center justify-content-around'>
        {bottomMovies?.map((movie) => {
          return (
            <Link
              to={`/movie-detail/${movie.id}`}
              className='md_right_movie col-4 position-relative'
              key={movie.title}
              onClick={() => getMovieId(movie.id)}
            >
              <div className='md_right_backdrop position-absolute w-100 h-100'></div>
              <div className='md_right_img'>
                <img className='w-100 h-100' src={`${baseImgURL}/${movie.poster_path}`} alt='movie poster' />
              </div>
              <h6 className='position-absolute bottom-0 start-0 text-white px-2'>{movie.title}</h6>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MdRight;
