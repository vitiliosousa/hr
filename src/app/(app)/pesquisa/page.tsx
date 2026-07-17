"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, SlidersHorizontal, ChevronDown } from "lucide-react";
import ImovelCard from "@/components/ImovelCard";
import { imoveis } from "@/data/imoveis";

const TIPOS = ["Apartamento", "Casa", "Moradia", "Vivenda", "Estúdio", "Quarto", "Flat", "Escritório"];
const QUARTOS_OP = ["1", "2", "3", "4+"];
const BANHOS_OP = ["1", "2", "3+"];
const COMODIDADES_OP = [
  "Mobilado", "Ar condicionado", "Piscina", "Jardim",
  "Varanda", "Terraço", "Segurança 24h", "Internet",
  "Gerador", "Água permanente", "Energia permanente", "Painéis solares",
];

const getCidades = () =>
  Array.from(new Set(imoveis.map((i) => i.localizacao.split(", ").pop() ?? ""))).sort();

type Panel = "cidade" | "tipo" | "quartos" | "preco" | "mais" | null;

export default function Pesquisa() {
  const [cidade, setCidade] = useState("");
  const [tiposSel, setTiposSel] = useState<string[]>([]);
  const [quartos, setQuartos] = useState("");
  const [banhos, setBanhos] = useState("");
  const [precoMin, setPrecoMin] = useState("");
  const [precoMax, setPrecoMax] = useState("");
  const [areaMin, setAreaMin] = useState("");
  const [amenidades, setAmenidades] = useState<string[]>([]);
  const [openPanel, setOpenPanel] = useState<Panel>(null);

  const barRef = useRef<HTMLDivElement>(null);
  const cidades = getCidades();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) {
        setOpenPanel(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggle = (p: Panel) => setOpenPanel((prev) => (prev === p ? null : p));

  const toggleTipo = (t: string) =>
    setTiposSel((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));
  const toggleAm = (a: string) =>
    setAmenidades((p) => (p.includes(a) ? p.filter((x) => x !== a) : [...p, a]));

  const limpar = () => {
    setCidade(""); setTiposSel([]); setQuartos(""); setBanhos("");
    setPrecoMin(""); setPrecoMax(""); setAreaMin(""); setAmenidades([]);
    setOpenPanel(null);
  };

  const maisAtivos = [banhos, areaMin].filter(Boolean).length + amenidades.length;
  const temFiltros = !!(cidade || tiposSel.length || quartos || banhos || precoMin || precoMax || areaMin || amenidades.length);

  const resultados = imoveis.filter((i) => {
    if (cidade && i.localizacao.split(", ").pop() !== cidade) return false;
    if (tiposSel.length && !tiposSel.includes(i.tipo)) return false;
    if (quartos) {
      const q = parseInt(quartos);
      if (quartos === "4+" ? i.quartos < 4 : i.quartos !== q) return false;
    }
    if (banhos) {
      const b = parseInt(banhos);
      if (banhos === "3+" ? i.casasBanho < 3 : i.casasBanho !== b) return false;
    }
    if (precoMin && i.preco < parseInt(precoMin)) return false;
    if (precoMax && i.preco > parseInt(precoMax)) return false;
    if (areaMin && i.area < parseInt(areaMin)) return false;
    if (amenidades.length && !amenidades.every((a) => i.amenidades.includes(a))) return false;
    return true;
  });

  /* ── Helpers de label para botões activos ── */
  const labelCidade = cidade || "Cidade";
  const labelTipo = tiposSel.length === 0 ? "Tipo" : tiposSel.length === 1 ? tiposSel[0] : `Tipo (${tiposSel.length})`;
  const labelQuartos = quartos ? (quartos === "1" ? "1 quarto" : quartos === "4+" ? "4+ quartos" : `${quartos} quartos`) : "Quartos";
  const labelPreco = precoMin || precoMax
    ? [precoMin && `${Number(precoMin).toLocaleString("pt-PT")}`, precoMax && `${Number(precoMax).toLocaleString("pt-PT")} MZN`].filter(Boolean).join(" – ")
    : "Preço";

  const btnBase = "flex items-center gap-1.5 px-4 py-2 rounded-xl border text-sm font-medium transition hover:cursor-pointer";
  const btnIdle = `${btnBase} border-gray-200 text-zinc-600 hover:border-zinc-400 hover:text-black bg-white`;
  const btnActive = `${btnBase} border-black bg-black text-white`;
  const btnOpen = `${btnBase} border-zinc-400 bg-gray-50 text-black`;

  const btn = (id: Panel, label: string, isActive: boolean) => (
    <button
      onClick={() => toggle(id)}
      className={isActive ? btnActive : openPanel === id ? btnOpen : btnIdle}
    >
      {label}
      <ChevronDown className={`size-3.5 transition-transform ${openPanel === id ? "rotate-180" : ""}`} />
    </button>
  );

  return (
    <div className="max-w-7xl mx-auto w-full px-10 py-8 pb-16">

      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-5">
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

      {/* Barra de filtros horizontal */}
      <div ref={barRef} className="relative mb-8">
        <div className="flex items-center gap-2 flex-wrap">
          {btn("cidade", labelCidade, !!cidade)}
          {btn("tipo", labelTipo, tiposSel.length > 0)}
          {btn("quartos", labelQuartos, !!quartos)}
          {btn("preco", labelPreco, !!(precoMin || precoMax))}

          <div className="w-px h-5 bg-gray-200 mx-1" />

          <button
            onClick={() => toggle("mais")}
            className={maisAtivos > 0
              ? btnActive
              : openPanel === "mais" ? btnOpen : btnIdle}
          >
            <SlidersHorizontal className="size-3.5" />
            Mais filtros{maisAtivos > 0 ? ` (${maisAtivos})` : ""}
            <ChevronDown className={`size-3.5 transition-transform ${openPanel === "mais" ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* Dropdown — Cidade */}
        {openPanel === "cidade" && (
          <div className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-50 w-52">
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">Cidade</p>
            <div className="flex flex-col gap-1.5">
              {cidades.map((c) => {
                const count = imoveis.filter((i) => i.localizacao.split(", ").pop() === c).length;
                return (
                  <button
                    key={c}
                    onClick={() => { setCidade(cidade === c ? "" : c); setOpenPanel(null); }}
                    className={`flex items-center justify-between text-sm px-3 py-2 rounded-xl transition hover:cursor-pointer ${
                      cidade === c ? "bg-mint text-black font-semibold" : "hover:bg-gray-50 text-zinc-700"
                    }`}
                  >
                    <span>{c}</span>
                    <span className="text-xs text-zinc-400">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Dropdown — Tipo */}
        {openPanel === "tipo" && (
          <div className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-50 w-56"
               style={{ left: "calc(1 * (6rem + 0.5rem))" }}>
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">Tipo de imóvel</p>
            <div className="flex flex-col gap-1.5">
              {TIPOS.map((t) => (
                <button
                  key={t}
                  onClick={() => toggleTipo(t)}
                  className={`flex items-center gap-2.5 text-sm px-3 py-2 rounded-xl transition hover:cursor-pointer text-left ${
                    tiposSel.includes(t) ? "bg-mint text-black font-semibold" : "hover:bg-gray-50 text-zinc-700"
                  }`}
                >
                  <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                    tiposSel.includes(t) ? "bg-black border-black" : "border-gray-300"
                  }`}>
                    {tiposSel.includes(t) && (
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Dropdown — Quartos */}
        {openPanel === "quartos" && (
          <div className="absolute top-full mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-50 w-48"
               style={{ left: "calc(2 * (6rem + 0.5rem) + 5.5rem)" }}>
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">Quartos</p>
            <div className="flex gap-2 flex-wrap">
              {QUARTOS_OP.map((q) => (
                <button
                  key={q}
                  onClick={() => setQuartos(quartos === q ? "" : q)}
                  className={`w-11 h-11 rounded-xl text-sm font-medium border transition hover:cursor-pointer ${
                    quartos === q ? "bg-black border-black text-white" : "border-gray-200 text-zinc-600 hover:border-zinc-400"
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Dropdown — Preço */}
        {openPanel === "preco" && (
          <div className="absolute top-full mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-50 w-64"
               style={{ left: "calc(3 * (6rem + 0.5rem) + 8rem)" }}>
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">Preço (MZN/mês)</p>
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="text-xs text-zinc-400 mb-1 block">Mínimo</label>
                <input
                  type="number"
                  placeholder="5 000"
                  value={precoMin}
                  onChange={(e) => setPrecoMin(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-black transition"
                />
              </div>
              <div className="flex-1">
                <label className="text-xs text-zinc-400 mb-1 block">Máximo</label>
                <input
                  type="number"
                  placeholder="100 000"
                  value={precoMax}
                  onChange={(e) => setPrecoMax(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-black transition"
                />
              </div>
            </div>
          </div>
        )}

        {/* Dropdown — Mais filtros */}
        {openPanel === "mais" && (
          <div className="absolute top-full right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 p-5 z-50 w-[480px]">
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Filtros avançados</p>

            <div className="flex flex-col gap-5">
              {/* Casas de banho */}
              <div>
                <p className="text-sm font-semibold mb-2">Casas de banho</p>
                <div className="flex gap-2">
                  {BANHOS_OP.map((b) => (
                    <button
                      key={b}
                      onClick={() => setBanhos(banhos === b ? "" : b)}
                      className={`w-11 h-11 rounded-xl text-sm font-medium border transition hover:cursor-pointer ${
                        banhos === b ? "bg-black border-black text-white" : "border-gray-200 text-zinc-600 hover:border-zinc-400"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Área */}
              <div>
                <p className="text-sm font-semibold mb-2">Área mínima (m²)</p>
                <input
                  type="number"
                  placeholder="Ex: 50"
                  value={areaMin}
                  onChange={(e) => setAreaMin(e.target.value)}
                  className="w-40 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-black transition"
                />
              </div>

              {/* Comodidades */}
              <div>
                <p className="text-sm font-semibold mb-2">Comodidades</p>
                <div className="flex flex-wrap gap-2">
                  {COMODIDADES_OP.map((a) => (
                    <button
                      key={a}
                      onClick={() => toggleAm(a)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition hover:cursor-pointer ${
                        amenidades.includes(a)
                          ? "bg-mint border-mint text-black"
                          : "border-gray-200 text-zinc-600 hover:border-zinc-400"
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Grelha de resultados — largura total */}
      {resultados.length > 0 ? (
        <div className="grid grid-cols-3 gap-5 xl:grid-cols-4">
          {resultados.map((imovel) => (
            <ImovelCard key={imovel.id} imovel={imovel} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <Search className="size-14 text-zinc-200" />
          <p className="text-zinc-500 font-medium text-lg">Nenhum imóvel encontrado</p>
          <p className="text-sm text-zinc-400">Tenta ajustar os filtros acima</p>
          <button
            onClick={limpar}
            className="text-sm text-mint hover:underline hover:cursor-pointer font-medium"
          >
            Limpar todos os filtros
          </button>
        </div>
      )}
    </div>
  );
}
