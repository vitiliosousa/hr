import Image from "next/image";
import { searches } from "@/data/searches";

export default function RecentResearches() {
  return (
    <div className="flex flex-col w-4/5 mt-30 text-sm space-y-10 py-10">
      <h1 className="text-2xl">Your recent searches</h1>
      <div className="grid grid-cols-4 gap-4">
        {searches.map((search, index) => (
          <div
            className="flex gap-4"
            key={index}
          >
            <Image src={search.image} alt="" />
            <div className="flex flex-col gap-1 justify-center">
              <p className="font-semibold text-zinc-600">{search.location}</p>
              <p className="text-xs ">{search.places}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
