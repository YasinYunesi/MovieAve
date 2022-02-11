import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "./firebase";
import HomeScreen from "./Screens/HomeScreen";
import LoginScreen from "./Screens/LoginScreen";
import SignUpScreen from "./Screens/SignUpScreen";
import MovieDetailScreen from "./Screens/MovieDetailScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import Trending from "./Screens/Navbar screens/Trending";
import Action from "./Screens/Navbar screens/Action";
import Drama from "./Screens/Navbar screens/Drama";
import Romance from "./Screens/Navbar screens/Romance";
import Comedy from "./Screens/Navbar screens/Comedy";
import Horror from "./Screens/Navbar screens/Horror";
import SciFi from "./Screens/Navbar screens/Sci-fi";
import Animation from "./Screens/Navbar screens/Animation";
import MyList from "./Screens/Navbar screens/MyList";
import WatchLater from "./Screens/Navbar screens/WatchLater";
import SearchScreen from "./Screens/SearchScreen";
import NotFoundScreen from "./Screens/NotFoundScreen";
import "./App.css";

function App() {
  // LOGIC ///////////////////////////////////
  const [user, setUser] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [movieId, setMovieId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // accessing the email in sign up form from loginScreen
  function signUpEmail(email) {
    setUserEmail(email);
  }

  useEffect(() => {
    // log in the user if signed up
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        // logged in
        setUser(true);
      } else {
        // logged in
        setUser(false);
      }
    });

    // the cleanup func
    return unsubscribe;
  }, []);

  // getting the movieId from all genres for movie detail
  function getMovieId(id) {
    setMovieId(id);
  }

  // getting the search query
  function getSearchQuery(query) {
    setSearchQuery(query);
  }

  // JSX ///////////////////////////////////
  return (
    <div className='App'>
      {!user ? (
        <Router>
          <Switch>
            <Route path='/' exact>
              <LoginScreen signUpEmail={signUpEmail} />
            </Route>
            <Route path='/sign-up'>
              <SignUpScreen userEmail={userEmail} signUpEmail={signUpEmail} />
            </Route>
          </Switch>
        </Router>
      ) : (
        <Router>
          <Switch>
            {/* home screen */}
            <Route path='/' exact>
              <HomeScreen getMovieId={getMovieId} getSearchQuery={getSearchQuery} />
            </Route>
            {/* sign up screen */}
            <Route path='/sign-up' exact>
              <SignUpScreen signUpEmail={signUpEmail} />
            </Route>
            {/* Profile screen */}
            <Route path='/profile' exact>
              <ProfileScreen userEmail={userEmail} />
            </Route>
            {/* Trending screen */}
            <Route path='/trending' exact>
              <Trending getMovieId={getMovieId} getSearchQuery={getSearchQuery} />
            </Route>
            {/* Action screen */}
            <Route path='/action' exact>
              <Action getMovieId={getMovieId} getSearchQuery={getSearchQuery} />
            </Route>
            {/* Romance screen */}
            <Route path='/romance' exact>
              <Romance getMovieId={getMovieId} getSearchQuery={getSearchQuery} />
            </Route>
            {/* comedy screen */}
            <Route path='/comedy' exact>
              <Comedy getMovieId={getMovieId} getSearchQuery={getSearchQuery} />
            </Route>
            {/* drama screen */}
            <Route path='/drama' exact>
              <Drama getMovieId={getMovieId} getSearchQuery={getSearchQuery} />
            </Route>
            {/* horror screen */}
            <Route path='/horror' exact>
              <Horror getMovieId={getMovieId} getSearchQuery={getSearchQuery} />
            </Route>
            {/* sci-fi screen */}
            <Route path='/sci-fi' exact>
              <SciFi getMovieId={getMovieId} getSearchQuery={getSearchQuery} />
            </Route>
            {/* animation screen */}
            <Route path='/animation' exact>
              <Animation getMovieId={getMovieId} getSearchQuery={getSearchQuery} />
            </Route>
            {/* my list screen */}
            <Route path='/my-list' exact>
              <MyList getMovieId={getMovieId} getSearchQuery={getSearchQuery} />
            </Route>
            {/* watch later screen */}
            <Route path='/watch-later' exact>
              <WatchLater getMovieId={getMovieId} getSearchQuery={getSearchQuery} />
            </Route>
            {/* movie detail screen */}
            <Route path='/movie-detail/:id' exact>
              <MovieDetailScreen movieId={movieId} getMovieId={getMovieId} getSearchQuery={getSearchQuery} />
            </Route>
            {/* Search screen */}
            <Route path='/search/:query' exact>
              <SearchScreen searchQuery={searchQuery} getMovieId={getMovieId} getSearchQuery={getSearchQuery} />
            </Route>
            {/* 404 page */}
            <Route path='*'>
              <NotFoundScreen getSearchQuery={getSearchQuery} />
            </Route>
          </Switch>
        </Router>
      )}
    </div>
  );
}

export default App;
