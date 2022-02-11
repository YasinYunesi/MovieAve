import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// eslint-disable-next-line no-unused-vars
import bootstrap from "bootstrap/dist/css/bootstrap.min.css";
// eslint-disable-next-line no-unused-vars
import $ from "jquery";
// eslint-disable-next-line no-unused-vars
import Popper from "popper.js";
import "bootstrap/dist/js/bootstrap.bundle.min";
// React slick styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
