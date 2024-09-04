import "./auth.scss";
import { auth } from "@/auth";
import { SignInButton } from "./components/signInButton/SignInButton";
import { redirect } from 'next/navigation';
import { UserAvatar } from "./components/UserAvatar";

import './auth.scss'

const page = async () => {
  
  const session = await auth();

  if(session) {
    console.log('User is authenticated, redirecting...');
    redirect('/')
  } 
  return (
    <div className="auth">
      <SignInButton />
      <UserAvatar/>
      {/* <CantSignIn /> */}
      {/* <p>{session.user?.name}</p>
      <p>{session.user?.email}</p> */}
      {/* <SignOutButton/> */}
    </div>
  );
};

export default page;
