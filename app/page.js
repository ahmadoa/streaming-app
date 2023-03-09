import Trending from "@/components/Home/Trending";

export default async function Home() {
  const data = await fetch(
    `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.API_KEY}`,
    { next: { revalidate: 3600 } }
  );
  const res = await data.json();
  console.log(res);

  return (
    <div className="h-full flex flex-col pl-10">
      <h1 className="h-[5%] mt-6 mb-3 text-white font-semibold text-xl">
        Trending
      </h1>
      <div className="w-full h-[85%] carouselContainer carousel-scrollbar-hide">
        <div className="h-full carousel flex gap-5 flex-nowrap">
          {res.results.map((trend) => (
            <Trending trend={trend} />
          ))}
        </div>
      </div>
    </div>
  );
}
