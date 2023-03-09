import "./globals.css";
import Nav from "@/components/nav/nav";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="customBG w-full h-screen py-3 overflow-hidden">
        <Nav />
        <div className="h-[90%] w-full">{children}</div>
      </body>
    </html>
  );
}
