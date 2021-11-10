import React, { useState, useEffect } from "react";
import "./MoviePage.css";
import axios from "../../config/axios/axios";
import Nav from "../../components/Nav/Nav";
import requests from "../../config/requests/requests";

const MoviePage = () => {
  const url = window.location.href;
  const ID = url.substr(url.lastIndexOf("/") + 1);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchTrending);
      setMovies(request.data);
      return request;
    }
    fetchData();
  }, []);


  

  const exactMovie = [movies.filter((movie) => movie?.id.toString() === ID)];
    

  let description = exactMovie[0][0]?.summary;
  if (description) {
    description = description.replace(/<\/?[a-zA-Z]+>/gi, "");
  }

  function truncate(description, n) {
    return description?.length > n ? description.substr(0, n - 1) + "..." : description;
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
          <div className="movie__summary">{truncate(description, 500)}</div>
          <button className="banner__button">My list</button>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
