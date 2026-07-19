import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, ExternalLink, MessageCircle, PhoneOff } from "lucide-react";
import { imoveis } from "@/data/imoveis";

const contactos = imoveis.slice(0, 3).map((im, i) => ({
  ...im,
  telefone: ["+258 84 123 4567", "+258 87 234 5678", "+258 82 345 6789"][i],
  whatsapp: ["+258841234567", "+258872345678", "+258823456789"][i],
  email: ["proprietario1@gmail.com", "casa.polana@gmail.com", "arrendamento@gmail.com"][i],
  data: ["15 Jul 2025", "10 Jul 2025", "3 Jul 2025"][i],
  valor: 25,
}));

export default function MeusContactos() {
  return (
    <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 pb-16">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Os meus contactos</h1>
        <p className="text-sm text-zinc-500 mt-1">
          Contactos que desbloqueaste — disponíveis para sempre
        </p>
      </div>

      {contactos.length > 0 ? (
        <div className="flex flex-col gap-4">
          {contactos.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              <div className="relative w-full h-36 sm:w-40 sm:h-auto shrink-0">
                <Image src={c.imagem} alt={c.titulo} fill className="object-cover" />
              </div>

              <div className="p-5 flex flex-col gap-4 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-sm">{c.titulo}</h3>
                    <p className="text-xs text-zinc-400 mt-0.5">{c.localizacao}</p>
                    <p className="text-xs text-zinc-400 mt-1">
                      Desbloqueado em <span className="font-medium text-zinc-600">{c.data}</span>
                      {" · "}
                      <span className="text-mint font-medium">{c.valor} MZN</span>
                    </p>
                  </div>
                  <Link href={`/imovel/${c.id}`} className="shrink-0">
                    <button className="flex items-center gap-1.5 text-xs border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition hover:cursor-pointer">
                      <ExternalLink className="size-3" /> Ver anúncio
                    </button>
                  </Link>
                </div>

                <div className="flex flex-wrap gap-2">
                  <a
                    href={`tel:${c.telefone}`}
                    className="flex items-center gap-1.5 text-xs bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg hover:bg-gray-100 transition font-medium"
                  >
                    <Phone className="size-3 text-mint" /> {c.telefone}
                  </a>
                  <a
                    href={`https://wa.me/${c.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-xs bg-green-50 border border-green-200 px-3 py-2 rounded-lg hover:bg-green-100 transition font-medium text-green-700"
                  >
                    <MessageCircle className="size-3" /> WhatsApp
                  </a>
                  <a
                    href={`mailto:${c.email}`}
                    className="flex items-center gap-1.5 text-xs bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg hover:bg-gray-100 transition font-medium"
                  >
                    <Mail className="size-3 text-mint" /> {c.email}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 gap-4 bg-white rounded-2xl border border-gray-100">
          <PhoneOff className="size-12 text-zinc-200" />
          <p className="text-zinc-500 font-medium">Ainda não desbloqueaste nenhum contacto</p>
          <p className="text-xs text-zinc-400 text-center max-w-xs">
            Quando desbloqueares o contacto de um proprietário, fica guardado aqui para sempre.
          </p>
          <Link href="/pesquisa">
            <button className="bg-mint text-black text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-mint/80 transition hover:cursor-pointer">
              Pesquisar imóveis
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
