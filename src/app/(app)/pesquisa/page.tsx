"use client";

import { useState } from "react";
import { Search, X, SlidersHorizontal } from "lucide-react";
import ImovelCard from "@/components/ImovelCard";
import { imoveis } from "@/data/imoveis";

const tipos = ["Apartamento", "Vivenda", "Moradia", "Quarto", "Estúdio"];
const opcoesQuartos = ["1", "2", "3", "4+"];
const amenidadesFiltro = ["Piscina", "Jardim", "Internet", "Ar condicionado", "Gerador", "Segurança 24h"];

export default function Pesquisa() {
  const [tiposSel, setTiposSel] = useState<string[]>([]);
  const [quartos, setQuartos] = useState("");
  const [precoMin, setPrecoMin] = useState("");
  const [precoMax, setPrecoMax] = useState("");
  const [areaMin, setAreaMin] = useState("");
  const [amenidades, setAmenidades] = useState<string[]>([]);

  const toggleTipo = (t: string) =>
    setTiposSel((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));

  const toggleAm = (a: string) =>
    setAmenidades((p) => (p.includes(a) ? p.filter((x) => x !== a) : [...p, a]));

  const limpar = () => {
    setTiposSel([]); setQuartos(""); setPrecoMin(""); setPrecoMax(""); setAreaMin(""); setAmenidades([]);
  };

  const temFiltros = tiposSel.length > 0 || quartos || precoMin || precoMax || areaMin || amenidades.length > 0;

  const resultados = imoveis.filter((i) => {
    if (tiposSel.length > 0 && !tiposSel.includes(i.tipo)) return false;
    if (quartos) {
      const q = parseInt(quartos);
      if (quartos === "4+" ? i.quartos < 4 : i.quartos !== q) return false;
    }
    if (precoMin && i.preco < parseInt(precoMin)) return false;
    if (precoMax && i.preco > parseInt(precoMax)) return false;
    if (areaMin && i.area < parseInt(areaMin)) return false;
    if (amenidades.length > 0 && !amenidades.every((a) => i.amenidades.includes(a))) return false;
    return true;
  });

  return (
    <div className="w-full px-10 py-8 pb-16">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Pesquisar imóveis</h1>
          <p className="text-sm text-zinc-500 mt-0.5">{resultados.length} imóveis encontrados</p>
        </div>
        {temFiltros && (
          <button
            onClick={limpar}
            className="flex items-center gap-1.5 text-xs text-zinc-500 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition hover:cursor-pointer"
          >
            <X className="size-3" /> Limpar filtros
          </button>
        )}
      </div>

      <div className="flex gap-8 items-start">
        {/* Sidebar de filtros */}
        <aside className="w-64 flex-shrink-0 sticky top-24">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-6">
            <div className="flex items-center gap-2 font-semibold text-sm">
              <SlidersHorizontal className="size-4" /> Filtros
            </div>

            {/* Tipo */}
            <div>
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-3">Tipo de imóvel</p>
              <div className="flex flex-col gap-2">
                {tipos.map((t) => (
                  <label key={t} className="flex items-center gap-2.5 cursor-pointer group">
                    <div
                      onClick={() => toggleTipo(t)}
                      className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition hover:cursor-pointer ${
                        tiposSel.includes(t) ? "bg-mint border-mint" : "border-gray-300 group-hover:border-mint"
                      }`}
                    >
                      {tiposSel.includes(t) && (
                        <svg className="w-2.5 h-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span
                      onClick={() => toggleTipo(t)}
                      className="text-sm text-zinc-600 group-hover:text-black transition"
                    >
                      {t}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Quartos */}
            <div>
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-3">Quartos</p>
              <div className="flex gap-2 flex-wrap">
                {opcoesQuartos.map((q) => (
                  <button
                    key={q}
                    onClick={() => setQuartos(quartos === q ? "" : q)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium border transition hover:cursor-pointer ${
                      quartos === q
                        ? "bg-mint border-mint text-black"
                        : "border-gray-200 text-zinc-600 hover:border-mint"
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Preço */}
            <div>
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-3">Preço (MZN/mês)</p>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Mín."
                  value={precoMin}
                  onChange={(e) => setPrecoMin(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-mint"
                />
                <input
                  type="number"
                  placeholder="Máx."
                  value={precoMax}
                  onChange={(e) => setPrecoMax(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-mint"
                />
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Área */}
            <div>
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-3">Área mínima (m²)</p>
              <input
                type="number"
                placeholder="Ex: 50"
                value={areaMin}
                onChange={(e) => setAreaMin(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-mint"
              />
            </div>

            <hr className="border-gray-100" />

            {/* Comodidades */}
            <div>
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-3">Comodidades</p>
              <div className="flex flex-col gap-2">
                {amenidadesFiltro.map((a) => (
                  <label key={a} className="flex items-center gap-2.5 cursor-pointer group">
                    <div
                      onClick={() => toggleAm(a)}
                      className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition hover:cursor-pointer ${
                        amenidades.includes(a) ? "bg-mint border-mint" : "border-gray-300 group-hover:border-mint"
                      }`}
                    >
                      {amenidades.includes(a) && (
                        <svg className="w-2.5 h-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span
                      onClick={() => toggleAm(a)}
                      className="text-sm text-zinc-600 group-hover:text-black transition"
                    >
                      {a}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Resultados */}
        <div className="flex-1">
          {resultados.length > 0 ? (
            <div className="grid grid-cols-2 gap-5 xl:grid-cols-3">
              {resultados.map((imovel) => (
                <ImovelCard key={imovel.id} imovel={imovel} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <Search className="size-14 text-zinc-200" />
              <p className="text-zinc-500 font-medium text-lg">Nenhum imóvel encontrado</p>
              <p className="text-sm text-zinc-400">Tenta ajustar os filtros à esquerda</p>
              <button
                onClick={limpar}
                className="text-sm text-mint hover:underline hover:cursor-pointer font-medium"
              >
                Limpar todos os filtros
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
