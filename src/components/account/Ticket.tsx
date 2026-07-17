import { DoorClosed, ChevronRight, Clock } from "lucide-react";
import Image from "next/image";
import ticket from "@/assets/ticket.svg";

export default function Ticket() {
  return (
    <div className="bg-white w-full shadow-lg py-6 px-4 flex items-center justify-between rounded-lg p-4">
      <div className="flex items-center gap-4">
        <div className="rounded-lg border">
          <Image src={ticket} alt="" />
        </div>
        <div className="h-full justify-center flex flex-col">
          <p className="text-xs">Check-In</p>
          <p className="font-semibold">Thur, Dec 8</p>
        </div>
        <p className="font-semibold">-</p>

        <div className="h-full justify-center flex flex-col">
          <p className="text-xs">Check-Out</p>
          <p className="font-semibold">Fri, Dec 9</p>
        </div>
        <div className="h-6 w-px bg-black mx-4" />
        <div className="flex flex-col gap-1 justify-center">
          <div className="flex items-center gap-2">
            <div className="p-1 bg-zinc-50 rounded">
              <Clock className="h-6 w-6 text-white" fill="#D3B58D" />
            </div>
            <div className="flex flex-col">
              <p className="text-xs">Check-In time</p>
              <p className="text-sm font-semibold">12:00pm</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-1 bg-zinc-50  rounded">
              <Clock className="h-6 w-6 text-white" fill="#D3B58D" />
            </div>
            <div className="flex flex-col">
              <p className="text-xs">Check-In out</p>
              <p className="text-sm font-semibold">11:30pm</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1 justify-center h-full">
          <div className="flex items-center gap-2 h-full">
          <div className="p-1 bg-zinc-50  rounded">
              <DoorClosed className="h-6 w-6 text-white" fill="#D3B58D" />
            </div>
          <div>
            <p className="font-semibold text-xs">Room no.</p>
            <p className="text-sm">On arrival</p>
          </div>
        </div>
          <div className="flex items-center gap-2 invisible">
            <div className="p-1 bg-zinc-50  rounded">
              <DoorClosed className="h-6 w-6 text-white" fill="#D3B58D" />
            </div>
            <div className="flex flex-col">
              <p className="text-xs">Room</p>
              <p className="text-sm font-semibold">11:30pm</p>
            </div>
          </div>
        </div>
        
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button className="bg-mint text-black px-4 py-2 rounded text-xs font-semibold hover:cursor-pointer hover:bg-mint ease-in-out duration-300">
            Download Ticket
          </button>
          <button className="border border-mint text-black px-4 py-2 rounded font-semibold text-xs hover:cursor-pointer hover:bg-mint ease-in-out duration-300">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
