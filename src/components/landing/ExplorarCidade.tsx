import Link from "next/link";

const cidades = [
  {
    nome: "Maputo",
    imoveis: 489,
    sub: "Capital do país",
    foto: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80",
  },
  {
    nome: "Matola",
    imoveis: 234,
    sub: "Cidade vizinha",
    foto: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80",
  },
  {
    nome: "Beira",
    imoveis: 156,
    sub: "2ª maior cidade",
    foto: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80",
  },
  {
    nome: "Nampula",
    imoveis: 98,
    sub: "Norte do país",
    foto: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80",
  },
  {
    nome: "Inhambane",
    imoveis: 67,
    sub: "Costa Sul",
    foto: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=600&q=80",
  },
  {
    nome: "Pemba",
    imoveis: 43,
    sub: "Costa Norte",
    foto: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80",
  },
];

export default function ExplorarCidade() {
  return (
    <section className="w-full bg-white py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-10">
        <div className="mb-8 sm:mb-10">
          <p className="text-xs font-semibold text-mint uppercase tracking-widest mb-2">Moçambique inteiro</p>
          <h2 className="text-xl sm:text-2xl font-bold">Explorar por cidade</h2>
          <p className="text-sm text-zinc-500 mt-1">Encontra o teu próximo lar em qualquer cidade do país</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Cidade grande (Maputo) — ocupa 2 linhas no desktop */}
          <Link href={`/pesquisa?cidade=${cidades[0].nome}`} className="sm:col-span-2 lg:col-span-1 lg:row-span-2 group">
            <div
              className="relative h-[200px] sm:h-[180px] lg:h-full lg:min-h-[280px] rounded-2xl overflow-hidden cursor-pointer"
              style={{ backgroundImage: `url(${cidades[0].foto})`, backgroundSize: "cover", backgroundPosition: "center" }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent group-hover:from-black/85 transition-all duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                <p className="text-white/60 text-xs mb-1">{cidades[0].sub}</p>
                <h3 className="text-white text-2xl sm:text-3xl font-bold">{cidades[0].nome}</h3>
                <p className="text-white/70 text-sm mt-1">{cidades[0].imoveis} imóveis disponíveis</p>
              </div>
            </div>
          </Link>

          {/* Restantes cidades */}
          {cidades.slice(1).map(({ nome, imoveis: count, sub, foto }) => (
            <Link key={nome} href={`/pesquisa?cidade=${nome}`} className="group">
              <div
                className="relative h-[140px] sm:h-[130px] rounded-2xl overflow-hidden cursor-pointer"
                style={{ backgroundImage: `url(${foto})`, backgroundSize: "cover", backgroundPosition: "center" }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent group-hover:from-black/85 transition-all duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
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
