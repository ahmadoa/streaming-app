import Trending from "@/components/Home/Trending";
import Animation from "@/components/titleAnimation";
import SectionWrapper from "@/components/Home/section-wrapper";

export default async function Home() {
  const data = await fetch(
    `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.API_KEY}`,
    { next: { revalidate: 3600 } }
  );
  const res = await data.json();

  return (
    <div className="h-full flex flex-col pl-10">
      <Animation>
        <h1 className="h-[5%] mt-6 mb-3 text-white font-semibold text-xl">
          Trending
        </h1>
      </Animation>
      <div className="w-full h-[85%] carouselContainer carousel-scrollbar-hide">
        <SectionWrapper>
          {res.results.map((trend) => (
            <Trending trend={trend} />
          ))}
        </SectionWrapper>
      </div>
    </div>
  );
}
