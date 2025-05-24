import Image from "next/image";
import { trips } from "@/data/trips";

export default function PlanYourPerfectTrip() {
  return (
    <div className="flex flex-col w-4/5 mt-48 text-sm space-y-10 py-10">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="font-semibold text-2xl">Plan your perfect trip</h1>
          <p className="text-sm">
            Search Flights & Places Hire to our most popular destinations
          </p>
        </div>
        <button className="border border-mint rounded p-2 font-semibold text-sm hover:bg-mint hover:text-white ease-in-out duration-300 hover:cursor-pointer">
          See more places
        </button>
      </div>
      
      {/* Cards */}
      <div className="grid grid-cols-3 gap-4">
        {trips.map((trip, index) => (
          <div className="flex shadow-lg gap-4 rounded-xl bg-white p-4" key={index}>
            <Image src={trip.image} alt="" />
            <div className="flex flex-col gap-1 justify-center">
              <p className="font-semibold text-zinc-600">{trip.name}</p>
              <p className="text-xs ">{trip.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
