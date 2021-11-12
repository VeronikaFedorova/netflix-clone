import React, { useState, useEffect } from "react";
import "./Banner.css";
import axios from "../../config/axios/axios";
import requests from "../../config/requests/requests";
import { useDispatch } from "react-redux";
import {  liked, removeMovie } from "../../features/userSlice";

const Banner = () => {
  const [movie, setMovie] = useState([]);
  const dispatch = useDispatch();
  const add = document.querySelector(".add");
  const move = document.querySelector(".move");


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
            onMouseDown={() => {
              dispatch(
                liked({
                  movie: movie,
                })
              )
            }}
            onClick={handleAdd}
            className="banner__button add">My list</button>
            <button
              hidden
              onMouseDown={() => {
                dispatch(
                  removeMovie({
                    moie: movie,
                  })
                );
              }}
              onClick={handleRemove}
              className="banner__button move"
            >
              Remove
            </button>
        </div>
        <h1 className="banner__description">{truncate(description, 200)}</h1>
      </div>
      <div className="banner__fadeBottom" />
    </header>
  );
};

export default Banner;
