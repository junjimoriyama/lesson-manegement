import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { DayModal } from "./components/calendar/dayModal/DayModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "lesson management2",
  description: "lesson management2 app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="jp">
      <body className={inter.className}>
      <StoreProvider>
      {/* <DayModal/> */}
        {children}
      </StoreProvider>
      </body>
    </html>
  );
}
