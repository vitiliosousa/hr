"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Eye, LockOpen, MapPin, BedDouble, Square, Pencil, Trash2, Home, Star, X } from "lucide-react";
import { imoveis } from "@/data/imoveis";

type Estado = "disponivel" | "reservado" | "alugado" | "pausado" | "expirado";

const meusImoveis = imoveis.slice(0, 5).map((im, i) => ({
  ...im,
  vistas: [142, 89, 203, 67, 31][i],
  contactosDesbloqueados: [8, 3, 12, 2, 0][i],
  estado: (["disponivel", "alugado", "reservado", "pausado", "expirado"] as Estado[])[i],
}));

const estadoConfig: Record<Estado, { label: string; classes: string }> = {
  disponivel: { label: "● Disponível",  classes: "bg-mint/10 text-mint" },
  reservado:  { label: "● Reservado",   classes: "bg-blue-100 text-blue-600" },
  alugado:    { label: "● Alugado",     classes: "bg-orange-100 text-orange-600" },
  pausado:    { label: "● Pausado",     classes: "bg-zinc-100 text-zinc-500" },
  expirado:   { label: "● Expirado",    classes: "bg-red-100 text-red-500" },
};

type Tab = "todos" | Estado;

const tabs: { id: Tab; label: string }[] = [
  { id: "todos",      label: "Todos" },
  { id: "disponivel", label: "Disponíveis" },
  { id: "reservado",  label: "Reservados" },
  { id: "alugado",    label: "Alugados" },
  { id: "pausado",    label: "Pausados" },
  { id: "expirado",   label: "Expirados" },
];

const planosDestaque = [
  { dias: 7,  preco: 150,  label: "7 dias" },
  { dias: 30, preco: 450,  label: "30 dias", destaque: true },
  { dias: 90, preco: 1200, label: "90 dias" },
];

