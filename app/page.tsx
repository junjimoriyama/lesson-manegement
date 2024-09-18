// next
import { redirect } from "next/navigation";
// component
import { Calendar } from "./components/calendar/Calendar";
import { Header } from "./components/header/Header";
// function
import { auth } from "@/auth";
// style
import './home.scss'

export default async function Home() {
  const session = await auth()
  if(!session) {
    redirect('/authPage')
  }
  
  return (
    <div className="home">
    {/* <div className={styles.homeBackground}> */}
    <Header />
    <Calendar/>
    {/* </div> */}
    </div>
  );
}
