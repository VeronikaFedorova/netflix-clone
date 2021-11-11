import React from 'react';
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./ListPage.css";
import Nav from "../../components/Nav/Nav";

const ListPage = () => {
    const user = useSelector((state) => state.user.user);
    const history = useHistory();
    const movies = user?.movie;
    const showMovies = (movies) => {
        let shows = [];
        for(let el in movies) {
            shows.push(movies[el].movie);
        }
        console.log(shows);
        return shows;
    };


    return (
        <div className="listPage">
            <Nav />
            <h2>My list</h2>
            <div className="liked">
                {showMovies(movies).map(movie => (
                     <img
                     onClick={() => history.push("/movie/" + movie.id)}
                     className="list__poster"
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
}
 
export default ListPage;