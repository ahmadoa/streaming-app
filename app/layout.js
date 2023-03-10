import "./globals.css";
import Nav from "@/components/nav/nav";

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
      <body className="customBG w-full h-min overflow-x-hidden customScrollBar">
        <Nav />
        <div className="w-full">{children}</div>
      </body>
    </html>
  );
}
