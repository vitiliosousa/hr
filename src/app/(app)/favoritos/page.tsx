import ImovelCard from "@/components/ImovelCard";
import { imoveis } from "@/data/imoveis";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function Favoritos() {
  const favoritos = imoveis.slice(0, 2);

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-4/5 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Os meus favoritos</h1>
            <p className="text-sm text-zinc-500 mt-1">
              {favoritos.length} imóveis guardados
            </p>
          </div>
        </div>

        {favoritos.length > 0 ? (
          <div className="grid grid-cols-3 gap-6">
            {favoritos.map((imovel) => (
              <ImovelCard key={imovel.id} imovel={imovel} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Heart className="size-12 text-zinc-200" />
            <p className="text-zinc-500 font-medium">Ainda não tens favoritos</p>
            <p className="text-xs text-zinc-400">
              Guarda imóveis que goste para encontrá-los mais facilmente
            </p>
            <Link href="/pesquisa">
              <button className="bg-mint text-black text-xs font-semibold px-4 py-2 rounded-lg hover:bg-mint/80 transition hover:cursor-pointer">
                Pesquisar imóveis
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