export default function MeusImoveis() {
  const [tab, setTab] = useState<Tab>("todos");
  const [destaqueId, setDestaqueId] = useState<string | null>(null);
  const [planoDest, setPlanoDest] = useState<number | null>(null);

  const contagem = (e: Estado) => meusImoveis.filter((i) => i.estado === e).length;
  const activos  = contagem("disponivel");
  const totalContactos = meusImoveis.reduce((s, i) => s + i.contactosDesbloqueados, 0);
  const lista = tab === "todos" ? meusImoveis : meusImoveis.filter((i) => i.estado === tab);

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
            <p className="text-xs text-zinc-400 font-medium">Disponíveis</p>
            <div className="bg-mint/10 rounded-lg p-1.5"><Eye className="size-4 text-mint" /></div>
          </div>
          <p className="text-3xl font-bold text-mint">{activos}</p>
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
        {tabs.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition hover:cursor-pointer whitespace-nowrap shrink-0 ${
              tab === id ? "bg-white shadow-sm text-black" : "text-zinc-500 hover:text-black"
            }`}
          >
            {label}{id !== "todos" ? ` (${contagem(id as Estado)})` : ` (${meusImoveis.length})`}
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
            <div className="relative w-full h-44 sm:w-52 sm:h-40 shrink-0">
              <Image src={imovel.imagem} alt={imovel.titulo} fill className="object-cover" />
              <div className="absolute inset-0 bg-linear-to-r from-black/10 to-transparent" />
            </div>

            <div className="flex flex-col sm:flex-row sm:flex-1 sm:items-center sm:gap-8 p-5 sm:p-6 gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <h3 className="font-semibold text-sm truncate">{imovel.titulo}</h3>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium shrink-0 ${estadoConfig[imovel.estado].classes}`}>
                    {estadoConfig[imovel.estado].label}
                  </span>
                </div>
                <p className="text-xs text-zinc-500 flex items-center gap-1 mb-2">
                  <MapPin className="size-3" />{imovel.localizacao}
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-400">
                  <span className="flex items-center gap-1">
                    <BedDouble className="size-3" />
                    {imovel.quartos > 0 ? `${imovel.quartos} quartos` : "Estúdio"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Square className="size-3" />{imovel.area} m²
                  </span>
                  <span className="bg-gray-100 px-2 py-0.5 rounded-md">{imovel.tipo}</span>
                </div>
              </div>

              <div className="flex items-center justify-between sm:contents">
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

                <div className="text-right shrink-0 sm:min-w-[110px]">
                  <p className="text-xs text-zinc-400 mb-0.5">Preço</p>
                  <p className="text-mint font-bold text-base">{imovel.preco.toLocaleString("pt-PT")}</p>
                  <p className="text-xs text-zinc-400">MZN/mês</p>
                </div>
              </div>

              <div className="flex sm:flex-col gap-2 shrink-0">
                <Link href={`/imovel/${imovel.id}`} className="flex-1 sm:flex-none">
                  <button className="flex items-center gap-1.5 text-xs border border-gray-200 px-3.5 py-2 rounded-lg hover:bg-gray-50 transition hover:cursor-pointer w-full justify-center">
                    <Eye className="size-3" /> Ver
                  </button>
                </Link>
                <button className="flex-1 sm:flex-none flex items-center gap-1.5 text-xs border border-gray-200 px-3.5 py-2 rounded-lg hover:bg-gray-50 transition hover:cursor-pointer justify-center">
                  <Pencil className="size-3" /> Editar
                </button>
                <button
                  onClick={() => { setDestaqueId(imovel.id); setPlanoDest(null); }}
                  className="flex-1 sm:flex-none flex items-center gap-1.5 text-xs border border-amber-200 text-amber-600 px-3.5 py-2 rounded-lg hover:bg-amber-50 transition hover:cursor-pointer justify-center"
                >
                  <Star className="size-3" /> Destacar
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
        <div className="flex flex-col items-center justify-center py-20 gap-4 bg-white rounded-2xl border border-gray-100">
          <Home className="size-12 text-zinc-200" />
          <p className="text-zinc-500 font-medium">Sem imóveis nesta categoria</p>
          <Link href="/publicar">
            <button className="bg-mint text-black text-sm font-semibold px-5 py-2 rounded-xl hover:bg-mint/80 transition hover:cursor-pointer">
              Publicar imóvel
            </button>
          </Link>
        </div>
      )}

      {/* Modal de destaque */}
      {destaqueId && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-bold text-lg">Destacar anúncio</h3>
                <p className="text-xs text-zinc-500 mt-0.5">Aparece no topo dos resultados de pesquisa</p>
              </div>
              <button onClick={() => setDestaqueId(null)} className="p-2 hover:bg-gray-100 rounded-lg transition hover:cursor-pointer">
                <X className="size-4 text-zinc-500" />
              </button>
            </div>

            <div className="flex flex-col gap-3 mb-6">
              {planosDestaque.map((p) => (
                <button
                  key={p.dias}
                  onClick={() => setPlanoDest(p.dias)}
                  className={`relative flex items-center justify-between p-4 rounded-xl border-2 transition hover:cursor-pointer text-left ${
                    planoDest === p.dias ? "border-mint bg-mint/5" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {p.destaque && (
                    <span className="absolute -top-2.5 left-4 text-xs bg-amber-400 text-black font-bold px-2 py-0.5 rounded-full">
                      Popular
                    </span>
                  )}
                  <div>
                    <p className="font-semibold text-sm">{p.label}</p>
                    <p className="text-xs text-zinc-400 mt-0.5">Visibilidade máxima por {p.dias} dias</p>
                  </div>
                  <p className="font-bold text-base text-mint shrink-0">{p.preco} MZN</p>
                </button>
              ))}
            </div>

            <button
              disabled={!planoDest}
              className="w-full bg-mint text-black font-bold text-sm py-3 rounded-xl hover:bg-mint/80 transition hover:cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {planoDest ? `Destacar por ${planoDest} dias` : "Escolhe um plano"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
