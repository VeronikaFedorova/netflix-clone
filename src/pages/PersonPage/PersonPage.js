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
              onMouseDown={() => {
                dispatch(
                  followed({
                    person: exactPerson[0][0],
                  })
                );
              }}
              onClick={handleAdd}
              className="person__button add"
            >
              Add friend
            </button>
            <button
              hidden
              onMouseDown={() => {
                dispatch(
                  remove({
                    person: exactPerson[0][0],
                  })
                );
              }}
              onClick={handleRemove}
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
