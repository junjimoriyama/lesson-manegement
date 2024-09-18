"use client";

// function
import { handleSignIn } from "./actionSignIn";
// style
import "./signInButton.scss";

export const SignInButton = () => {

  return (
    <>
      <form 
      className="signInForm" 
      action={handleSignIn}
      >
        <button 
        className="signInButton" 
        type="submit">
          {/* <AuthIcon/> */}
          <p className="logInText">LOGIN</p>
          
        </button>
      </form>
    </>
  );
};