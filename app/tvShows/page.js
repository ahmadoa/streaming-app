import Popular from "@/components/tvshows/popular";
import AiringToday from "@/components/tvshows/airtoday";
import Latest from "../../components/tvshows/trending";

export const metadata = {
  title: "TV Shows",
};

export default function TVShows() {
  return (
    <div className="flex flex-col pd">
      <Latest />
      <Popular />
      <AiringToday />
    </div>
  );
}
