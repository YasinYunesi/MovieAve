import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Logo from "../../Assets/Left-logo-one-line/logo_white_large.png";
import "./SpMoviesNav.scss";

const SpMoviesNav = ({ sideHeightHandler, getSearchQuery }) => {
  // LOGIC ///////////////////////////////////////////
  const [sideHeight, setSideHeight] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  const history = useHistory();

  useEffect(() => {
    // removing the last two items from side bar in small heights
    // checking on page render
    if (window.innerHeight < 875) {
      setSideHeight(true);
    } else {
      setSideHeight(false);
    }
    if (window.innerWidth < 992) {
      setSideHeight(false);
    } else {
      setSideHeight(true);
    }
    // checking on page resize
    window.addEventListener("resize", () => {
      if (window.innerHeight < 875) {
        setSideHeight(true);
      } else {
        setSideHeight(false);
      }
      if (window.innerWidth < 992) {
        setSideHeight(false);
      } else {
        setSideHeight(true);
      }
    });

    // sending sideHeight to parent
    sideHeightHandler(sideHeight);
  }, [sideHeight, sideHeightHandler]);

  // search handler
  function searchHandler(e) {
    e.preventDefault();

    getSearchQuery(searchValue);
    history.push(`/search/${searchValue}`);
  }

  // JSX ///////////////////////////////////////////////
  return (
    <nav className='sp_movies_nav navbar navbar-expand d-flex py-0 position-fixed col-12'>
      {/* logo */}
      <Link className='navbar-brand col-4 col-md-3 col-xl-2 text-center mx-0' to='/'>
        <img className='nav_logo img-fluid col-9 col-md-7' src={Logo} alt='logo' />
      </Link>

      {/* search, profile and links */}
      <div
        className='sp_nav_main w-100 d-lg-flex justify-content-between ps-3 pe-3 pe-md-4 pe-lg-3 pe-xl-4 pe-xxl-5'
        id='navbarCollapse'
      >
        {/* links */}
        <div className='sp_nav_main_links d-none d-lg-flex'>
          <Link className='d-flex align-items-center justify-content-between rounded-0 border-0 ps-5 pe-4 fw-light' to='/my-list'>
            <span>My list</span>
            <i className='fa fa-heart ms-2'></i>
          </Link>
          <Link
            className='d-flex align-items-center justify-content-between rounded-0 border-0 ps-5 pe-4 fw-light'
            to='/watch-later'
          >
            <span>Watch later</span>
            <i className='fa fa-clock ms-2'></i>
          </Link>
        </div>

        {/* profile and search start */}
        <div
          className={`d-flex align-items-center py-2 ${sideHeight ? "justify-content-end" : "justify-content-between"} ${
            sideHeight ? "col-6" : "col-12"
          }`}
        >
          {" "}
          {/* search start */}
          <button
            className='sp_nav_search btn shadow-none border-0 rounded-0 mt-2'
            data-bs-toggle='modal'
            data-bs-target='#searchModal'
          >
            <i className='fa fa-search me-3'></i>
            <span className='d-none d-md-inline-block'>Search movies</span>
          </button>
          {/* modal start */}
          <div className='sp_search_modal modal fade' id='searchModal' tabIndex='-1' aria-hidden='true'>
            <div className='modal-dialog modal-dialog-centered'>
              <div className='modal-content d-flex align-items-center bg-transparent border-0'>
                <form className='d-flex' onSubmit={searchHandler}>
                  <input
                    className='form-control shadow-none border-0 rounded-0 py-3 px-3'
                    type='text'
                    placeholder='Movie name ...'
                    onChange={(e) => setSearchValue(e.target.value)}
                    value={searchValue}
                  />
                  <button className='btn d-flex col col-md-12 align-items-center justify-content-center' type='submit'>
                    <i className='fa fa-search text-white'></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
          {/* search end */}
          {/* profile start */}
          <Link to='/profile' className='sp_nav_profile text-end col-2 col-md-1'>
            <img
              className={`rounded-circle border-0 col-11 col-lg-12 col-xl-10 ${sideHeight ? "col-xxl-8" : "col-xxl-4"}`}
              src='https://www.pngitem.com/pimgs/m/78-786293_1240-x-1240-0-avatar-profile-icon-png.png'
              alt='profile'
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default SpMoviesNav;
