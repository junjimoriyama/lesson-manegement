"use client";

import { auth, signIn } from "@/auth";
import "./signInButton.scss";
import { handleSignIn } from "./actionSignIn";

export const SignInButton = () => {

  return (
    <>
      <form 
      className="signInForm" 
      action={handleSignIn}
      >
        <button 
        className="signInButton" 
        type="submit"
        // onClick={() => handleSignInClick()}
        >
          Go in!!
        </button>
      </form>
    </>
  );
};