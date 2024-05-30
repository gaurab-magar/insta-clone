import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/Navbar";
import SessionWrpper from "./Components/SeesionWrap";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create insta-clone",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <SessionWrpper>
      <html lang="en">
        <body className={inter.className}>
          <Navbar />
          {children}
        </body>
      </html>
    </SessionWrpper>
  );
}
