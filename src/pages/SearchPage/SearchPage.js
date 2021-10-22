import React, { useState, useEffect } from "react";
import "./SearchPage.css";
import axios from "../../config/axios/axios";
import requests from "../../config/requests/requests";
import { useHistory } from "react-router-dom";

const SearchPage = () => {
  const [movies, setMovies] = useState([]);
  const [show, handleShow] = useState(false);
  const history = useHistory();
  const [value, setValue] = useState("");

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

  const filteredMovies = movies.filter((movie) => {
    return movie.name.toLowerCase().includes(value.toLowerCase());
  });

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchTrending);
      setMovies(request.data);
      console.log(request);
      return request;
    }
    fetchData();
  }, []);

  return (
    <div className="searchPage">
      <div className={`nav ${show && `nav__black`}`}>
        <div className="nav__contents">
          <img
            onClick={() => history.push("/")}
            className="nav__logo"
            src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
            alt="logo"
          />
          <input
            onChange={(event) => setValue(event.target.value)}
            className="search__input"
            placeholder="Search..."
            type="text"
          />
          <img
            onClick={() => history.push("/profile")}
            className="nav__avatar"
            src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"
            alt="user logo"
          />
        </div>
      </div>

      <div className="search__posters">
        {filteredMovies.map((movie) => (
          <img
            onClick={() => history.push("/movie")}
            className="search__poster"
            key={movie.id}
            src={
              movie?.image?.original
                ? movie?.image?.original
                : movie?.show?.image?.medium
            }
            alt={movie.name}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
