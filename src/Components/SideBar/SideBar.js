import { Link } from "react-router-dom";
import "./SideBar.scss";

const SideBar = ({ data, sideHeight }) => {
  return (
    <div className='sp_side_bar_container col-12 col-lg-3 col-xl-2'>
      <div className='sp_side_bar col-12 col-lg-3 col-xl-2 top-0 py-4'>
        <ul className='list-group pt-5'>
          <Link
            className='list-group-item d-flex align-items-center justify-content-between rounded-0 border-0 py-3 ps-5 pe-4 fw-light'
            to='/'
          >
            <span>Home</span>
            <i className='fa fa-home'></i>
          </Link>
          <Link
            className={`list-group-item d-flex align-items-center justify-content-between rounded-0 border-0 py-3 ps-5 pe-4 fw-light ${
              data === "trending" && "active"
            }`}
            to='/trending'
          >
            <span>Trending</span>
            {data === "trending" && <i className='fa fa-arrow-right'></i>}
          </Link>
        </ul>
        <hr />
        <ul className='list-group py-3'>
          <h2 className='ps-3 pb-2'>Genres</h2>
          <Link
            className={`list-group-item d-flex align-items-center justify-content-between rounded-0 border-0 py-3 ps-5 pe-4 fw-light ${
              data === "action" && "active"
            }`}
            to='/action'
          >
            <span>Action</span>
            {data === "action" && <i className='fa fa-arrow-right'></i>}
          </Link>
          <Link
            className={`list-group-item d-flex align-items-center justify-content-between rounded-0 border-0 py-3 ps-5 pe-4 fw-light ${
              data === "romance" && "active"
            }`}
            to='/romance'
          >
            <span>Romance</span>
            {data === "romance" && <i className='fa fa-arrow-right'></i>}
          </Link>
          <Link
            className={`list-group-item d-flex align-items-center justify-content-between rounded-0 border-0 py-3 ps-5 pe-4 fw-light ${
              data === "comedy" && "active"
            }`}
            to='/comedy'
          >
            <span>Comedy</span>
            {data === "comedy" && <i className='fa fa-arrow-right'></i>}
          </Link>
          <Link
            className={`list-group-item d-flex align-items-center justify-content-between rounded-0 border-0 py-3 ps-5 pe-4 fw-light ${
              data === "drama" && "active"
            }`}
            to='/drama'
          >
            <span>Drama</span>
            {data === "drama" && <i className='fa fa-arrow-right'></i>}
          </Link>
          <Link
            className={`list-group-item d-flex align-items-center justify-content-between rounded-0 border-0 py-3 ps-5 pe-4 fw-light ${
              data === "horror" && "active"
            }`}
            to='/horror'
          >
            <span>Horror</span>
            {data === "horror" && <i className='fa fa-arrow-right'></i>}
          </Link>
          <Link
            className={`list-group-item d-flex align-items-center justify-content-between rounded-0 border-0 py-3 ps-5 pe-4 fw-light ${
              data === "sci-fi" && "active"
            }`}
            to='/sci-fi'
          >
            <span>Science fiction</span>
            {data === "sci-fi" && <i className='fa fa-arrow-right'></i>}
          </Link>
          <Link
            className={`list-group-item d-flex align-items-center justify-content-between rounded-0 border-0 py-3 ps-5 pe-4 fw-light ${
              data === "animation" && "active"
            }`}
            to='/animation'
          >
            <span>Animation</span>
            {data === "animation" && <i className='fa fa-arrow-right'></i>}
          </Link>
        </ul>
        <hr className={`${sideHeight && "d-none"}`} />
        <ul className={`list-group pt-3 pb-5 ${sideHeight && "d-none"}`}>
          <Link
            className={`list-group-item d-flex align-items-center justify-content-between rounded-0 border-0 py-3 ps-5 pe-4 fw-light ${
              data === "myList" && "active"
            }`}
            to='/my-list'
          >
            <span>My list</span>
            <i className='fa fa-heart'></i>
          </Link>
          <Link
            className={`list-group-item d-flex align-items-center justify-content-between rounded-0 border-0 py-3 ps-5 pe-4 fw-light ${
              data === "watchLater" && "active"
            }`}
            to='/watch-later'
          >
            <span>Watch later</span>
            <i className='fa fa-clock'></i>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
