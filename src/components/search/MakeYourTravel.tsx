import fundo from "@/assets/fundo.jpg";
import Image from "next/image";
export default function MakeYourTravel() {
  return (
    <div className="relative h-[580px] w-full text-white flex flex-col items-center justify-center overflow-hidden">
      <Image
        src={fundo}
        alt="Fundo"
        fill
        className="object-cover object-center z-0"
        priority
      />
      <div className="relative z-10 flex flex-col items-center space-y-10 w-full h-full bg-black/60">
        <div className="flex justify-between items-center  w-4/5 mt-20">
            <div className="w-[500px]">
                <h1 className="text-5xl leading-14">Make your travel whishlist, we’ll do the rest</h1>
                <p className="text-lg mt-2">
                    Special offers to suit your plan.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
}
