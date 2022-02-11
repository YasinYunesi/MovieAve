import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";

const Footer = () => {
  // LOGIC /////////////////////////
  const [toTop, setToTop] = useState(false);
  const [unmounted, setUnmounted] = useState(false);

  useEffect(() => {
    // to top btn
    window.addEventListener("scroll", () => {
      setUnmounted(false);

      if (!unmounted && window.scrollY > 1000) {
        setToTop(true);
      } else if (!unmounted && window.scrollY < 1000) {
        setToTop(false);
      }
    });

    return () => {
      setUnmounted(true);
    };
  }, []);

  // JSX /////////////////////////
  return (
    <footer className='costum_footer pt-3 pb-1 col-12 mt-5'>
      {/* the lists */}
      <div className='d-md-flex justify-content-md-around'>
        <ul className='list-group col-12 col-md-2 mb-4 mb-md-0 ps-3 ps-md-0'>
          <h2>Genres</h2>
          <li className='list-group-item bg-transparent border-0 py-1'>
            <Link to='/trending'>Trending now</Link>
          </li>
          <li className='list-group-item bg-transparent border-0 py-1'>
            <Link to='/action'>Action</Link>
          </li>
          <li className='list-group-item bg-transparent border-0 py-1'>
            <Link to='/romance'>Romance</Link>
          </li>
          <li className='list-group-item bg-transparent border-0 py-1'>
            <Link to='/comedy'>Comedy</Link>
          </li>
          <li className='list-group-item bg-transparent border-0 py-1'>
            <Link to='/horror'>Horror</Link>
          </li>
          <li className='list-group-item bg-transparent border-0 py-1'>
            <Link to='/sci-fi'>Sci-fi</Link>
          </li>
          <li className='list-group-item bg-transparent border-0 py-1'>
            <Link to='/animation'>Animation</Link>
          </li>
        </ul>
        <ul className='list-group col-12 col-md-2 mb-4 mb-md-0 ps-3 ps-md-0'>
          <h2>Used tech</h2>
          <li className='list-group-item bg-transparent border-0 py-1'>
            <a href='https://reactjs.org/' target='_blank' rel='noreferrer' title='React js official website'>
              React JS
            </a>
          </li>
          <li className='list-group-item bg-transparent border-0 py-1'>
            <a href='https://reactrouter.com/' target='_blank' rel='noreferrer' title='Redux official website'>
              React router
            </a>
          </li>
          <li className='list-group-item bg-transparent border-0 py-1'>
            <a href='https://getbootstrap.com/' target='_blank' rel='noreferrer' title='Bootstrap official website'>
              Bootstrap 5
            </a>
          </li>
          <li className='list-group-item bg-transparent border-0 py-1'>HTML / Css</li>
          <li className='list-group-item bg-transparent border-0 py-1'>Sass</li>
        </ul>
        <ul className='list-group col-12 col-md-2 mb-4 mb-md-0 ps-3 ps-md-0'>
          <h2>Database and Api</h2>
          <li className='list-group-item bg-transparent border-0 py-1'>
            <a href='https://www.themoviedb.org/' target='_blank' rel='noreferrer' title='TMDB official website'>
              TMDB
            </a>
          </li>
          <li className='list-group-item bg-transparent border-0 py-1'>
            <a href='https://firebase.google.com/' target='_blank' rel='noreferrer' title='Google firebase official website'>
              Firebase DB
            </a>
          </li>
          <li className='list-group-item bg-transparent border-0 py-1'>
            <a href='https://firebase.google.com/' target='_blank' rel='noreferrer' title='Google firebase official website'>
              Firebase authentication
            </a>
          </li>
        </ul>
      </div>

      {/* the developer */}
      <h6 className='footer_dev text-center mb-5'>
        <span className='d-block mb-1'>Designed and Developed by</span>
        <a href='https://findyasinyunesi.vercel.app/' target='_blank' rel='noreferrer' title='My portfolio'>
          Yasin Yunesi
        </a>
      </h6>

      {/* back to top btn */}
      <button
        className={`sp_to_top btn shadow-none border-0 position-fixed bottom-0 start-50 d-flex align-items-center px-3 py-2 ${
          toTop ? "active" : ""
        }`}
        onClick={() => window.scrollTo(0, 0)}
      >
        <i className='fa fa-chevron-up'></i>
      </button>
    </footer>
  );
};

export default Footer;
