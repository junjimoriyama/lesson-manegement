'use client'
import "./signOutButton.scss";

import { handleSignOut } from "./actionSignOut";

export const SignOutButton = () => {
  return (
    <form className="signOutForm" action={ handleSignOut}>
      <button
      className="signOutButton" 
      type="submit">
        Go out
      </button>
    </form>
  );
};

// action={async() => {
//   'use server'
//   await signOut()
// }}>
//   <button
//   className='signOutButton'
//   type='sub
