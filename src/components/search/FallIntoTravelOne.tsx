import Image from "next/image";
import melbourne from "@/assets/melbourne.svg";
import paris from "@/assets/paris.svg";
import london from "@/assets/london.svg";
import columbia from "@/assets/columbia.svg";

export default function FallIntoTravelOne() {
  return (
    <div className="flex flex-col w-4/5 mt- text-sm space-y-10 py-10">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl">Fall into travel</h1>
          <p className="text-sm w-4/5">
            Going somewhere to celebrate this season? Whether you’re going home
            or somewhere to roam, we’ve got the travel tools to get you to your
            destination.
          </p>
        </div>
        <button className="border border-mint rounded w-20 p-2 font-semibold text-sm hover:bg-mint hover:text-white ease-in-out duration-300 hover:cursor-pointer">
          See all
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="relative h-[400px] w-full rounded-xl text-white flex flex-col items-center justify-center overflow-hidden">
          <Image
            src={melbourne}
            alt="Fundo"
            fill
            className="object-cover object-center z-0"
            priority
          />
          <div className="relative z-10 flex flex-col p-4 items-center justify-end space-y-4 w-full h-full">
            <div className="flex items-center w-full justify-between">
                <div>
                    <h1 className="font-semibold text-xl">Melbourne</h1>
                    <p className="text-xs">An amazing journey</p>
                </div>
                <p className="text-xl font-semibold">$ 700</p>
            </div>
            <button className="w-full bg-mint p-3 rounded text-black text-xs ease-in-out duration-300 hover:bg-mint/80 hover:cursor-pointer font-semibold">Book a Stay</button>
          </div>
        </div>
        <div className="relative h-[400px] w-full rounded-xl text-white flex flex-col items-center justify-center overflow-hidden">
          <Image
            src={paris}
            alt="Fundo"
            fill
            className="object-cover object-center z-0"
            priority
          />
          <div className="relative z-10 flex flex-col p-4 items-center justify-end space-y-4 w-full h-full">
            <div className="flex items-center w-full justify-between">
                <div>
                    <h1 className="font-semibold text-xl">Paris</h1>
                    <p className="text-xs">A Paris Adventure</p>
                </div>
                <p className="text-xl font-semibold">$ 600</p>
            </div>
            <button className="w-full bg-mint p-3 rounded text-black text-xs ease-in-out duration-300 hover:bg-mint/80 hover:cursor-pointer font-semibold">Book a Stay</button>
          </div>
        </div>
        <div className="relative h-[400px] w-full rounded-xl text-white flex flex-col items-center justify-center overflow-hidden">
          <Image
            src={london}
            alt="Fundo"
            fill
            className="object-cover object-center z-0"
            priority
          />
          <div className="relative z-10 flex flex-col p-4 items-center justify-end space-y-4 w-full h-full">
            <div className="flex items-center w-full justify-between">
                <div>
                    <h1 className="font-semibold text-xl">London</h1>
                    <p className="text-xs">London eye adventure</p>
                </div>
                <p className="text-xl font-semibold">$ 350</p>
            </div>
            <button className="w-full bg-mint p-3 rounded text-black text-xs ease-in-out duration-300 hover:bg-mint/80 hover:cursor-pointer font-semibold">Book a Stay</button>
          </div>
        </div>
        <div className="relative h-[400px] w-full rounded-xl text-white flex flex-col items-center justify-center overflow-hidden">
          <Image
            src={columbia}
            alt="Fundo"
            fill
            className="object-cover object-center z-0"
            priority
          />
          <div className="relative z-10 flex flex-col p-4 items-center justify-end space-y-4 w-full h-full">
            <div className="flex items-center w-full justify-between">
                <div>
                    <h1 className="font-semibold text-xl">Columbia</h1>
                    <p className="text-xs">Amazing streets</p>
                </div>
                <p className="text-xl font-semibold">$ 700</p>
            </div>
            <button className="w-full bg-mint p-3 rounded text-black text-xs ease-in-out duration-300 hover:bg-mint/80 hover:cursor-pointer font-semibold">Book a Stay</button>
          </div>
        </div>
      </div>
    </div>
  );
}
