import Image from "next/image";
import google from "@/assets/google.svg";

export default function SocialMedia() {
  return (
    <button className="flex items-center justify-center gap-3 h-11 w-full rounded-xl border border-gray-200 hover:cursor-pointer hover:bg-gray-50 transition ease-in-out duration-200">
      <Image src={google} alt="Google" className="h-5 w-5" />
      <span className="text-xs font-semibold">Continuar com Google</span>
    </button>
  );
}
