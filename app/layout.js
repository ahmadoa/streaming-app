import "./globals.css";
import Nav from "@/components/nav/nav";
import SearchBox from "@/components/nav/searchBox";


export const metadata = {
  title: {
    default: "Kinetic",
    template: "%s",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="./../public/logo.png"
          type="image/png"
          sizes="32x32"
        />
      </head>
      <body className="bg-[#061509] w-full h-screen overflow-x-hidden customScrollBar relative">
        <Nav />
        <div className="w-full h-[88%]">{children}</div>
        <SearchBox />
      </body>
    </html>
  );
}
