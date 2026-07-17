import Image from "next/image";
import Link from "next/link";
import { BedDouble, Bath, Square, MapPin, Lock, ChevronLeft, Check, Images } from "lucide-react";
import { imoveis } from "@/data/imoveis";

export default function DetalheImovel({ params }: { params: { id: string } }) {
  const imovel = imoveis.find((i) => i.id === params.id) ?? imoveis[0];
  const fotos = imovel.fotos ?? [imovel.imagem];

  return (
    <div className="w-full flex flex-col pb-20">
      <div className="max-w-7xl mx-auto w-full px-10">
        {/* Topo: voltar + título */}
        <div className="py-6">
          <Link
            href="/pesquisa"
            className="flex items-center gap-1 text-sm text-zinc-500 hover:text-black transition mb-4"
          >
            <ChevronLeft className="size-4" /> Voltar à pesquisa
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-semibold">{imovel.titulo}</h1>
              <p className="text-zinc-500 flex items-center gap-1 mt-1.5 text-sm">
                <MapPin className="size-4" />
                {imovel.localizacao}
              </p>
            </div>
            <span className="bg-mint text-black text-xs font-semibold px-3 py-1.5 rounded-full mt-1">
              {imovel.tipo}
            </span>
          </div>
        </div>

        {/* Galeria estilo Airbnb */}
        <div className="relative grid grid-cols-[2fr_1fr_1fr] grid-rows-2 h-[480px] gap-2 overflow-hidden rounded-2xl">
          {/* Foto principal */}
          <div className="row-span-2 relative overflow-hidden">
            <Image
              src={fotos[0]}
              alt={imovel.titulo}
              fill
              className="object-cover hover:scale-105 transition duration-500"
              priority
            />
          </div>
          {/* 4 fotos pequenas */}
          {fotos.slice(1, 5).map((foto, i) => (
            <div key={i} className="relative overflow-hidden">
              <Image
                src={foto}
                alt={`${imovel.titulo} ${i + 2}`}
                fill
                className="object-cover hover:scale-105 transition duration-500"
              />
            </div>
          ))}
          {/* Botão ver todas */}
          <button className="absolute bottom-4 right-4 bg-white text-black text-xs font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 transition hover:cursor-pointer flex items-center gap-2">
            <Images className="size-4" /> Ver todas as fotos
          </button>
        </div>

        {/* Conteúdo + Sidebar */}
        <div className="flex gap-10 mt-10">
          {/* Coluna principal */}
          <div className="flex-1 flex flex-col gap-8">
            {/* Especificações */}
            <div className="flex gap-6 bg-white shadow-sm rounded-xl p-5 border border-gray-100">
              <div className="flex flex-col items-center gap-1 text-center min-w-[60px]">
                <BedDouble className="size-5 text-mint" />
                <p className="font-bold text-base">{imovel.quartos > 0 ? imovel.quartos : "—"}</p>
                <p className="text-xs text-zinc-400">Quartos</p>
              </div>
              <div className="w-px bg-gray-100" />
              <div className="flex flex-col items-center gap-1 text-center min-w-[60px]">
                <Bath className="size-5 text-mint" />
                <p className="font-bold text-base">{imovel.casasBanho}</p>
                <p className="text-xs text-zinc-400">Casas de banho</p>
              </div>
              <div className="w-px bg-gray-100" />
              <div className="flex flex-col items-center gap-1 text-center min-w-[60px]">
                <Square className="size-5 text-mint" />
                <p className="font-bold text-base">{imovel.area} m²</p>
                <p className="text-xs text-zinc-400">Área</p>
              </div>
              {imovel.andar > 0 && (
                <>
                  <div className="w-px bg-gray-100" />
                  <div className="flex flex-col items-center gap-1 text-center min-w-[60px]">
                    <p className="text-mint font-black text-lg leading-none">{imovel.andar}º</p>
                    <p className="font-bold text-base">Andar</p>
                    <p className="text-xs text-zinc-400">Piso</p>
                  </div>
                </>
              )}
            </div>

            {/* Descrição */}
            <div>
              <h2 className="font-semibold text-lg mb-3">Sobre este imóvel</h2>
              <p className="text-sm text-zinc-600 leading-relaxed">{imovel.descricao}</p>
            </div>

            {/* Comodidades */}
            <div>
              <h2 className="font-semibold text-lg mb-4">Comodidades</h2>
              <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                {imovel.amenidades.map((am, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-zinc-600">
                    <div className="w-5 h-5 rounded-full bg-mint/10 flex items-center justify-center flex-shrink-0">
                      <Check className="size-3 text-mint" />
                    </div>
                    {am}
                  </div>
                ))}
              </div>
            </div>

            {/* Localização placeholder */}
            <div>
              <h2 className="font-semibold text-lg mb-3">Localização</h2>
              <div className="bg-gray-100 rounded-xl h-48 flex items-center justify-center text-zinc-400 text-sm">
                <MapPin className="size-5 mr-2" />
                {imovel.localizacao}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-[340px] flex flex-col gap-4 self-start sticky top-24">
            <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col gap-5 border border-gray-100">
              <div>
                <p className="text-xs text-zinc-400 mb-1">Preço mensal</p>
                <p className="text-slamon text-3xl font-bold">
                  {imovel.preco.toLocaleString("pt-PT")}
                  <span className="text-sm font-normal text-zinc-400"> MZN/mês</span>
                </p>
              </div>

              <hr className="border-gray-100" />

              <div>
                <p className="text-sm font-semibold mb-3">Contacto do proprietário</p>
                <div className="relative bg-gray-50 rounded-xl p-4">
                  <div className="blur-sm select-none pointer-events-none">
                    <div className="flex flex-col gap-2.5 text-sm text-zinc-600">
                      <div className="flex items-center gap-2">
                        <span className="text-base">📞</span>
                        <span>+258 84 123 456</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-base">✉️</span>
                        <span>proprietario@gmail.com</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-base">👤</span>
                        <span>{imovel.proprietario.nome}</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5">
                    <div className="bg-white rounded-full p-2 shadow-sm">
                      <Lock className="size-5 text-zinc-500" />
                    </div>
                    <p className="text-xs text-zinc-500 font-medium">Contacto bloqueado</p>
                  </div>
                </div>
              </div>

              <Link href={`/imovel/${imovel.id}/desbloquear`}>
                <button className="w-full bg-mint text-black font-semibold text-sm py-3.5 rounded-xl hover:bg-mint/80 transition ease-in-out duration-300 hover:cursor-pointer">
                  🔓 Desbloquear contacto — 150 MZN
                </button>
              </Link>

              <p className="text-xs text-zinc-400 text-center leading-relaxed">
                Pagamento único. Acesso imediato ao contacto directo do proprietário.
              </p>
            </div>

            <button className="text-xs text-zinc-400 hover:text-zinc-600 text-center hover:underline hover:cursor-pointer transition">
              Reportar este anúncio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
