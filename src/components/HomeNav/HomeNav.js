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
        <h3 onClick={() => history.push("/")}>Magirz</h3>
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
          src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"
          alt="user logo"
        />
      </div>
    </div>
  );
};

export default HomeNav;
