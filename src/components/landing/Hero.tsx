"use client";

import { Search, MapPin, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import fundo from "@/assets/fundo1.jpg";

const TIPOS = ["Apartamento", "Casa", "Vivenda", "Quarto", "Flat", "Escritório", "Terreno"];

export default function Hero() {
  const router = useRouter();
  const [loc, setLoc] = useState("");
  const [tipo, setTipo] = useState("");
const [precoMin, setPrecoMin] = useState("");
  const [precoMax, setPrecoMax] = useState("");

  const pesquisar = () => {
    const p = new URLSearchParams();
    if (loc) p.set("localizacao", loc);
    if (tipo) p.set("tipo", tipo);
if (precoMin) p.set("precoMin", precoMin);
    if (precoMax) p.set("precoMax", precoMax);
    router.push(`/pesquisa?${p.toString()}`);
  };

  return (
    <section className="relative w-full h-[680px] flex flex-col items-center justify-center overflow-hidden">
      <Image src={fundo} alt="Imóvel" fill className="object-cover object-center" priority />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

      <div className="relative z-10 flex flex-col items-center gap-10 text-white text-center w-full max-w-3xl px-6">

        {/* Título */}
        <div className="flex flex-col gap-3">
          <p className="text-mint text-xs font-bold uppercase tracking-[0.25em]">
            Marketplace de imóveis em Moçambique
          </p>
          <h1 className="text-5xl font-bold leading-tight">
            Encontra a tua<br />próxima casa
          </h1>
          <p className="text-white/65 text-sm max-w-sm mx-auto leading-relaxed">
            Milhares de imóveis disponíveis em todo o país.
          </p>
        </div>

        {/* Caixa de pesquisa */}
        <div className="w-full bg-white rounded-2xl shadow-2xl p-3 flex flex-col gap-2">

          {/* Linha 1 — Localização */}
          <div className="flex items-center gap-3 bg-gray-100 rounded-xl px-4 py-3">
            <MapPin className="size-4 text-zinc-500 flex-shrink-0" />
            <div className="flex-1 text-left">
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Localização</p>
              <input
                type="text"
                placeholder="Cidade, bairro ou zona — ex: Polana, Maputo"
                value={loc}
                onChange={(e) => setLoc(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && pesquisar()}
                className="w-full text-sm font-medium text-zinc-900 bg-transparent outline-none placeholder:text-zinc-400 mt-0.5"
              />
            </div>
          </div>

          {/* Linha 2 — Filtros + Botão */}
          <div className="flex gap-2">

            {/* Tipo */}
            <div className="flex-1 bg-gray-100 rounded-xl px-4 py-3 text-left relative">
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Tipo</p>
              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className="w-full text-sm font-medium text-zinc-900 bg-transparent outline-none appearance-none hover:cursor-pointer mt-0.5 pr-5"
              >
                <option value="">Todos os tipos</option>
                {TIPOS.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              <ChevronDown className="absolute right-3 bottom-3.5 size-3.5 text-zinc-400 pointer-events-none" />
            </div>

            {/* Intervalo de preço */}
            <div className="bg-gray-100 rounded-xl px-4 py-3 text-left flex items-end gap-2">
              <div>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Preço mín.</p>
                <input
                  type="number"
                  placeholder="5 000"
                  value={precoMin}
                  onChange={(e) => setPrecoMin(e.target.value)}
                  className="w-20 text-sm font-medium text-zinc-900 bg-transparent outline-none placeholder:text-zinc-400 mt-0.5"
                />
              </div>
              <span className="text-zinc-300 text-sm pb-0.5">|</span>
              <div>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Preço máx.</p>
                <input
                  type="number"
                  placeholder="80 000"
                  value={precoMax}
                  onChange={(e) => setPrecoMax(e.target.value)}
                  className="w-20 text-sm font-medium text-zinc-900 bg-transparent outline-none placeholder:text-zinc-400 mt-0.5"
                />
              </div>
              <span className="text-xs font-bold text-zinc-500 pb-0.5">MZN</span>
            </div>

            {/* Botão pesquisar */}
            <button
              onClick={pesquisar}
              className="bg-mint text-black font-bold px-6 rounded-xl flex items-center gap-2 hover:bg-mint/80 transition-colors duration-150 hover:cursor-pointer text-sm whitespace-nowrap"
            >
              <Search className="size-4" />
              Pesquisar
            </button>
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex items-center gap-6 text-white/50 text-xs">
          <span><span className="text-mint font-bold">✓</span> 1.200+ imóveis</span>
          <span className="w-px h-3 bg-white/15" />
          <span><span className="text-mint font-bold">✓</span> 32 cidades</span>
          <span className="w-px h-3 bg-white/15" />
          <span><span className="text-mint font-bold">✓</span> Sem intermediários</span>
        </div>
      </div>
    </section>
  );
}
