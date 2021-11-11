import React, { useState, useEffect } from "react";
import "./PeoplePage.css";
import Nav from "../../components/Nav/Nav";
import { useHistory } from "react-router-dom";
import axios from "../../config/axios/axios";
import requests from "../../config/requests/requests";

const PeoplePage = () => {
  const history = useHistory();
  const [people, setPeople] = useState([]);
  const noAvatar =
    "https://upload.wikimedia.org/wikipedia/commons/9/9a/No_avatar.png";

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchPeople);
      setPeople(request.data);
      console.log(request);
      return request;
    }
    fetchData();
  }, []);

  return (
    <div className="peoplePage">
      <Nav />

      <div className="btn">
        <button
          className="people__button"
          onClick={() => history.push("/myFriends")}
        >
          My Friends
        </button>
      </div>
      <div className="people__posters">
        {people.map((people) => (
          <div className="people__container">
            <img
              onClick={() => history.push("/person/" + people.id)}
              className="search__poster"
              key={people.id}
              src={people?.image?.original ? people?.image?.original : noAvatar}
              alt={people.name}
            />
            <div className="people__info">
                <h3 className="people__name">
                    {people?.name}
                </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PeoplePage;
