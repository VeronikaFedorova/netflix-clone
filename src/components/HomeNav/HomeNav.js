import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./HomeNav.css";

const HomeNav = ({updateData}) => {
  const [show, handleShow] = useState(false);
  const history = useHistory();


  const transitionNavbar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavbar);
    return () => window.removeEventListener("scroll", transitionNavbar);
  }, []);

  return (
    <div className={`nav ${show && `nav__black`}`}>
      <div className="nav__contents">
        <img
          onClick={() => history.push("/")}
          className="nav__logo"
          src="../public/logo.png"
          alt="logo"
        />
        <ul>
          <li>
            <i
              onClick={() => history.push("/search")} 
              className="fas fa-search"></i>
          </li>
        </ul>
        <img
          onClick={() => history.push("/profile")}
          className="nav__avatar"
          src="https://upload.wikimedia.org/wikipedia/commons/1/12/User_icon_2.svg"
          alt="user logo"
        />
      </div>
    </div>
  );
};

export default HomeNav;
