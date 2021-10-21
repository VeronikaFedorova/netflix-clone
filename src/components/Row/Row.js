import React, { useState, useEffect } from "react";
import "./Row.css";
import axios from "../../config/axios/axios";

const Row = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data);
      console.log(request);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            className="row__poster"
            key={movie.id}
            src={movie?.image?.original ? movie?.image?.original : movie?.show?.image?.medium}
            alt={movie.name}
          />
        ))}
      </div>
    </div>
  );
};

export default Row;
