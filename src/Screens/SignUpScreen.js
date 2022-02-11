import { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../firebase";
import Notiflix from "notiflix";
import logo from "../Assets/Left-logo-one-line/logo_small.png";
import Loading from "../Components/Loading/Loading";
import "./SignUpScreen.scss";

const SignUpScreen = (props) => {
  // LOGIC ////////////////////////////
  const [terms, setTerms] = useState(false);
  const [email, setEmail] = useState(props.userEmail);
  const [passType, setPassType] = useState("password");
  const [eye, setEye] = useState(true);
  const [loading, setLoading] = useState(null);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const history = useHistory();

  // toggle password visibility
  function passVisibility() {
    setEye(!eye);

    if (passwordRef.current.type === "password") {
      setPassType("text");
    } else {
      setPassType("password");
    }
  }

  // Sign up from firebase
  function signUp(e) {
    e.preventDefault();
    setLoading(true);

    auth
      .createUserWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
      .then(() => {
        history.push("/");
        setLoading(false);
        Notiflix.Notify.success("User successfully created.");
        Notiflix.Notify.warning("Make sure you are connected to VPN or the website won't work properly.");
      })
      .catch((error) => {
        setLoading(false);
        Notiflix.Notify.failure(error.message);
      });

    // accessing the user email and sending it to app.js (for profile screen)
    props.signUpEmail(email);
  }

  // JSX ////////////////////////////
  return (
    <div className='signup_screen'>
      {/* the navbar */}
      <nav className='costum_navbar navbar navbar-expand-lg w-100 text-white'>
        <div className='container-fluid ps-2 ps-md-5 pe-4'>
          {/* the logo */}
          <a className='navbar-brand col-6 col-md-2' href='/'>
            <img className='navbar_logo img-fluid display-3' src={logo} alt='logo' />
          </a>
        </div>
      </nav>
      {/* Terms OR sign up form */}
      {!terms ? (
        <div className='col-10 col-md-9 col-lg-8 mt-5 mx-auto pb-5'>
          <h1 className='signup_terms_title mb-0 text-center py-2'>Terms of use</h1>
          {/* terms start */}
          <ul className='signup_terms list-group px-md-5 pt-5 pb-4 mx-auto mb-3'>
            <li className='signup_term list-group-item bg-transparent mb-3 border-0'>
              <h3 className='mb-3'>Conditions of use</h3>
              <p className='col-11 mx-auto'>
                By using this website, you certify that you have read and reviewed this Agreement and that you agree to comply
                with its terms. If you do not want to be bound by the terms of this Agreement, you are adviced to leave the
                website accordingly. MovieAve grants use and access of this website, its products, and its services to those who
                have accepted its terms.
              </p>
            </li>
            <li className='signup_term list-group-item bg-transparent mb-3 border-0'>
              <h3 className='mb-3'>Privacy policy</h3>
              <p className='col-11 mx-auto'>
                Before you continue using our website, we advise you to read our privacy policy regarding our user data
                collection. It will help you better understand our practices
              </p>
            </li>
            <li className='signup_term list-group-item bg-transparent mb-3 border-0'>
              <h3 className='mb-3'>Intellectual property</h3>
              <p className='col-11 mx-auto'>
                You agree that all materials, products, and services provided on this website are the property of MovieAve, its
                affiliates, directors, officers, employees, agents, suppliers, or licensors including all copyrights, trade
                secrets, trademarks, patents, and other intellectual property. You also agree that you will not reproduce or
                redistribute the MovieAve’s intellectual property in any way, including electronic, digital, or new trademark
                registrations. You grant MovieAve a royalty-free and non-exclusive license to display, use, copy, transmit, and
                broadcast the content you upload and publish. For issues regarding intellectual property claims, you should
                contact the company in order to come to an agreement.
              </p>
            </li>
            <li className='signup_term list-group-item bg-transparent mb-3 border-0'>
              <h3 className='mb-3'>User accounts</h3>
              <p className='col-11 mx-auto'>
                As a user of this website, you may be asked to register with us and provide private information. You are
                responsible for ensuring the accuracy of this information, and you are responsible for maintaining the safety and
                security of your identifying information. You are also responsible for all activities that occur under your
                account or password. If you think there are any possible issues regarding the security of your account on the
                website, inform us immediately so we may address it accordingly. We reserve all rights to terminate accounts, edit
                or remove content and cancel orders in their sole discretion
              </p>
            </li>
            <li className='signup_term list-group-item bg-transparent mb-3 border-0'>
              <h3 className='mb-3'>Applicable law</h3>
              <p className='col-11 mx-auto'>
                By visiting this website, you agree that the laws of your city, without regard to principles of conflict laws,
                will govern these terms and conditions, or any dispute of any sort that might come between MovieAve and you, or
                its business partners and associates.
              </p>
            </li>
            <li className='signup_term list-group-item bg-transparent mb-3 border-0'>
              <h3 className='mb-3'>Disputes</h3>
              <p className='col-11 mx-auto'>
                Any dispute related in any way to your visit to this website or to products you purchase from us shall be
                arbitrated by state or federal court and you consent to exclusive jurisdiction and venue of such courts.
              </p>
            </li>
            <li className='signup_term list-group-item bg-transparent mb-3 border-0'>
              <h3 className='mb-3'>Indemnification</h3>
              <p className='col-11 mx-auto'>
                You agree to indemnify MovieAve and its affiliates and hold MovieAve harmless against legal claims and demands
                that may arise from your use or misuse of our services. We reserve the right to select our own legal counsel.
              </p>
            </li>
            <li className='signup_term list-group-item bg-transparent mb-3 border-0'>
              <h3 className='mb-3'>Limitation on liability</h3>
              <p className='col-11 mx-auto'>
                MovieAve is not liable for any damages that may occur to you as a result of your misuse of our website. MovieAve
                reserves the right to edit, modify, and change this Agreement any time. We shall let our users know of these
                changes through electronic mail. This Agreement is an understanding between MovieAve and the user, and this
                supersedes and replaces all prior agreements regarding the use of this website.
              </p>
            </li>
          </ul>
          {/* terms end */}
          <div className='d-lg-flex align-items-center'>
            <h5 className='signup_terms_note col-12 col-lg-6 py-2 px-3 rounded-3 mb-4 mb-lg-0'>
              Notice: By clicking "Next" you agree to our terms and conditions
            </h5>
            <button
              className='signup-term-btn btn shadow-none d-flex align-items-center ms-lg-auto px-4 py-3 justify-content-between'
              onClick={() => setTerms(true)}
            >
              Next <i className='fa fa-arrow-right ms-1'></i>
            </button>
          </div>
        </div>
      ) : (
        <div className='form_container d-flex justify-content-center align-items-center mt-5 py-5'>
          <form className='signup_form col-10 col-sm-8 col-md-5 col-lg-4 col-xl-4 col-xxl-3 pt-4 pb-5 px-3 px-lg-5 mt-5'>
            <h1 className='fw-bold mb-5'>Sign up</h1>
            <div className='form-group'>
              <input
                className='form-control rounded-0 shadow-none py-3'
                ref={emailRef}
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
            </div>
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
            <div className='form-check mt-4 mb-1'>
              <input type='checkbox' className='form-check-input shadow-none' disabled checked />
              <label className='form-check-label'>
                I Agree to the{" "}
                <Link to='/sign-up' onClick={() => setTerms(false)}>
                  terms and conditions
                </Link>
              </label>
            </div>
            <div className='col-10 mx-auto'>
              <Link to='' className='sign_up_btn btn w-100 shadow-none' title='Finish signing up' onClick={signUp}>
                {loading ? <Loading /> : "Sign up"}
              </Link>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SignUpScreen;
