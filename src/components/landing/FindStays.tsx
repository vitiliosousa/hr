import fundo from "@/assets/fundo1.jpg";
import Image from "next/image";
import { Home } from "lucide-react";

export default function FindStays() {
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
        <div className="flex justify-between items-center w-4/5 mt-20">
          <div className="flex items-center gap-2">
            <Home className="size-5" />
            <p className="text-sm font-semibold">CasaJá</p>
          </div>
          <div className="flex gap-6 items-center">
            <a
              className="text-sm hover:underline hover:text-mint ease-in-out duration-300"
              href="/entrar"
            >
              Entrar
            </a>
            <a
              className="text-blackish font-semibold bg-white px-5 py-2 rounded text-sm hover:bg-gray-200 ease-in-out duration-300 flex items-center justify-center"
              href="/registar"
            >
              Registar
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center gap-5 text-center">
          <h2 className="text-4xl font-semibold">Encontra a tua</h2>
          <h1 className="text-6xl font-bold">PRÓXIMA CASA</h1>
          <p className="text-sm text-white/80">
            Pesquisa imóveis e contacta o proprietário diretamente
          </p>
        </div>
      </div>
    </div>
  );
}