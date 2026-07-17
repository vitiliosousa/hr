"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Home, MapPin } from "lucide-react";

const slides = [
  {
    url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
    titulo: "Encontra a tua próxima casa",
    sub: "Sommerschield · Maputo",
  },
  {
    url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    titulo: "Vivenda com jardim e piscina",
    sub: "Polana Cimento · Maputo",
  },
  {
    url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
    titulo: "Apartamentos modernos e acessíveis",
    sub: "Matola · Maputo",
  },
];

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((p) => (p + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen w-full font-montserrat flex">
      {/* Coluna esquerda — formulário */}
      <div className="w-1/2 flex flex-col px-16 py-10 bg-white">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-black transition w-fit"
        >
          <Home className="size-4 text-mint" />
          <span className="text-blackish font-bold">CasaJá</span>
        </Link>

        <div className="flex-1 flex items-center justify-center">
          {children}
        </div>
      </div>

      {/* Coluna direita — slideshow de imóveis */}
      <div className="w-1/2 relative overflow-hidden bg-zinc-900">
        {slides.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${i === idx ? "opacity-100" : "opacity-0"}`}
            style={{ backgroundImage: `url(${s.url})`, backgroundSize: "cover", backgroundPosition: "center" }}
          />
        ))}

        {/* Overlay gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

        {/* Texto do slide */}
        <div className="absolute bottom-16 left-10 right-10">
          <div className="flex items-center gap-1.5 text-white/60 text-xs mb-2">
            <MapPin className="size-3" />
            <span>{slides[idx].sub}</span>
          </div>
          <h2 className="text-white text-2xl font-bold leading-snug">{slides[idx].titulo}</h2>
        </div>

        {/* Dots */}
        <div className="absolute bottom-8 left-10 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`h-1.5 rounded-full transition-all duration-300 hover:cursor-pointer ${
                i === idx ? "bg-mint w-6" : "bg-white/40 w-1.5"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
