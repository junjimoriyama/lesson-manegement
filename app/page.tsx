// 'use client'
// これがあるとアバターが表示できない

import styles from "./page.module.css";
import { Calendar } from "./components/calendar/Calendar";
import { Price } from "./header/price/Price";

import './home.scss'
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Header } from "./header/Header";

export default async function Home() {
  const session = await auth()
  if(!session) {
    redirect('/authPage')
  }
  
  return (
    <div className="home">
    <div className={styles.homeBackground}>
    <Header />
    <Calendar/>
    </div>
    </div>
  );
}
