// next
import Link from "next/link";
// component
import { MainLogo } from "@/public/svg/svg";
import { SignOutButton } from "../../authPage/components/signOutButton/SignOutButton";
import { UserAvatar } from "@/app/authPage/components/UserAvatar";
// style
import "./header.scss";

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
