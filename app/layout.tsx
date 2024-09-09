import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Lato } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { DayModal } from "./components/calendar/dayModal/DayModal";

// const inter = Inter({ subsets: ["latin"] });
const lato = Lato({
  weight: '400',  // フォントの太さを400に指定
  subsets: ['latin'],  // サブセットをlatinに指定
});

export const metadata: Metadata = {
  title: "lesson management",
  description: "lesson management app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="jp">
      <body className={lato.className}>
      <StoreProvider>
      {/* <DayModal/> */}
        {children}
      </StoreProvider>
      </body>
    </html>
  );
}
