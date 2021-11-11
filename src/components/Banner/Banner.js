import React, { useState, useEffect } from "react";
import "./Banner.css";
import axios from "../../config/axios/axios";
import requests from "../../config/requests/requests";
import { useDispatch } from "react-redux";
import {  liked } from "../../features/userSlice";

const Banner = () => {
  const [movie, setMovie] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchTrending);
      setMovie(
        request.data[Math.floor(Math.random() * request.data.length - 1)]
      );
      return request;
    }
    fetchData();
  }, []);

  let description = movie?.summary;
  if (description) {
    description = description.replace(/<\/?[a-zA-Z]+>/gi, "");
  }

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url(${movie?.image?.original})`,
        backgroundSize: "90%",
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">{movie?.name}</h1>
        <div className="banner__buttons">
          <button className="banner__button">
            <a href={movie?.url}>
              Play
            </a>
          </button>
          <button 
            onClick={() => {
              dispatch(
                liked({
                  movie: movie,
                })
              )
            }}
            className="banner__button">My list</button>
        </div>
        <h1 className="banner__description">{truncate(description, 200)}</h1>
      </div>
      <div className="banner__fadeBottom" />
    </header>
  );
};

export default Banner;
