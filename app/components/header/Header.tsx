
import "./header.scss";
// import { UserAvatar } from '../../authPage/components/UserAvatar'
import { SignOutButton } from "../../authPage/components/signOutButton/SignOutButton";
import { MainLogo } from "@/public/svg/svg";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { auth } from "@/auth";
import { UserAvatar } from "@/app/authPage/components/UserAvatar";
import Link from "next/link";

export const Header = async () => {

  return (
    <header>
      <Link href='/'>
      <MainLogo/>
      </Link>
      <div className="authAction">
        <UserAvatar/>
        <SignOutButton />
      </div>
    </header>
  );
};
