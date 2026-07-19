import ImovelCard from "@/components/ImovelCard";
import { imoveis } from "@/data/imoveis";
import { Heart } from "lucide-react";
import Link from "next/link";

const favoritos = imoveis.slice(0, 2);

export default function FavoritosTab() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">Favoritos</h2>
      {favoritos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favoritos.map((imovel) => (
            <ImovelCard key={imovel.id} imovel={imovel} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 gap-3 bg-white rounded-2xl border border-gray-100">
          <Heart className="size-10 text-zinc-200" />
          <p className="text-sm text-zinc-500 font-medium">Ainda não tens favoritos</p>
          <p className="text-xs text-zinc-400">Guarda imóveis que goste para encontrá-los mais facilmente</p>
          <Link href="/pesquisa">
            <button className="bg-mint text-black text-xs font-semibold px-4 py-2 rounded-lg hover:bg-mint/80 transition hover:cursor-pointer">
              Pesquisar imóveis
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
