import React, { useState, useEffect } from "react";
import "./MoviePage.css";
import axios from "../../config/axios/axios";
import Nav from "../../components/Nav/Nav";
import requests from "../../config/requests/requests";

const MoviePage = () => {
  const url = window.location.href;
  const ID = url.substr(url.lastIndexOf("/") + 1);
  const [movies, setMovies] = useState([]);
  let allMovies = [];

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchTrending);
      setMovies(request.data);
      return request;
    }
    fetchData();
  }, []);

  console.log(allMovies);

  

  const exactMovie = [movies.filter((movie) => movie?.id.toString() === ID)];
    
  console.log(exactMovie);

  let description = exactMovie[0][0]?.summary;
  if (description) {
    description = description.replace(/<\/?[a-zA-Z]+>/gi, "");
  }

  return (
    <div className="moviePage">
      <Nav />
      <div className="movie__container">
        <div className="movie__img">
          <img src={exactMovie[0][0]?.image?.original} alt="" />
        </div>
        <div className="movie__info">
          <h1 className="movie__name">{exactMovie[0][0]?.name}</h1>
          <h2 className="movie__genres">
            {exactMovie[0][0]?.genres.join(" ")}
          </h2>
          <div className="movie__summary">{description}</div>
          <button className="banner__button">My list</button>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
