import ImovelCard from "@/components/ImovelCard";
import { imoveis } from "@/data/imoveis";
import Link from "next/link";

export default function PlanYourPerfectTrip() {
  const destaques = imoveis.slice(0, 3);

  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-7xl mx-auto px-10">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-semibold text-mint uppercase tracking-widest mb-2">Selecção da equipa</p>
            <h2 className="text-2xl font-bold">Imóveis em destaque</h2>
            <p className="text-sm text-zinc-500 mt-1">Os imóveis mais bem avaliados da plataforma</p>
          </div>
          <Link href="/pesquisa">
            <button className="border border-gray-200 text-sm font-semibold px-5 py-2.5 rounded-xl hover:shadow-sm transition hover:cursor-pointer">
              Ver todos os imóveis →
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {destaques.map((imovel) => (
            <ImovelCard key={imovel.id} imovel={imovel} />
          ))}
        </div>
      </div>
    </section>
  );
}
