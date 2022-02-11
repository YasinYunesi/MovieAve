import { useEffect, useState } from "react";
import firebase from "firebase/app";
import SpMovies from "./SpMoviesList";

const MyList = ({ getMovieId, getSearchQuery, movieKey }) => {
  // LOGIC ///////////////////////////////
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetching movies from api
  useEffect(() => {
    setLoading(true);
    const watchLaterRef = firebase.database().ref("MyList");
    watchLaterRef.on("value", (snapshot) => {
      const movies = snapshot.val();
      const moviesList = [];

      for (let id in movies) {
        moviesList.push({ id, ...movies[id] });
      }

      setMovies(moviesList);
      setLoading(false);
    });
  }, []);

  // JSX ///////////////////////////////
  return (
    <div className='my_list'>
      <SpMovies
        movies={movies}
        data='myList'
        title='My list'
        removeList
        getMovieId={getMovieId}
        getSearchQuery={getSearchQuery}
        movieKey={movieKey}
        loading={loading}
      />
    </div>
  );
};

export default MyList;
