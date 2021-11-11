import React, { useState, useEffect } from "react";
import "./PersonPage.css";
import axios from "../../config/axios/axios";
import Nav from "../../components/Nav/Nav";
import { useDispatch } from "react-redux";
import requests from "../../config/requests/requests";
import { followed, remove } from "../../features/userSlice";

const PersonPage = () => {
  const url = window.location.href;
  const ID = url.substr(url.lastIndexOf("/") + 1);
  const [people, setPeople] = useState([]);
  const dispatch = useDispatch();
  const add = document.querySelector(".add");
  const move = document.querySelector(".move");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchPeople);
      setPeople(request.data);
      return request;
    }
    fetchData();
  }, []);

  const exactPerson = [people.filter((person) => person?.id.toString() === ID)];

  function handleOnMousedown(event){
    event.preventDefault();
    if(add){
        add.setAttribute("hidden", "hidden");
        move.setAttribute("style", "visibility:visible");
    } 
  }

  function handleOnMouseOut(event){
    event.preventDefault();
    if(move){
        move.setAttribute("hidden", "hidden");
        add.setAttribute("style", "visibility:visible");
    }
  }
  

  console.log(exactPerson);
  return (
    <div className="personPage">
      <Nav />
      <div className="person__container">
        <div className="person__img">
          <img src={exactPerson[0][0]?.image?.original} alt="" />
        </div>
        <div className="person__info">
          <h1 className="person__name">Name: {exactPerson[0][0]?.name}</h1>
          <h2 className="person__birthday">
            Birthday: {exactPerson[0][0]?.birthday}
          </h2>
          <h2 className="person__country">
            Country: {exactPerson[0][0]?.country?.name}
          </h2>
          <h3 className="person__gender">{exactPerson[0][0]?.gender}</h3>
          <button className="person__button">
            <a href={exactPerson[0][0]?.url}>Look</a>
          </button>
            <button
              onClick={() => {
                dispatch(
                  followed({
                    person: exactPerson[0][0],
                  })
                );
              }}
              onKeyDown={handleOnMousedown}
              className="person__button add"
            >
              Add friend
            </button>
            <button
              onClick={() => {
                dispatch(
                  remove({
                    person: exactPerson[0][0],
                  })
                );
              }}
              onKeyDown={handleOnMouseOut}
              className="person__button move"
            >
              Remove
            </button>
        </div>
      </div>
    </div>
  );
};

export default PersonPage;
