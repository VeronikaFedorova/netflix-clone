import React, { useState } from "react";
import "./Loginpage.css";
import SignUpPage from "../SignUpPage/SignUpPage";

const Loginpage = () => {
  const [signIn, setSignIn] = useState(false);
  return (
    <div className="loginPage">
      <div className="loginPage__background">
        <img
          className="loginPage__logo"
          src="logo.png"
          alt=""
        />
        <button className="loginPage__btn" onClick={() => setSignIn(true)}>
          Sign in
        </button>
        <div className="loginPage__gradient" />
      </div>
      <div className="loginPage__body">
        {signIn ? (
          <SignUpPage />
        ) : (
          <>
            <h1>Unlimited films, TV programmes and more.</h1>
            <h2>Watch anywhere. Cancel at any time.</h2>
            <h3>
              Ready to watch? Enter your email to create or restart your
              membership.
            </h3>

            <div className="loginPage__input">
              <form>
                <input type="email" placeholder="Email Address" />
                <button
                  className="loginPage__getStarted"
                  onClick={() => setSignIn(true)}
                >
                  GET STARTED
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Loginpage;
