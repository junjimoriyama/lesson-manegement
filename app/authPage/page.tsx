import "./auth.scss";
import { auth } from "@/auth";
import { SignInButton } from "./components/signInButton/SignInButton";
import { redirect } from 'next/navigation';
import { UserAvatar } from "./components/UserAvatar";

import './auth.scss'

const page = async () => {
  
  const session = await auth();

  if(session) {
    redirect('/')
  } 
  return (
    <div className="auth">
      <SignInButton />
      <UserAvatar/>
    </div>
  );
};

export default page;
