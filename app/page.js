import Trending from "@/components/Home/Trending";
import Animation from "@/components/titleAnimation";
import SectionWrapper from "@/components/Home/section-wrapper";
import { BsGithub } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import Link from "next/link";

export default async function Home() {
  const data = await fetch(
    `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.API_KEY}`,
    { next: { revalidate: 3600 } }
  );
  const res = await data.json();

  return (
    <div className="h-full pd flex flex-col">
      <Animation>
        <h1 className="h-[5%] mt-6 mb-3 text-white font-semibold text-xl">
          Trending
        </h1>
      </Animation>
      <div className="w-full h-[65%] md:h-[85%] carouselContainer carousel-scrollbar-hide">
        <SectionWrapper>
          {res.results.map((trend) => (
            <Trending trend={trend} key={trend.id} />
          ))}
        </SectionWrapper>
      </div>
      <div className="w-full flex flex-col md:hidden mt-8 gap-2 -ml-2 items-center text-zinc-300">
        <p className="text-xs">
          Created by <span className="text-primary">Ahmad Ouladaouid</span>
        </p>
        <div className="flex flex-row gap-2 items-center ">
          <Link href={"https://github.com/ahmadoa"}>
            <BsGithub size={22} />
          </Link>
          <Link href={"https://www.linkedin.com/in/ahmad-ouladaouid/"}>
            <FaLinkedin size={22} />
          </Link>
          <Link href={"https://www.instagram.com/ahmad_oulada/"}>
            <AiFillInstagram size={24} />
          </Link>
        </div>
      </div>
    </div>
  );
}
