import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, ExternalLink, MessageCircle } from "lucide-react";
import { imoveis } from "@/data/imoveis";

const contactos = imoveis.slice(0, 3).map((im, i) => ({
  ...im,
  telefone: ["+258 84 123 4567", "+258 87 234 5678", "+258 82 345 6789"][i],
  whatsapp: ["+258841234567", "+258872345678", "+258823456789"][i],
  email: ["proprietario1@gmail.com", "casa.polana@gmail.com", "arrendamento@gmail.com"][i],
  data: ["15 Jul 2025", "10 Jul 2025", "3 Jul 2025"][i],
}));

export default function HistoryTab() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">Histórico de contactos</h2>
      <div className="flex flex-col gap-3">
        {contactos.map((c) => (
          <div key={c.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row overflow-hidden">
            <div className="relative w-full h-32 sm:w-36 sm:h-auto shrink-0">
              <Image src={c.imagem} alt={c.titulo} fill className="object-cover" />
            </div>
            <div className="p-5 flex flex-col gap-3 flex-1">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-sm">{c.titulo}</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">Desbloqueado em {c.data}</p>
                </div>
                <Link href={`/imovel/${c.id}`} className="shrink-0">
                  <button className="flex items-center gap-1 text-xs text-zinc-500 hover:text-black transition hover:cursor-pointer">
                    <ExternalLink className="size-3" /> Ver anúncio
                  </button>
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                <a
                  href={`tel:${c.telefone}`}
                  className="flex items-center gap-1.5 text-xs bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition"
                >
                  <Phone className="size-3 text-mint" /> {c.telefone}
                </a>
                <a
                  href={`https://wa.me/${c.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-xs bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition"
                >
                  <MessageCircle className="size-3 text-mint" /> WhatsApp
                </a>
                <a
                  href={`mailto:${c.email}`}
                  className="flex items-center gap-1.5 text-xs bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition"
                >
                  <Mail className="size-3 text-mint" /> {c.email}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
