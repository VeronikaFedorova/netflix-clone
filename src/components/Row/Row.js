import React, { useState, useEffect } from "react";
import "./Row.css";
import { useHistory } from "react-router-dom";
import axios from "../../config/axios/axios";

const Row = ({ title, fetchUrl, value }) => {
  const [movies, setMovies] = useState([]);
  const history = useHistory();

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
      <div className="row__posters">
        {movies.map((movie) => (
          <div className="card__container" onClick={() => history.push(`/movie/${movie?.id ? movie?.id : movie?.show?.id}`)}>
            <img
            className="row__poster"
            key={movie?.id ? movie?.id : movie?.show?.id}
            src={movie?.image?.original ? movie?.image?.original : movie?.show?.image?.medium}
            alt={movie.name}
          />
            <div className="card__info">
              <h3 className="card__name">{movie?.name ? movie?.name : movie?.show?.name}</h3>
              <h4 className="card__date">{movie?.premiered ? movie?.premiered : movie?.show?.premiered}</h4>
              <a href={movie?.url ? movie?.url : movie?.show?.url} className="card__site">Watch here</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Row;
