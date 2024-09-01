// Client-side code
'use client'
import "./signOutButton.scss";

import { handleSignOut } from "./actionSignOut";

export const SignOutButton = () => {
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // デフォルトのフォーム送信を防ぐ
    await handleSignOut(); // サーバーサイドの関数を呼び出す
  };

  return (
    <form className="signOutForm" onSubmit={onSubmit}>
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
