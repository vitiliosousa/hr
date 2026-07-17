import mail from "@/assets/mail.svg";
import Image from "next/image";

export default function SubscribeNewlestter() {
  return (
    <div className="w-4/5 h-full flex items-center justify-between rounded-xl bg-[#E5CCAC]">
      <div className="w-full flex pt-4 px-6 flex-col space-y-2">
        <h1 className="font-semibold text-4xl">
          Recebe os <br /> melhores imóveis
        </h1>
        <p className="text-sm">Subscreve a newsletter!</p>
        <p className="text-xs">
          Recebe alertas de novos imóveis na tua zona antes de toda a gente.
        </p>
        <div>
          <input
            type="text"
            placeholder="Your email address"
            className="w-80 h-10 px-4 rounded placeholder:text-blackish bg-white text-xs"
          />
          <button className="w-30 h-10 bg-blackish font-semibold text-white rounded ml-2 text-xs hover:cursor-pointer ease-in-out duration-300 hover:bg-mint hover:text-blackish">
            Subscribe
          </button>
        </div>
      </div>
      <Image src={mail} alt="mail" className="h-56 mr-4" />
    </div>
  );
}
