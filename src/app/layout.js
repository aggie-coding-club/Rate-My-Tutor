import localFont from "next/font/local";
import "./globals.css";


export const metadata = {
  title: "Rate My Tutor",
  description: "Really creative description right here",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
