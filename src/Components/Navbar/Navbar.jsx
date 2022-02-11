import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "../../Assets/Left-logo-one-line/logo_small_white.png";
import "./Navbar.scss";

const Navbar = ({ position, getSearchQuery }) => {
  // LOGIC //////////////////////////////////////
  const [collapse, setCollapse] = useState(true);
  const [navBg, setNavBg] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const history = useHistory();

  function searchHandler(e) {
    e.preventDefault();

    getSearchQuery && getSearchQuery(searchValue);
    history.push(`/search/${searchValue}`);
  }

  // JSX //////////////////////////////////////
  return (
    <nav className={`costum_navbar ${navBg && "nav_bg"} navbar navbar-expand-lg w-100 text-white ${position}`}>
      <div className='container-fluid ps-4 ps-xl-5'>
        {/* logo */}
        <Link className='navbar-brand' to='/'>
          <img className='navbar_logo img-fluid display-3' src={logo} alt='logo' />
        </Link>
        {/* Collapse btn */}
        <button
          className='navbar_toggler shadow-none navbar-toggler text-white'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarCollapse'
          aria-expanded='false'
          aria-controls='navbarSupportedContent'
          aria-label='Toggle navigation'
          onClick={() => {
            setCollapse(!collapse);
            setNavBg(!navBg);
          }}
        >
          {collapse && <i className='fa fa-bars navbar_collapse_bars'></i>}
          {!collapse && <i className='fas fa-times navbar_collapse_times'></i>}
        </button>
        {/* profile and lists (collapse) */}
        <div className='collapse navbar-collapse d-lg-flex justify-content-between mt-2 ps-4' id='navbarCollapse'>
          {/* lists start */}
          <ul className='navbar-nav d-flex ms-lg-4'>
            <li className='nav_item nav-item d-flex align-items-center p-2'>
              <Link className='nav-link' to='/'>
                Home
              </Link>
            </li>
            <li className='nav_item nav-item d-flex align-items-center p-2'>
              <Link className='nav-link' to='/trending'>
                Trending
              </Link>
            </li>
            <li className='nav_item nav-item dropdown p-2'>
              <a
                className='nav-link dropdown-toggle'
                data-toggle='dropdown'
                href='/'
                role='button'
                aria-haspopup='true'
                aria-expanded='false'
              >
                Genres
              </a>
              <div className='dropdown-menu'>
                <Link className='dropdown-item fw-bold' to='/action'>
                  Action
                </Link>
                <Link className='dropdown-item fw-bold' to='/romance'>
                  Romance
                </Link>
                <Link className='dropdown-item fw-bold' to='/comedy'>
                  Comedy
                </Link>
                <Link className='dropdown-item fw-bold' to='/drama'>
                  Drama
                </Link>
                <Link className='dropdown-item fw-bold' to='/horror'>
                  Horror
                </Link>
                <Link className='dropdown-item fw-bold' to='/sci-fi'>
                  Sci-fi
                </Link>
                <Link className='dropdown-item fw-bold' to='/animation'>
                  Animation
                </Link>
              </div>
            </li>
            <li className='nav_item nav-item d-flex align-items-center p-2'>
              <Link className='nav-link' to='/my-list'>
                My List
              </Link>
            </li>
            <li className='nav_item nav-item d-flex align-items-center p-2'>
              <Link className='nav-link' to='/watch-later'>
                Watch Later
              </Link>
            </li>
          </ul>

          {/* profile and search icon start */}
          <div className='d-flex justify-content-between justify-content-lg-start'>
            {/* search start */}
            <div className='nav-item d-flex align-items-center pe-3'>
              <button className='navbar_search shadow-none btn' data-bs-toggle='modal' data-bs-target='#searchModal'>
                <i className='fa fa-search'></i>
              </button>
              {/* modal start */}
              <div className='search_modal modal fade' id='searchModal' tabIndex='-1' aria-hidden='true'>
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
              {/* modal end */}
            </div>
            {/* profile start */}
            <Link to='/profile' className='navbar_profile btn shadow-none border-0 me-4 ms-lg-3 d-flex align-items-center'>
              <img
                className='profile_avatar rounded-circle border-0'
                src='https://www.pngitem.com/pimgs/m/78-786293_1240-x-1240-0-avatar-profile-icon-png.png'
                alt='profile'
              />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
