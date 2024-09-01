"use client";

import { auth, signIn } from "@/auth";
import "./signInButton.scss";
import { handleSignIn } from "./actionSignIn";
import { AuthIcon } from "@/public/svg/svg";

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
          <AuthIcon/>
          Log in
        </button>
      </form>
    </>
  );
};