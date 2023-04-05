"use client";
import Link from "next/link";
import Image from "next/image";
import Logo from "./../../public/logo.png";
import "./../../app/globals.css";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { IoClose } from "react-icons/io5";

export default function nav() {
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`w-full h-[10%] px-3 md:px-10 pt-6 mb-3 flex flex-row items-center text-white justify-between`}
    >
      <div className="flex justify-between md:justify-start flex-row items-center w-full md:w-[70%] relative">
        <Image
          src={Logo}
          className="w-5 h-6 md:w-6 md:h-7"
          alt="Kinetic logo"
        />
        {isOpen ? (
          <IoClose
            size={26}
            className="bg-white rounded-lg fill-primary visible md:hidden"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          />
        ) : (
          <BiMenuAltRight
            size={26}
            className="bg-white rounded-lg fill-primary visible md:hidden"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          />
        )}
        {isOpen ? (
          <ul
            className={`absolute z-50 top-10 w-full bg-[#061509] flex flex-col text-center pl-0 md:pl-12 gap-1 py-2 rounded-lg text-base font-medium md:flex md:flex-row justify-between`}
          >
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
                path.startsWith("/movies")
                  ? `text-primary transition-all hover:scale-110 hover:text-primary ease-in-out duration-300`
                  : `transition-all hover:scale-110 hover:text-primary ease-in-out duration-300`
              }
            >
              <Link href={"/movies"}>Movies</Link>
            </li>
            <li
              className={
                path.startsWith("/tvShows")
                  ? `text-primary transition-all hover:scale-110 hover:text-primary ease-in-out duration-300`
                  : `transition-all hover:scale-110 hover:text-primary ease-in-out duration-300`
              }
            >
              <Link href={"/tvShows"}>TV Shows</Link>
            </li>
          </ul>
        ) : (
          <ul
            className={`w-[40%] hidden md:visible pl-12 text-lg font-medium  md:flex md:flex-row justify-between`}
          >
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
                path.startsWith("/movies")
                  ? `text-primary transition-all hover:scale-110 hover:text-primary ease-in-out duration-300`
                  : `transition-all hover:scale-110 hover:text-primary ease-in-out duration-300`
              }
            >
              <Link href={"/movies"}>Movies</Link>
            </li>
            <li
              className={
                path.startsWith("/tvShows")
                  ? `text-primary transition-all hover:scale-110 hover:text-primary ease-in-out duration-300`
                  : `transition-all hover:scale-110 hover:text-primary ease-in-out duration-300`
              }
            >
              <Link href={"/tvShows"}>TV Shows</Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
