import Image from "next/image";
import Link from "next/link";
import {
  BedDouble, Bath, Square, MapPin, Lock, ChevronLeft,
  Check, Images, Car, Layers, Calendar, Wifi, Droplets,
  Zap, Wind, TreePine,
} from "lucide-react";
import { imoveis } from "@/data/imoveis";
import ImovelCard from "@/components/ImovelCard";

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
    <div className="w-full flex flex-col pb-24">
      <div className="max-w-7xl mx-auto w-full px-10">

        {/* Topo */}
        <div className="py-6 flex flex-col gap-4">
          <Link
            href="/pesquisa"
            className="flex items-center gap-1 text-sm text-zinc-500 hover:text-black transition w-fit"
          >
            <ChevronLeft className="size-4" /> Voltar à pesquisa
          </Link>

          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-1.5">
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
              <h1 className="text-2xl font-bold text-blackish">{imovel.titulo}</h1>
              <p className="text-zinc-500 flex items-center gap-1.5 text-sm">
                <MapPin className="size-4 flex-shrink-0" />
                {imovel.localizacao}
              </p>
            </div>
            <p className="text-xs text-zinc-400 flex-shrink-0">
              Publicado a {dataFormatada}
            </p>
          </div>
        </div>

        {/* Galeria estilo Airbnb */}
        <div className="relative grid grid-cols-[2fr_1fr_1fr] grid-rows-2 h-[480px] gap-2 overflow-hidden rounded-2xl">
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
        <div className="flex items-center gap-3 mt-6 flex-wrap">
          {[
            { icon: Square,   val: `${imovel.area} m²`,                              label: "Área" },
            { icon: BedDouble, val: imovel.quartos > 0 ? `${imovel.quartos} quartos` : "Estúdio", label: "Quartos" },
            { icon: Bath,     val: `${imovel.casasBanho} WC`,                        label: "Casas de banho" },
            ...(imovel.andar > 0 ? [{ icon: Layers, val: `${imovel.andar}º andar`, label: "Piso" }] : []),
          ].map(({ icon: Icon, val }) => (
            <div key={val} className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold shadow-sm">
              <Icon className="size-4 text-mint" />
              {val}
            </div>
          ))}
        </div>

        {/* Conteúdo + Sidebar */}
        <div className="flex gap-10 mt-8">

          {/* Coluna principal */}
          <div className="flex-1 flex flex-col gap-10 min-w-0">

            {/* Descrição */}
            <section>
              <h2 className="font-bold text-lg mb-3">Sobre este imóvel</h2>
              <p className="text-sm text-zinc-600 leading-relaxed">{imovel.descricao}</p>
            </section>

            <hr className="border-gray-100" />

            {/* Detalhes */}
            <section>
              <h2 className="font-bold text-lg mb-5">Detalhes</h2>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Tipo de imóvel",   val: imovel.tipo },
                  { label: "Área total",        val: `${imovel.area} m²` },
                  { label: "Quartos",           val: imovel.quartos > 0 ? imovel.quartos : "Estúdio" },
                  { label: "Casas de banho",    val: imovel.casasBanho },
                  { label: "Piso",              val: imovel.andar > 0 ? `${imovel.andar}º andar` : "Rés-do-chão" },
                  { label: "Localização",       val: imovel.localizacao },
                ].map(({ label, val }) => (
                  <div key={label} className="bg-gray-50 rounded-xl p-4 flex flex-col gap-1">
                    <p className="text-xs text-zinc-400 font-medium">{label}</p>
                    <p className="text-sm font-semibold text-zinc-900">{val}</p>
                  </div>
                ))}
              </div>
            </section>

            <hr className="border-gray-100" />

            {/* Comodidades */}
            <section>
              <h2 className="font-bold text-lg mb-5">Comodidades</h2>
              <div className="grid grid-cols-3 gap-y-3 gap-x-4">
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
                <div className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-semibold ${
                  imovel.disponivel
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-red-50 text-red-600 border border-red-200"
                }`}>
                  <Calendar className="size-4" />
                  {imovel.disponivel ? "Disponível imediatamente" : "Actualmente alugado"}
                </div>
              </div>
            </section>

            <hr className="border-gray-100" />

            {/* Localização */}
            <section>
              <h2 className="font-bold text-lg mb-4">Localização</h2>
              <div className="bg-gray-100 rounded-2xl h-52 flex flex-col items-center justify-center gap-2 text-zinc-400">
                <MapPin className="size-6" />
                <p className="text-sm font-medium">{imovel.localizacao}</p>
                <p className="text-xs">Mapa em breve</p>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="w-[340px] flex-shrink-0 flex flex-col gap-3 self-start sticky top-24">
            <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col gap-5 border border-gray-100">

              {/* Preço */}
              <div>
                <p className="text-xs text-zinc-400 mb-0.5 font-medium">Preço mensal</p>
                <p className="text-mint text-3xl font-bold">
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

              {/* CTA */}
              <Link href={`/imovel/${imovel.id}/desbloquear`}>
                <button className="w-full bg-mint text-black font-bold text-sm py-3.5 rounded-xl hover:bg-mint/80 transition duration-200 hover:cursor-pointer">
                  Desbloquear contacto — 150 MZN
                </button>
              </Link>

              <p className="text-xs text-zinc-400 text-center leading-relaxed -mt-2">
                Pagamento único. Acesso imediato ao contacto directo do proprietário.
              </p>
            </div>

            <button className="text-xs text-zinc-400 hover:text-zinc-600 text-center hover:underline hover:cursor-pointer transition">
              Reportar este anúncio
            </button>
          </div>
        </div>
      </div>

      {/* Imóveis em destaque */}
      <div className="max-w-7xl mx-auto w-full px-10 mt-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs font-semibold text-mint uppercase tracking-widest mb-1">Poderá gostar</p>
            <h2 className="text-xl font-bold">Imóveis em destaque</h2>
          </div>
          <Link href="/pesquisa" className="text-sm font-semibold text-mint hover:underline">
            Ver todos →
          </Link>
        </div>
        <div className="grid grid-cols-4 gap-5">
          {destaque.map((im) => (
            <ImovelCard key={im.id} imovel={im} />
          ))}
        </div>
      </div>
    </div>
  );
}
