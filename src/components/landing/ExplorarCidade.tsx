import Link from "next/link";

const cidades = [
  { nome: "Maputo",     imoveis: 489, from: "from-zinc-700",   to: "to-zinc-900",   sub: "Capital do país" },
  { nome: "Matola",     imoveis: 234, from: "from-blue-600",   to: "to-blue-900",   sub: "Cidade vizinha" },
  { nome: "Beira",      imoveis: 156, from: "from-orange-500", to: "to-orange-800", sub: "2ª maior cidade" },
  { nome: "Nampula",    imoveis: 98,  from: "from-purple-600", to: "to-purple-900", sub: "Norte do país" },
  { nome: "Inhambane",  imoveis: 67,  from: "from-teal-500",   to: "to-teal-800",   sub: "Costa Sul" },
  { nome: "Pemba",      imoveis: 43,  from: "from-rose-500",   to: "to-rose-800",   sub: "Costa Norte" },
];

export default function ExplorarCidade() {
  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-7xl mx-auto px-10">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-semibold text-mint uppercase tracking-widest mb-2">Moçambique inteiro</p>
            <h2 className="text-2xl font-bold">Explorar por cidade</h2>
            <p className="text-sm text-zinc-500 mt-1">Encontra o teu próximo lar em qualquer cidade do país</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* Cidade grande (Maputo) */}
          <Link href={`/pesquisa?cidade=${cidades[0].nome}`} className="row-span-2 group">
            <div className={`relative h-full min-h-[280px] rounded-2xl bg-gradient-to-br ${cidades[0].from} ${cidades[0].to} overflow-hidden flex flex-col justify-end p-6 cursor-pointer hover:shadow-xl transition-shadow duration-300`}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-black/10 transition-opacity duration-300" />
              <div className="relative z-10">
                <p className="text-white/60 text-xs mb-1">{cidades[0].sub}</p>
                <h3 className="text-white text-3xl font-bold">{cidades[0].nome}</h3>
                <p className="text-white/70 text-sm mt-1">{cidades[0].imoveis} imóveis disponíveis</p>
              </div>
            </div>
          </Link>

          {/* Restantes cidades */}
          {cidades.slice(1).map(({ nome, imoveis: count, from, to, sub }) => (
            <Link key={nome} href={`/pesquisa?cidade=${nome}`} className="group">
              <div className={`relative h-[130px] rounded-2xl bg-gradient-to-br ${from} ${to} overflow-hidden flex flex-col justify-end p-5 cursor-pointer hover:shadow-xl transition-shadow duration-300`}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-black/10 transition-opacity duration-300" />
                <div className="relative z-10">
                  <p className="text-white/60 text-[10px] mb-0.5">{sub}</p>
                  <h3 className="text-white text-lg font-bold">{nome}</h3>
                  <p className="text-white/60 text-xs">{count} imóveis</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
