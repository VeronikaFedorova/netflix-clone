import React from "react";
import { useSelector } from "react-redux";
// import { selectUser } from "../../features/userSlice";
import { auth } from "../../config/firebase/firebase";
import { useHistory } from "react-router-dom";
import Nav from "../../components/Nav/Nav";
import "./ProfilePage.css";

const ProfilePage = () => {
  const user = useSelector((state) => state.user.user);
  const history = useHistory();

  return (
    <div className="profilePage">
      <Nav />
      <div className="profilePage__body">
        <h1>Edit Profile</h1>
        <div className="profilePage__info">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/1/12/User_icon_2.svg"
            alt=""
          />
          <div className="profilePage__details">
            <h2>{user.email}</h2>
            <div className="profilePage__inners">
            <button 
                onClick={() => history.push("/myList")}
                className="profilePage__myList profilePage__button">
                My list
              </button>
              <button 
                onClick={() => history.push("/people")}
                className="profilePage__friends profilePage__button">
                People
              </button>
              <button 
                onClick={() => auth.signOut()}
                className="profilePage__signout profilePage__button">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
