import { BiSearch } from "react-icons/bi";

export default function SearchBox() {
  return (
    <div className="w-72 h-8 bg-white rounded-xl overflow-hidden px-2 flex-row justify-center">
      <input
        type={"text"}
        placeholder="Find Movies, TV Shows..."
        className="w-[90%] h-full text-sm border-hidden outline-none text-black"
      />
      <BiSearch className="fill-black inline-flex" size={20} />
    </div>
  );
}
