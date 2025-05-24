import { Building, BedDouble } from "lucide-react";
import { FloatingLabelInput } from "../FloatingLabelInput";
export default function WhereAreYouGoing() {
  return (
    <div className="w-4/5 h-50 flex flex-col justify-between bg-white p-5 -m-24 rounded shadow-lg z-20 relative">
      <h2 className="text- font-semibold flex items-center gap-2"><BedDouble className="h-5 w-5"/>Stays</h2>
      <div className="flex items-center justify-center gap-4">
        <FloatingLabelInput label="Enter-Destination" name="enterDestination" type="text"/>
        <FloatingLabelInput label="Check-In" name="checkIn" type="text"/>
        <FloatingLabelInput label="Check-Out" name="checkOut" type="text"/>
        <FloatingLabelInput label="Rooms&Guests" name="roomGuests" type="text"/>
      </div>
      <div className="flex items-center justify-end">
        <button className="text-xs font-semibold hover:bg-zinc-200 px-4 py-2 rounded ease-in-out duration-300 hover:cursor-pointer">+ Add Promo Code</button>
        <button className="bg-mint rounded px-4 py-2 ml-4 text-xs flex gap-1 items-center justify-center font-semibold hover:cursor-pointer hover:bg-mint/80 ease-in-out duration-300"><Building className="h-4 w-4"/>Show Places</button>
      </div>
    </div>
  );
}
