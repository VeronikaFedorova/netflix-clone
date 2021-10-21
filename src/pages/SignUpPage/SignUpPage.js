import React, { useRef } from "react";
import { auth } from '../../config/firebase/firebase'
import "./SignUpPage.css";

const SignUpPage = () => {

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const register = (e) => {
        e.preventDefault();

        auth.createUserWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        ).then((authUser) => {
            console.log(authUser);
        }).catch(err => {
            alert(err.message);
        });
    };

    const signIn = (e) => {
        e.preventDefault();

        auth.signInWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        ).then((authUser) => {
            console.log(authUser);
        }).catch(err => {
            alert(err.message);
        });
    };

  return (
    <div className="signUpPage">
      <form>
        <h1>Sign In</h1>
        <input type="email" ref={emailRef} placeholder="Email" />
        <input type="password" ref={passwordRef} placeholder="Password" />
        <button type="submit" onClick={signIn}>
            Sign in
        </button>
        <h4>
          <span className="signUpPage__gray">New to Netflix? </span>
          <span className="signUpPage__link" onClick={register}>
              Sign Up now.
          </span> 
        </h4>
      </form>
    </div>
  );
};

export default SignUpPage;
