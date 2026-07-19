import Image from "next/image";
import Link from "next/link";
import {
  BedDouble, Bath, Square, MapPin, Lock, ChevronLeft,
  Check, Images, Layers, Calendar,
} from "lucide-react";
import { imoveis } from "@/data/imoveis";
import ImovelCard from "@/components/ImovelCard";
import ShareButton from "@/components/imovel/ShareButton";
import ReportModal from "@/components/imovel/ReportModal";

export default async function DetalheImovel({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const imovel = imoveis.find((i) => i.id === id) ?? imoveis[0];
  const fotos = imovel.fotos ?? [imovel.imagem];

  const dataFormatada = new Date(imovel.dataPublicacao).toLocaleDateString("pt-PT", {
    day: "numeric", month: "long", year: "numeric",
  });

  const destaque = imoveis.filter((i) => i.id !== imovel.id).slice(0, 4);

  return (
    <div className="w-full flex flex-col pb-28 lg:pb-24">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-10">

        {/* Topo */}
        <div className="py-5 sm:py-6 flex flex-col gap-4">
          <Link
            href="/pesquisa"
            className="flex items-center gap-1 text-sm text-zinc-500 hover:text-black transition w-fit"
          >
            <ChevronLeft className="size-4" /> Voltar à pesquisa
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
            <div className="flex flex-col gap-1.5 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-mint text-black text-xs font-bold px-3 py-1 rounded-full">
                  {imovel.tipo}
                </span>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  imovel.disponivel
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}>
                  {imovel.disponivel ? "● Disponível" : "● Alugado"}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-blackish">{imovel.titulo}</h1>
              <p className="text-zinc-500 flex items-center gap-1.5 text-sm">
                <MapPin className="size-4 flex-shrink-0" />
                {imovel.localizacao}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <p className="text-xs text-zinc-400">Publicado a {dataFormatada}</p>
              <ShareButton titulo={imovel.titulo} id={imovel.id} />
            </div>
          </div>
        </div>

        {/* Galeria */}
        {/* Mobile / tablet: foto principal + miniaturas */}
        <div className="relative lg:hidden rounded-2xl overflow-hidden">
          <div className="relative h-[280px] sm:h-[360px]">
            <Image
              src={fotos[0]}
              alt={imovel.titulo}
              fill
              className="object-cover"
              priority
            />
          </div>
          {fotos.length > 1 && (
            <div className="flex gap-1.5 mt-1.5 overflow-x-auto">
              {fotos.slice(1, 5).map((foto, i) => (
                <div key={i} className="relative h-20 w-28 sm:h-24 sm:w-36 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={foto}
                    alt={`${imovel.titulo} foto ${i + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
          <button className="absolute top-3 right-3 bg-white text-black text-xs font-semibold px-3 py-2 rounded-lg shadow-md flex items-center gap-1.5">
            <Images className="size-3.5" /> Ver fotos
          </button>
        </div>

        {/* Desktop: grelha Airbnb */}
        <div className="relative hidden lg:grid grid-cols-[2fr_1fr_1fr] grid-rows-2 h-[480px] gap-2 overflow-hidden rounded-2xl">
          <div className="row-span-2 relative overflow-hidden">
            <Image
              src={fotos[0]}
              alt={imovel.titulo}
              fill
              className="object-cover hover:scale-105 transition duration-500"
              priority
            />
          </div>
          {fotos.slice(1, 5).map((foto, i) => (
            <div key={i} className="relative overflow-hidden">
              <Image
                src={foto}
                alt={`${imovel.titulo} foto ${i + 2}`}
                fill
                className="object-cover hover:scale-105 transition duration-500"
              />
            </div>
          ))}
          <button className="absolute bottom-4 right-4 bg-white text-black text-xs font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-gray-50 transition hover:cursor-pointer flex items-center gap-2">
            <Images className="size-4" /> Ver todas as fotos
          </button>
        </div>

        {/* Pills de especificações rápidas */}
        <div className="flex items-center gap-2 sm:gap-3 mt-5 sm:mt-6 flex-wrap">
          {[
            { icon: Square,   val: `${imovel.area} m²`,                              label: "Área" },
            { icon: BedDouble, val: imovel.quartos > 0 ? `${imovel.quartos} quartos` : "Estúdio", label: "Quartos" },
            { icon: Bath,     val: `${imovel.casasBanho} WC`,                        label: "Casas de banho" },
            ...(imovel.andar > 0 ? [{ icon: Layers, val: `${imovel.andar}º andar`, label: "Piso" }] : []),
          ].map(({ icon: Icon, val }) => (
            <div key={val} className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold shadow-sm">
              <Icon className="size-4 text-mint" />
              {val}
            </div>
          ))}
        </div>

        {/* Conteúdo + Sidebar */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 mt-6 sm:mt-8">

          {/* Coluna principal */}
          <div className="flex-1 flex flex-col gap-8 sm:gap-10 min-w-0">

            {/* Descrição */}
            <section>
              <h2 className="font-bold text-lg mb-3">Sobre este imóvel</h2>
              <p className="text-sm text-zinc-600 leading-relaxed">{imovel.descricao}</p>
            </section>

            <hr className="border-gray-100" />

            {/* Detalhes */}
            <section>
              <h2 className="font-bold text-lg mb-5">Detalhes</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { label: "Tipo de imóvel",   val: imovel.tipo },
                  { label: "Área total",        val: `${imovel.area} m²` },
                  { label: "Quartos",           val: imovel.quartos > 0 ? imovel.quartos : "Estúdio" },
                  { label: "Casas de banho",    val: imovel.casasBanho },
                  { label: "Piso",              val: imovel.andar > 0 ? `${imovel.andar}º andar` : "Rés-do-chão" },
                  { label: "Localização",       val: imovel.localizacao },
                ].map(({ label, val }) => (
                  <div key={label} className="bg-gray-50 rounded-xl p-3 sm:p-4 flex flex-col gap-1 min-w-0">
                    <p className="text-xs text-zinc-400 font-medium">{label}</p>
                    <p className="text-sm font-semibold text-zinc-900 break-words">{val}</p>
                  </div>
                ))}
              </div>
            </section>

            <hr className="border-gray-100" />

            {/* Comodidades */}
            <section>
              <h2 className="font-bold text-lg mb-5">Comodidades</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-4">
                {imovel.amenidades.map((am) => (
                  <div key={am} className="flex items-center gap-2.5 text-sm text-zinc-700">
                    <div className="w-5 h-5 rounded-full bg-mint/15 flex items-center justify-center flex-shrink-0">
                      <Check className="size-3 text-mint" />
                    </div>
                    {am}
                  </div>
                ))}
              </div>
            </section>

            <hr className="border-gray-100" />

            {/* Disponibilidade */}
            <section>
              <h2 className="font-bold text-lg mb-5">Disponibilidade</h2>
              <div className="flex items-center gap-4">
                <div className={`flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-xl text-sm font-semibold ${
                  imovel.disponivel
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-red-50 text-red-600 border border-red-200"
                }`}>
                  <Calendar className="size-4 shrink-0" />
                  {imovel.disponivel ? "Disponível imediatamente" : "Actualmente alugado"}
                </div>
              </div>
            </section>

            <hr className="border-gray-100" />

            {/* Localização */}
            <section>
              <h2 className="font-bold text-lg mb-4">Localização</h2>
              <div className="bg-gray-100 rounded-2xl h-44 sm:h-52 flex flex-col items-center justify-center gap-2 text-zinc-400 px-4 text-center">
                <MapPin className="size-6" />
                <p className="text-sm font-medium">{imovel.localizacao}</p>
                <p className="text-xs">Mapa em breve</p>
              </div>
            </section>
          </div>

          {/* Sidebar — desktop sticky; mobile no fluxo */}
          <div className="w-full lg:w-[340px] flex-shrink-0 flex flex-col gap-3 lg:self-start lg:sticky lg:top-24">
            <div className="bg-white shadow-lg rounded-2xl p-5 sm:p-6 flex flex-col gap-5 border border-gray-100">

              {/* Preço */}
              <div>
                <p className="text-xs text-zinc-400 mb-0.5 font-medium">Preço mensal</p>
                <p className="text-mint text-2xl sm:text-3xl font-bold">
                  {imovel.preco.toLocaleString("pt-PT")}
                  <span className="text-sm font-normal text-zinc-400"> MZN/mês</span>
                </p>
              </div>

              <hr className="border-gray-100" />

              {/* Informações rápidas */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Tipo",    val: imovel.tipo },
                  { label: "Área",    val: `${imovel.area} m²` },
                  { label: "Quartos", val: imovel.quartos > 0 ? imovel.quartos : "Estúdio" },
                  { label: "WC",      val: imovel.casasBanho },
                ].map(({ label, val }) => (
                  <div key={label}>
                    <p className="text-xs text-zinc-400">{label}</p>
                    <p className="text-sm font-semibold">{val}</p>
                  </div>
                ))}
              </div>

              <hr className="border-gray-100" />

              {/* Contacto bloqueado */}
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
                      <Lock className="size-4 text-zinc-500" />
                    </div>
                    <p className="text-xs text-zinc-500 font-medium">Contacto bloqueado</p>
                  </div>
                </div>
              </div>

              {/* CTA — escondido no mobile (barra fixa em baixo) */}
              <Link href={`/imovel/${imovel.id}/desbloquear`} className="hidden lg:block">
                <button className="w-full bg-mint text-black font-bold text-sm py-3.5 rounded-xl hover:bg-mint/80 transition duration-200 hover:cursor-pointer">
                  Desbloquear contacto — 25 MZN
                </button>
              </Link>

              <p className="hidden lg:block text-xs text-zinc-400 text-center leading-relaxed -mt-2">
                Pagamento único. Acesso imediato ao contacto directo do proprietário.
              </p>
            </div>

            <div className="flex justify-center">
              <ReportModal />
            </div>
          </div>
        </div>
      </div>

      {/* Imóveis em destaque */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-10 mt-12 sm:mt-16">
        <div className="flex items-end justify-between mb-6 gap-4">
          <div>
            <p className="text-xs font-semibold text-mint uppercase tracking-widest mb-1">Poderá gostar</p>
            <h2 className="text-lg sm:text-xl font-bold">Imóveis em destaque</h2>
          </div>
          <Link href="/pesquisa" className="text-sm font-semibold text-mint hover:underline shrink-0">
            Ver todos →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {destaque.map((im) => (
            <ImovelCard key={im.id} imovel={im} />
          ))}
        </div>
      </div>

      {/* Barra CTA fixa no mobile */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-gray-100 px-4 py-3 flex items-center justify-between gap-4 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <div className="min-w-0">
          <p className="text-mint font-bold text-base truncate">
            {imovel.preco.toLocaleString("pt-PT")} <span className="text-xs font-normal text-zinc-400">MZN/mês</span>
          </p>
        </div>
        <Link href={`/imovel/${imovel.id}/desbloquear`} className="shrink-0">
          <button className="bg-mint text-black font-bold text-xs sm:text-sm px-4 py-3 rounded-xl hover:bg-mint/80 transition hover:cursor-pointer whitespace-nowrap">
            Desbloquear — 25 MZN
          </button>
        </Link>
      </div>
    </div>
  );
}
