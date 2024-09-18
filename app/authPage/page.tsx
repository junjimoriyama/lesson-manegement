// next
import { redirect } from 'next/navigation';
// component
import { SignInButton } from "./components/signInButton/SignInButton";
import { MainLogoLogin } from "@/public/svg/svg";
// function
import { auth } from "@/auth";
// style
import "./auth.scss";


const page = async () => {
  
  const session = await auth();

  if(session) {
    redirect('/')
  } 
  return (
    <div className="auth">
      <div className="authLogoWrap">
        
      <MainLogoLogin/>
      </div>
      <SignInButton />
      {/* <UserAvatar/> */}
    </div>
  );
};

export default page;
