import React, { useState, useEffect } from "react";
import "./Banner.css";
import axios from "../../config/axios/axios";
import requests from "../../config/requests/requests";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, liked } from "../../features/userSlice";

const Banner = () => {
  const [movie, setMovie] = useState([]);
  const [listed, setListed] = useState([]);

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const likedMovie = (listed) => {
      if(listed) {
        dispatch(
          liked({
            movie: movie,
          })
        );
        console.log("OK");
      }
    }
    return likedMovie;
  }, [dispatch, movie]);

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
          <button className="banner__button">Play</button>
          <button onClick={() => setListed(movie)} className="banner__button">My list</button>
        </div>
        <h1 className="banner__description">{truncate(description, 200)}</h1>
      </div>
      <div className="banner__fadeBottom" />
    </header>
  );
};

export default Banner;
