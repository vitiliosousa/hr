"use client";

import { useState, useRef, useEffect } from "react";
import { Share2, Copy, CheckCheck, MessageCircle, Facebook, Instagram } from "lucide-react";

export default function ShareButton({ titulo, id }: { titulo: string; id: string }) {
  const [open, setOpen] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const url = typeof window !== "undefined" ? `${window.location.origin}/imovel/${id}` : `/imovel/${id}`;
  const texto = `Encontrei este imóvel no CasaJá: ${titulo}`;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const copiar = async () => {
    await navigator.clipboard.writeText(url);
    setCopiado(true);
    setTimeout(() => { setCopiado(false); setOpen(false); }, 1500);
  };

  const opcoes = [
    {
      label: copiado ? "Copiado!" : "Copiar link",
      Icon: copiado ? CheckCheck : Copy,
      onClick: copiar,
      classes: "text-zinc-700",
    },
    {
      label: "WhatsApp",
      Icon: MessageCircle,
      onClick: () => window.open(`https://wa.me/?text=${encodeURIComponent(`${texto} ${url}`)}`),
      classes: "text-green-600",
    },
    {
      label: "Facebook",
      Icon: Facebook,
      onClick: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`),
      classes: "text-blue-600",
    },
    {
      label: "Instagram",
      Icon: Instagram,
      onClick: () => window.open(`https://www.instagram.com/`),
      classes: "text-pink-500",
    },
  ];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-black border border-gray-200 px-3 py-2 rounded-lg hover:bg-gray-50 transition hover:cursor-pointer"
      >
        <Share2 className="size-3.5" /> Partilhar
      </button>

      {open && (
        <div className="absolute right-0 top-9 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 w-44 z-30">
          {opcoes.map(({ label, Icon, onClick, classes }) => (
            <button
              key={label}
              onClick={onClick}
              className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-gray-50 transition hover:cursor-pointer ${classes}`}
            >
              <Icon className="size-4" /> {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
