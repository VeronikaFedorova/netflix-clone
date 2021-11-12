import React, { useState, useEffect } from "react";
import "./MoviePage.css";
import axios from "../../config/axios/axios";
import Nav from "../../components/Nav/Nav";
import { useDispatch } from "react-redux";
import requests from "../../config/requests/requests";
import { liked, removeMovie } from "../../features/userSlice";

const MoviePage = () => {
  const url = window.location.href;
  const ID = url.substr(url.lastIndexOf("/") + 1);
  const [movies, setMovies] = useState([]);
  const dispatch = useDispatch();
  const add = document.querySelector(".add");
  const move = document.querySelector(".move");

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

  function handleAdd(event){
    event.preventDefault();
    if(add){
        add.setAttribute("hidden", "hidden");
        move.removeAttribute("hidden", "hidden");
    } 
  }

  function handleRemove(event){
    event.preventDefault();
    if(move){
        move.setAttribute("hidden", "hidden");
        add.removeAttribute("hidden", "hidden")
    }
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
          <button className="movie__button">
            <a href={exactMovie[0][0]?.url}>
              Play
            </a>
          </button>
          <button
            onMouseDown={() => {
              dispatch(
                liked({
                  movie: exactMovie[0][0]
                })
              )
            }}
            onClick={handleAdd} 
            className="movie__button add">My list</button>
            <button
              hidden
              onMouseDown={() => {
                dispatch(
                  removeMovie({
                    moie: exactMovie[0][0],
                  })
                );
              }}
              onClick={handleRemove}
              className="movie__button move"
            >
              Remove
            </button>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
