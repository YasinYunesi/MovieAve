import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import notFound from "../Assets/Illustration/404.svg";
import "./NotFoundScreen.scss";

const NotFoundScreen = ({ getSearchQuery }) => {
  return (
    <div className='not_found'>
      {/* the navbar */}
      <Navbar position='position-absolute' getSearchQuery={getSearchQuery} />

      <div className='d-flex flex-column align-items-center justify-content-center h-100'>
        {/* the background img */}
        <img className='not_found_img col-8 position-fixed' src={notFound} alt='page not found!' />

        {/* the main content */}
        <div className='not_found_text text-center'>
          <h1 className='my-auto fw-bold'>Page not found !</h1>
          <p className='fs-5 col-9 mx-auto py-4'>
            The page you are looking for might have been removed, had its name changed or is temporarily unavailable.
          </p>
          <Link className='btn shadow-none border-0 px-5 py-3' to='/'>
            Go To HomePage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundScreen;
