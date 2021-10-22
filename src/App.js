import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { auth } from "./config/firebase/firebase";
import { login, logout, selectUser } from "./features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import "normalize.css";
import "./App.css";
import Homepage from "./pages/Homepage/Homepage";
import Loginpage from "./pages/Loginpage/Loginpage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import FriendsPage from "./pages/FriendsPage/FriendsPage";
import ListPage from "./pages/ListPage/ListPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import MoviePage from "./pages/MoviePage/MoviePage";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="app">
      <Router>
        {!user ? (
          <Loginpage />
        ) : (
          <Switch>
            <Route exact path="/">
              <Homepage />
            </Route>
            <Route path="/search">
              <SearchPage />
            </Route>
            <Route path="/profile">
              <ProfilePage />
            </Route>
            <Route path="/myList">
              <ListPage />
            </Route>
            <Route path="/friends">
              <FriendsPage />
            </Route>
            <Route path="/movie">
              <MoviePage />
            </Route>
          </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;
