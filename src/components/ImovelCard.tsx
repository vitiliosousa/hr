"use client";

import Image from "next/image";
import { Heart, MapPin, BedDouble, Bath, Square } from "lucide-react";
import Link from "next/link";

interface Imovel {
  id: string;
  titulo: string;
  localizacao: string;
  tipo: string;
  quartos: number;
  casasBanho: number;
  area: number;
  preco: number;
  imagem: string;
  disponivel: boolean;
}

export default function ImovelCard({ imovel }: { imovel: Imovel }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48 w-full">
        <Image src={imovel.imagem} alt={imovel.titulo} fill className="object-cover" />
        <div className="absolute top-3 left-3">
          <span className="bg-mint text-black text-xs font-semibold px-2 py-1 rounded-full">
            {imovel.tipo}
          </span>
        </div>
        {!imovel.disponivel && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-white text-black text-xs font-semibold px-3 py-1 rounded-full">
              Alugado
            </span>
          </div>
        )}
        <button
          className="absolute top-3 right-3 bg-white rounded-full p-1.5 shadow hover:scale-110 transition hover:cursor-pointer"
          aria-label="Adicionar aos favoritos"
        >
          <Heart className="size-4 text-zinc-600" />
        </button>
      </div>

      <div className="p-4 flex flex-col gap-3 flex-1">
        <div>
          <h3 className="font-semibold text-sm line-clamp-1">{imovel.titulo}</h3>
          <p className="text-xs text-zinc-500 flex items-center gap-1 mt-1">
            <MapPin className="size-3" />
            {imovel.localizacao}
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs text-zinc-600">
          <span className="flex items-center gap-1">
            <BedDouble className="size-3 text-mint" />
            {imovel.quartos > 0 ? `${imovel.quartos} quartos` : "Estúdio"}
          </span>
          <span className="flex items-center gap-1">
            <Bath className="size-3 text-mint" />
            {imovel.casasBanho} WC
          </span>
          <span className="flex items-center gap-1">
            <Square className="size-3 text-mint" />
            {imovel.area} m²
          </span>
        </div>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <div>
            <p className="text-xs text-zinc-400">A partir de</p>
            <p className="text-slamon font-bold text-base">
              {imovel.preco.toLocaleString("pt-PT")}{" "}
              <span className="text-xs font-normal text-zinc-400">MZN/mês</span>
            </p>
          </div>
          <Link href={`/imovel/${imovel.id}`}>
            <button className="bg-mint text-black text-xs font-semibold px-4 py-2 rounded-lg hover:bg-mint/80 transition ease-in-out duration-300 hover:cursor-pointer">
              Ver imóvel
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
