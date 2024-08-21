import Image from "next/image";
import styles from "./page.module.css";
import { Calendar } from "./components/calendar/Calendar";
import { Price } from "./components/calendar/Price";


export default function Home() {
  return (
    <>
    <Calendar/>
    {/* <Price/> */}
    </>
  );
}
