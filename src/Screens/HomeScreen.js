import Navbar from "../Components/Navbar/Navbar";
import Banner from "../Components/Banner/Banner";
import SciFi from "../Components/HomeScreenMovies/Sci_fi";
import Trending from "../Components/HomeScreenMovies/Trending";
import Action from "../Components/HomeScreenMovies/Action";
import Comedy from "../Components/HomeScreenMovies/Comedy";
import Horror from "../Components/HomeScreenMovies/Horror";
import Romance from "../Components/HomeScreenMovies/Romance";
import Drama from "../Components/HomeScreenMovies/Drama";
import Footer from "../Components/Footer/Footer";
import { fetchTrending } from "../Components/Api";
import "./HomeScreen.scss";

const HomeScreen = ({ getMovieId, getSearchQuery }) => {
  return (
    <div className='home_screen'>
      {/* the navbar */}
      <Navbar position='position-absolute' getSearchQuery={getSearchQuery} />

      {/* the banner */}
      <Banner fetchDataApi={fetchTrending} getMovieId={getMovieId} />

      {/* Movie lists start */}
      <Trending getMovieId={getMovieId} />
      <Romance getMovieId={getMovieId} />
      <Action getMovieId={getMovieId} />
      <Drama getMovieId={getMovieId} />
      <SciFi getMovieId={getMovieId} />
      <Horror getMovieId={getMovieId} />
      <Comedy getMovieId={getMovieId} />
      {/* Movie lists end */}

      {/* the footer */}
      <Footer />
    </div>
  );
};

export default HomeScreen;
