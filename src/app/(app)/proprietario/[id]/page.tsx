import Image from "next/image";
import Link from "next/link";
import { User, Calendar, MessageSquare, ChevronLeft, Star } from "lucide-react";
import { imoveis } from "@/data/imoveis";
import ImovelCard from "@/components/ImovelCard";

const proprietariosMock: Record<string, {
  nome: string;
  telefone: string;
  email: string;
  membroDesde: string;
  taxaResposta: number;
  tempoResposta: string;
  verificado: boolean;
  bio: string;
}> = {
  default: {
    nome: "Carlos Nhantumbo",
    telefone: "+258 84 123 456",
    email: "carlos@gmail.com",
    membroDesde: "2023",
    taxaResposta: 94,
    tempoResposta: "< 1 hora",
    verificado: true,
    bio: "Proprietário com mais de 5 anos de experiência no arrendamento em Maputo e Matola. Sempre disponível para responder a questões.",
  },
};

export default async function ProprietarioPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const prop = proprietariosMock[id] ?? proprietariosMock.default;
  const anuncios = imoveis.slice(0, 4);

  return (
    <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 pb-20">
      <Link
        href="/pesquisa"
        className="flex items-center gap-1 text-sm text-zinc-500 hover:text-black transition w-fit mb-6"
      >
        <ChevronLeft className="size-4" /> Voltar à pesquisa
      </Link>

      {/* Perfil do proprietário */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 mb-8">
        <div className="flex flex-col sm:flex-row gap-6 sm:items-start">
          {/* Avatar */}
          <div className="shrink-0 flex flex-col items-center gap-2">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-zinc-100 flex items-center justify-center overflow-hidden">
              <User className="size-10 text-zinc-400" />
            </div>
            {prop.verificado && (
              <span className="text-xs bg-mint/10 text-mint font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                <Star className="size-3" /> Verificado
              </span>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold mb-1">{prop.nome}</h1>
            <p className="text-sm text-zinc-500 flex items-center gap-1.5 mb-4">
              <Calendar className="size-4" /> Membro desde {prop.membroDesde}
            </p>

            {prop.bio && (
              <p className="text-sm text-zinc-600 leading-relaxed mb-5">{prop.bio}</p>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { label: "Imóveis publicados", val: anuncios.length.toString() },
                { label: "Taxa de resposta",   val: `${prop.taxaResposta}%` },
                { label: "Tempo de resposta",  val: prop.tempoResposta },
              ].map(({ label, val }) => (
                <div key={label} className="bg-gray-50 rounded-xl p-3 text-center">
                  <p className="font-bold text-lg">{val}</p>
                  <p className="text-xs text-zinc-400 mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contactar — bloco lateral desktop */}
          <div className="w-full sm:w-auto sm:shrink-0 sm:min-w-[180px]">
            <Link href={`/contacto?proprietario=${id}`}>
              <button className="w-full flex items-center justify-center gap-2 bg-mint text-black text-sm font-semibold px-5 py-3 rounded-xl hover:bg-mint/80 transition hover:cursor-pointer">
                <MessageSquare className="size-4" /> Enviar mensagem
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Anúncios do proprietário */}
      <div>
        <h2 className="text-lg font-bold mb-5">
          Imóveis de {prop.nome.split(" ")[0]}
          <span className="text-sm font-normal text-zinc-400 ml-2">({anuncios.length})</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {anuncios.map((im) => (
            <ImovelCard key={im.id} imovel={im} />
          ))}
        </div>
      </div>
    </div>
  );
}
