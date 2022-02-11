import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import Footer from "../Components/Footer/Footer";
import Notiflix from "notiflix";
import logo from "../Assets/Left-logo-one-line/logo_small_white.png";
import Loading from "../Components/Loading/Loading";
import "../Components/Navbar/Navbar.scss";
import "./LoginScreen.scss";

const LoginScreen = (props) => {
  // LOGIC /////////////////////////////
  const [user, setUser] = useState(false);
  const [passType, setPassType] = useState("password");
  const [eye, setEye] = useState(true);
  const [loading, setLoading] = useState(null);

  const inpRef = useRef("");
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  // getting the value of the sign up email input on submit
  function signUpSubmitHandler() {
    props.signUpEmail(inpRef.current.value);
  }

  // toggle password visibility
  function passVisibility() {
    setEye(!eye);

    if (passwordRef.current.type === "password") {
      setPassType("text");
    } else {
      setPassType("password");
    }
  }

  // Sign in from firebase
  function signIn(e) {
    e.preventDefault();
    setLoading(true);

    auth
      .signInWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
      .then(() => {
        setLoading(false);
        Notiflix.Notify.success("Logged in successfully.");
        Notiflix.Notify.warning("Make sure you are connected to VPN or the website won't work properly.");
      })
      .catch((error) => {
        setLoading(false);
        Notiflix.Notify.failure(error.message);
      });
  }

  // JSX /////////////////////////////
  return (
    <div className='login_screen d-flex flex-column align-items-center'>
      {/* the navbar */}
      <nav className={`costum_navbar navbar navbar-expand-lg w-100 text-white`}>
        <div className='container-fluid ps-2 ps-md-5 pe-4'>
          {/* the logo */}
          <a className='navbar-brand col-6 col-md-2' href='/'>
            <img className='navbar_logo img-fluid display-3' src={logo} alt='logo' />
          </a>
          {/* the sign in btn */}
          <button
            className='signIn_nav_btn btn px-2 py-1 px-md-4 py-md-2 shadow-none'
            onClick={!user ? () => setUser(true) : () => setUser(false)}
          >
            {!user ? "Login" : "Sign up"}
          </button>
        </div>
      </nav>
      {/* the sign up form OR log in form */}
      {!user ? (
        <div className='form_container w-100 d-flex justify-content-center align-items-center'>
          <form className='signup_form col-10 col-md-7 col-lg-5 col-xl-4 d-flex justify-content-center mb-5'>
            <input
              className='form-control col py-2 py-md-3 rounded-0'
              type='email'
              placeholder='Your email address (optional)'
              ref={inpRef}
            />
            <Link
              to='/sign-up'
              className='col-4 col-md-3 py-2 py-md-3 btn d-flex justify-content-center align-items-center'
              title='Sign up now!'
              onClick={signUpSubmitHandler}
            >
              Sign Up
            </Link>
          </form>
        </div>
      ) : (
        user && (
          <div className='form_container w-100 d-flex justify-content-center align-items-center'>
            <form className='signIn_form col-10 col-sm-6 col-md-5 col-xl-4 col-xxl-3 px-4 px-md-5 d-flex flex-column align-items-center my-auto'>
              <h1 className='fw-bold me-auto mb-5'>Login</h1>
              <input
                ref={emailRef}
                className='form-control rounded-0 shadow-none py-3'
                type='email'
                placeholder='Email'
                required
              />
              <div className='input-group'>
                <input
                  className='form-control rounded-0 shadow-none py-3'
                  ref={passwordRef}
                  type={passType}
                  placeholder='Password'
                  required
                />
                <button className='pass_btn btn shadow-none h-100 py-3' type='button' onClick={passVisibility}>
                  {eye ? <i className='fa fa-eye'></i> : <i className='fa fa-eye-slash'></i>}
                </button>
              </div>
              <button className='login_btn btn w-100 rounded-0 shadow-none' type='submit' title='Sign in' onClick={signIn}>
                {loading ? <Loading /> : "Log in"}
              </button>
            </form>
          </div>
        )
      )}
      {/* footer */}
      <Footer />
    </div>
  );
};

export default LoginScreen;
