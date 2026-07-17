"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Eye, LockOpen, MapPin, BedDouble, Square, Pencil, Trash2, Home } from "lucide-react";
import { imoveis } from "@/data/imoveis";

const meusImoveis = imoveis.slice(0, 4).map((im, i) => ({
  ...im,
  vistas: [142, 89, 203, 67][i],
  contactosDesbloqueados: [8, 3, 12, 2][i],
  estado: i === 2 ? "alugado" : "activo",
}));

type Tab = "todos" | "activos" | "alugados";

export default function MeusImoveis() {
  const [tab, setTab] = useState<Tab>("todos");

  const activos = meusImoveis.filter((i) => i.estado === "activo");
  const alugados = meusImoveis.filter((i) => i.estado === "alugado");
  const totalContactos = meusImoveis.reduce((s, i) => s + i.contactosDesbloqueados, 0);

  const lista = tab === "activos" ? activos : tab === "alugados" ? alugados : meusImoveis;

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-10 py-6 sm:py-8 pb-16">
      {/* Cabeçalho */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold">Os meus imóveis</h1>
          <p className="text-sm text-zinc-500 mt-1">Gere os teus anúncios e acompanha o desempenho</p>
        </div>
        <Link href="/publicar" className="w-full sm:w-auto">
          <button className="flex items-center justify-center gap-2 bg-mint text-black text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-mint/80 transition hover:cursor-pointer w-full sm:w-auto">
            <Plus className="size-4" /> Publicar novo imóvel
          </button>
        </Link>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-zinc-400 font-medium">Total de anúncios</p>
            <div className="bg-zinc-100 rounded-lg p-1.5"><Home className="size-4 text-zinc-500" /></div>
          </div>
          <p className="text-3xl font-bold">{meusImoveis.length}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-zinc-400 font-medium">Activos</p>
            <div className="bg-mint/10 rounded-lg p-1.5"><Eye className="size-4 text-mint" /></div>
          </div>
          <p className="text-3xl font-bold text-mint">{activos.length}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-zinc-400 font-medium">Contactos desbloqueados</p>
            <div className="bg-mint/10 rounded-lg p-1.5"><LockOpen className="size-4 text-mint" /></div>
          </div>
          <p className="text-3xl font-bold text-mint">{totalContactos}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-full sm:w-fit overflow-x-auto mb-6">
        {(["todos", "activos", "alugados"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-medium transition hover:cursor-pointer capitalize whitespace-nowrap shrink-0 ${
              tab === t ? "bg-white shadow-sm text-black" : "text-zinc-500 hover:text-black"
            }`}
          >
            {t === "todos" ? `Todos (${meusImoveis.length})` : t === "activos" ? `Activos (${activos.length})` : `Alugados (${alugados.length})`}
          </button>
        ))}
      </div>

      {/* Lista */}
      <div className="flex flex-col gap-4">
        {lista.map((imovel) => (
          <div
            key={imovel.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row overflow-hidden hover:shadow-md transition-shadow duration-200"
          >
            {/* Imagem */}
            <div className="relative w-full h-44 sm:w-52 sm:h-40 shrink-0">
              <Image src={imovel.imagem} alt={imovel.titulo} fill className="object-cover" />
              <div className="absolute inset-0 bg-linear-to-r from-black/10 to-transparent" />
            </div>

            <div className="flex flex-col sm:flex-row sm:flex-1 sm:items-center sm:gap-8 p-5 sm:p-6 gap-4">
              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <h3 className="font-semibold text-sm truncate">{imovel.titulo}</h3>
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full font-medium shrink-0 ${
                      imovel.estado === "activo"
                        ? "bg-mint/10 text-mint"
                        : "bg-orange-100 text-orange-600"
                    }`}
                  >
                    {imovel.estado === "activo" ? "● Activo" : "● Alugado"}
                  </span>
                </div>
                <p className="text-xs text-zinc-500 flex items-center gap-1 mb-2">
                  <MapPin className="size-3" />
                  {imovel.localizacao}
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-400">
                  <span className="flex items-center gap-1">
                    <BedDouble className="size-3" />
                    {imovel.quartos > 0 ? `${imovel.quartos} quartos` : "Estúdio"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Square className="size-3" />
                    {imovel.area} m²
                  </span>
                  <span className="bg-gray-100 px-2 py-0.5 rounded-md">{imovel.tipo}</span>
                </div>
              </div>

              {/* Em mobile: métricas e preço ficam lado a lado numa linha */}
              <div className="flex items-center justify-between gap-4 sm:contents">
                {/* Métricas */}
                <div className="flex gap-6 sm:gap-8 shrink-0">
                  <div className="text-center">
                    <p className="font-bold text-xl">{imovel.vistas}</p>
                    <div className="flex items-center gap-1 justify-center mt-0.5">
                      <Eye className="size-3 text-zinc-400" />
                      <p className="text-xs text-zinc-400">Vistas</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-xl text-mint">{imovel.contactosDesbloqueados}</p>
                    <div className="flex items-center gap-1 justify-center mt-0.5">
                      <LockOpen className="size-3 text-mint" />
                      <p className="text-xs text-zinc-400">Contactos</p>
                    </div>
                  </div>
                </div>

                {/* Preço */}
                <div className="text-right shrink-0 min-w-[110px]">
                  <p className="text-xs text-zinc-400 mb-0.5">Preço</p>
                  <p className="text-mint font-bold text-base">
                    {imovel.preco.toLocaleString("pt-PT")}
                  </p>
                  <p className="text-xs text-zinc-400">MZN/mês</p>
                </div>
              </div>

              {/* Acções: coluna em desktop, linha em mobile */}
              <div className="flex sm:flex-col gap-2 shrink-0">
                <Link href={`/imovel/${imovel.id}`} className="flex-1 sm:flex-none">
                  <button className="flex items-center gap-1.5 text-xs border border-gray-200 px-3.5 py-2 rounded-lg hover:bg-gray-50 transition hover:cursor-pointer w-full justify-center">
                    <Eye className="size-3" /> Ver
                  </button>
                </Link>
                <button className="flex-1 sm:flex-none flex items-center gap-1.5 text-xs border border-gray-200 px-3.5 py-2 rounded-lg hover:bg-gray-50 transition hover:cursor-pointer justify-center">
                  <Pencil className="size-3" /> Editar
                </button>
                <button className="flex-1 sm:flex-none flex items-center gap-1.5 text-xs border border-red-100 text-red-500 px-3.5 py-2 rounded-lg hover:bg-red-50 transition hover:cursor-pointer justify-center">
                  <Trash2 className="size-3" /> Remover
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {lista.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 sm:py-20 gap-4 bg-white rounded-2xl border border-gray-100 px-4 text-center">
          <Home className="size-12 text-zinc-200" />
          <p className="text-zinc-500 font-medium">Sem imóveis nesta categoria</p>
          <Link href="/publicar">
            <button className="bg-mint text-black text-sm font-semibold px-5 py-2 rounded-xl hover:bg-mint/80 transition hover:cursor-pointer">
              Publicar imóvel
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
