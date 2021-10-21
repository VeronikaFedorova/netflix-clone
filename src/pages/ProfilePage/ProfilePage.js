import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { auth } from "../../config/firebase/firebase";
import { useHistory } from "react-router-dom";
import Nav from "../../components/Nav/Nav";
import "./ProfilePage.css";

const ProfilePage = () => {
  const user = useSelector(selectUser);
  const history = useHistory();

  return (
    <div className="profilePage">
      <Nav />
      <div className="profilePage__body">
        <h1>Edit Profile</h1>
        <div className="profilePage__info">
          <img
            src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"
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
                onClick={() => history.push("/friends")}
                className="profilePage__friends profilePage__button">
                Friends
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
