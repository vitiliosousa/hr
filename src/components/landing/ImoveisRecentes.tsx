import ImovelCard from "@/components/ImovelCard";
import { imoveis } from "@/data/imoveis";
import Link from "next/link";

export default function ImoveisRecentes() {
  const recentes = imoveis.slice(3, 6);

  return (
    <section className="w-full bg-gray-50 py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <p className="text-xs font-semibold text-mint uppercase tracking-widest mb-2">Recém adicionados</p>
            <h2 className="text-xl sm:text-2xl font-bold">Imóveis recentes</h2>
            <p className="text-sm text-zinc-500 mt-1">Os últimos anúncios publicados na plataforma</p>
          </div>
          <Link href="/pesquisa" className="shrink-0">
            <button className="border border-gray-200 bg-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:shadow-sm transition hover:cursor-pointer">
              Ver todos os imóveis →
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentes.map((imovel) => (
            <ImovelCard key={imovel.id} imovel={imovel} />
          ))}
        </div>
      </div>
    </section>
  );
}
