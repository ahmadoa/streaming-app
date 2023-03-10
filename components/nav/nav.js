"use client";
import Link from "next/link";
import Image from "next/image";
import Logo from "./../../public/logo.png";
import "./../../app/globals.css";
import SearchBox from "./searchBox";
import { usePathname } from "next/navigation";

export default function nav() {
  const path = usePathname();

  return (
    <div
      className={`w-full h-[10%] px-10 mt-6 mb-3 flex flex-row items-center text-white justify-between`}
    >
      <div className="flex flex-row items-center w-[70%]">
        <Image src={Logo} className="w-6 h-7" alt="Kinetic logo" />
        <ul className="w-[40%] flex flex-row justify-between pl-12 text-lg font-medium">
          <li
            className={
              path == "/"
                ? `text-primary transition-all hover:scale-110 hover:text-primary ease-in-out duration-300`
                : `transition-all hover:scale-110 hover:text-primary ease-in-out duration-300`
            }
          >
            <Link href={"/"}>Home</Link>
          </li>
          <li
            className={
              path == "/movies"
                ? `text-primary transition-all hover:scale-110 hover:text-primary ease-in-out duration-300`
                : `transition-all hover:scale-110 hover:text-primary ease-in-out duration-300`
            }
          >
            <Link href={"/movies"}>Movies</Link>
          </li>
          <li
            className={
              path == "/tvShows"
                ? `text-primary transition-all hover:scale-110 hover:text-primary ease-in-out duration-300`
                : `transition-all hover:scale-110 hover:text-primary ease-in-out duration-300`
            }
          >
            <Link href={"/tvShows"}>TV Shows</Link>
          </li>
        </ul>
      </div>
      <SearchBox />
    </div>
  );
}
