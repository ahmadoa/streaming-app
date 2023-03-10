import Popular from "@/components/movies/popular";
import Upcoming from "@/components/movies/upcoming";
import Latest from "../../components/movies/latest";

export const metadata = {
  title: "Movies",
};

export default function Movies() {
  return (
    <div className="flex flex-col pl-10">
      <Latest />
      <Popular />
      <Upcoming />
    </div>
  );
}
