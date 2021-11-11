import React from 'react';
import "./MyFriendsPage.css";
import Nav from "../../components/Nav/Nav";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const MyFriendsPage = () => {
    const user = useSelector((state) => state.user.user);
    const history = useHistory();
    const noAvatar =
    "https://upload.wikimedia.org/wikipedia/commons/9/9a/No_avatar.png";
    const friends = user?.person;
    const showFriends = (friends) => {
        let people = [];
        for(let el in friends) {
            people.push(friends[el].person);
        }
        console.log(people);
        return people;
    };

    return (
        <div className="myFriendsPage">
            <Nav />
            <h2 className="myFriendsPage__header">My friends</h2>
            <div className="followed">
                {showFriends(friends).map(person => (
                     <img
                     onClick={() => history.push("/person/" + person.id)}
                     className="followed__poster"
                     key={person.id}
                     src={
                       person?.image?.original
                         ? person?.image?.original
                         : noAvatar
                     }
                     alt={person.name}
                   />
                ))}
            </div>
        </div>
    );
}
 
export default MyFriendsPage;
