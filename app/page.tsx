// 'use client'
// これがあるとアバターが表示できない

import styles from "./page.module.css";
import { Calendar } from "./components/calendar/Calendar";
import { Price } from "./components/calendar/price/Price";
import { Memo } from "./components/Memo";
import { SignOutButton } from "./authPage/components/signOutButton/SignOutButton";
import { UserAvatar } from "./authPage/components/UserAvatar";

import './home.scss'


export default function Home() {




  return (
    <div className={styles.homeBackground}>
    <div className="head">
    <UserAvatar/>
    <SignOutButton/>
    </div>
    {/* <Memo/> */}
    <Calendar/>
    {/* <Price/> */}
    </div>
  );
}
