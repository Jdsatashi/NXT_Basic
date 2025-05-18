import "./globals.css";
import localFont from "next/font/local";
import Navbar from "@/components/Navbar";

const myFont = localFont({
  src: "./fonts/MTLmr3m.ttf",
  variable: "--font-geist",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={myFont.className}>
        <header>
          <Navbar />
        </header>
        <main>{children}</main>
        <footer>Footer</footer>
      </body>
    </html>
  );
}
