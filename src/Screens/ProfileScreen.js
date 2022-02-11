import { useState } from "react";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import logo from "../Assets/Left-logo-one-line/logo_small_white.png";
import Notiflix from "notiflix";
import "./ProfileScreen.scss";

const ProfileScreen = ({ userEmail }) => {
  // LOGIC ////////////////////////////
  const [premium, setPremium] = useState(false);
  const [gold, setGold] = useState(false);
  const [silver, setSilver] = useState(false);

  function premiumFunc() {
    setPremium(true);
    setGold(false);
    setSilver(false);
  }
  function goldFunc() {
    setPremium(false);
    setGold(true);
    setSilver(false);
  }
  function silverFunc() {
    setPremium(false);
    setGold(false);
    setSilver(true);
  }

  // sign out func
  function signOut() {
    auth
      .signOut()
      .then(() => {
        Notiflix.Notify.success("Signed out successfully");
      })
      .catch((error) => {
        Notiflix.Notify.failure(error.message);
      });
  }

  // JSX ////////////////////////////
  return (
    <div className='profile_screen'>
      {/* the navbar */}
      <nav className='costum_navbar navbar navbar-expand-lg w-100 text-white'>
        <div className='container-fluid ps-2 ps-md-5 pe-4'>
          {/* the logo */}
          <Link className='navbar-brand col-6 col-md-2' to='/'>
            <img className='navbar_logo img-fluid display-3' src={logo} alt='logo' />
          </Link>
        </div>
      </nav>
      {/* the main content */}
      <div className='profile_screen_inner mx-auto pb-5 mt-5 col-11 col-md-9 col-lg-8 col-xl-7 col-xxl-6'>
        <h1 className='px-2 py-1'>Edit Profile</h1>
        {/* the content */}
        <div className='d-flex flex-column flex-lg-row align-items-center align-items-lg-start mt-3 px-1'>
          <img
            className='profile_avatar border-0 rounded-circle mb-3 mb-lg-0'
            src='https://www.pngitem.com/pimgs/m/78-786293_1240-x-1240-0-avatar-profile-icon-png.png'
            alt='profile'
          />
          <div className='w-100 ps-3'>
            <h6 className='profile_email px-4 py-3 w-100 mt-2'>{userEmail || "YourEmail@gmail.com"}</h6>
            <div className='profile_plans mt-2 text-white'>
              <h4 className='pb-2 pt-3'>
                Plans <span>(select your prefered plan)</span>
              </h4>
              <span className='profile_date'>Renewal date: 08/13/2021</span>
              <div className='profile_plan px-3 d-flex justify-content-between align-items-center py-4 mt-3'>
                <div>
                  <h5 className='mb-1'>Movie ave Premium</h5>
                  <span>4K+</span>
                </div>
                <button
                  className={`${premium ? "profile_current" : "profile_subscribe"} btn shadow-none border-0 text-white px-3`}
                  onClick={premiumFunc}
                >
                  {premium ? "Current plan" : "Subscribe"}
                </button>
              </div>
              <div className='profile_plan px-3 d-flex justify-content-between align-items-center py-4'>
                <div>
                  <h5 className='mb-1'>Movie ave Gold</h5>
                  <span>1080p</span>
                </div>
                <button
                  className={`${gold ? "profile_current" : "profile_subscribe"} btn shadow-none border-0 text-white px-3`}
                  onClick={goldFunc}
                >
                  {gold ? "Current plan" : "Subscribe"}
                </button>
              </div>
              <div className='profile_plan px-3 d-flex justify-content-between align-items-center py-4'>
                <div>
                  <h5 className='mb-1'>Movie ave Silver</h5>
                  <span>720p</span>
                </div>
                <button
                  className={`${silver ? "profile_current" : "profile_subscribe"} btn shadow-none border-0 text-white px-3`}
                  onClick={silverFunc}
                >
                  {silver ? "Current plan" : "Subscribe"}
                </button>
              </div>
              {/* the sign out btn */}
            </div>
            <Link to='/' className='w-100 btn shadow-none border-0 text-white mt-4 py-2' onClick={signOut}>
              Sign out
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
