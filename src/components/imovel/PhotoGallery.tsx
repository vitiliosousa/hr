"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Images } from "lucide-react";

interface Props {
  fotos: string[];
  titulo: string;
}

export default function PhotoGallery({ fotos, titulo }: Props) {
  const [index, setIndex]   = useState<number | null>(null); // null = fechado

  const open  = (i: number) => setIndex(i);
  const close = () => setIndex(null);
  const prev  = useCallback(() => setIndex((i) => (i === null ? 0 : (i - 1 + fotos.length) % fotos.length)), [fotos.length]);
  const next  = useCallback(() => setIndex((i) => (i === null ? 0 : (i + 1) % fotos.length)), [fotos.length]);

  // Teclado: ← → Escape
  useEffect(() => {
    if (index === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape")     close();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [index, prev, next]);

  return (
    <>
      {/* ── Galeria mobile / tablet ── */}
      <div className="relative lg:hidden rounded-2xl overflow-hidden">
        <button
          onClick={() => open(0)}
          className="relative w-full h-[280px] sm:h-[360px] block hover:cursor-pointer"
        >
          <Image src={fotos[0]} alt={titulo} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition" />
        </button>

        {fotos.length > 1 && (
          <div className="flex gap-1.5 mt-1.5 overflow-x-auto">
            {fotos.slice(1, 5).map((foto, i) => (
              <button
                key={i}
                onClick={() => open(i + 1)}
                className="relative h-20 w-28 sm:h-24 sm:w-36 shrink-0 overflow-hidden rounded-lg hover:cursor-pointer"
              >
                <Image src={foto} alt={`${titulo} foto ${i + 2}`} fill className="object-cover hover:scale-105 transition duration-300" />
              </button>
            ))}
          </div>
        )}

        <button
          onClick={() => open(0)}
          className="absolute top-3 right-3 bg-white text-black text-xs font-semibold px-3 py-2 rounded-lg shadow-md flex items-center gap-1.5 hover:bg-gray-50 transition hover:cursor-pointer"
        >
          <Images className="size-3.5" /> Ver fotos ({fotos.length})
        </button>
      </div>

      {/* ── Grelha desktop (estilo Airbnb) ── */}
      <div className="relative hidden lg:grid grid-cols-[2fr_1fr_1fr] grid-rows-2 h-[480px] gap-2 overflow-hidden rounded-2xl">
        {/* Foto principal */}
        <button
          onClick={() => open(0)}
          className="row-span-2 relative overflow-hidden hover:cursor-pointer"
        >
          <Image
            src={fotos[0]}
            alt={titulo}
            fill
            className="object-cover hover:scale-105 transition duration-500"
            priority
          />
          <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition duration-300" />
        </button>

        {/* Restantes 4 */}
        {Array.from({ length: 4 }).map((_, i) => {
          const foto = fotos[i + 1];
          if (!foto) {
            return (
              <div key={i} className="relative overflow-hidden bg-zinc-100" />
            );
          }
          return (
            <button
              key={i}
              onClick={() => open(i + 1)}
              className="relative overflow-hidden hover:cursor-pointer"
            >
              <Image
                src={foto}
                alt={`${titulo} foto ${i + 2}`}
                fill
                className="object-cover hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition duration-300" />
            </button>
          );
        })}

        {/* Botão "Ver todas as fotos" */}
        <button
          onClick={() => open(0)}
          className="absolute bottom-4 right-4 bg-white text-black text-xs font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-gray-50 transition hover:cursor-pointer flex items-center gap-2"
        >
          <Images className="size-4" /> Ver todas as fotos ({fotos.length})
        </button>
      </div>

      {/* ── Modal full-screen ── */}
      {index !== null && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col select-none">

          {/* Barra superior */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-4 shrink-0">
            <p className="text-white text-sm font-semibold">
              {index + 1} / {fotos.length}
            </p>
            <p className="text-white/60 text-xs hidden sm:block truncate max-w-xs text-center">{titulo}</p>
            <button
              onClick={close}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition hover:cursor-pointer"
              aria-label="Fechar galeria"
            >
              <X className="size-5 text-white" />
            </button>
          </div>

          {/* Foto principal */}
          <div className="flex-1 relative flex items-center justify-center px-4 sm:px-16 min-h-0">
            {/* Seta esquerda */}
            <button
              onClick={prev}
              className="absolute left-2 sm:left-4 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition hover:cursor-pointer shrink-0"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="size-5 sm:size-6 text-white" />
            </button>

            <div className="relative w-full h-full max-w-5xl">
              <Image
                key={index}
                src={fotos[index]}
                alt={`${titulo} — foto ${index + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            {/* Seta direita */}
            <button
              onClick={next}
              className="absolute right-2 sm:right-4 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition hover:cursor-pointer shrink-0"
              aria-label="Próxima foto"
            >
              <ChevronRight className="size-5 sm:size-6 text-white" />
            </button>
          </div>

          {/* Thumbnails */}
          <div className="shrink-0 px-4 py-4 flex gap-2 justify-center overflow-x-auto">
            {fotos.map((foto, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden shrink-0 transition hover:cursor-pointer ${
                  i === index
                    ? "ring-2 ring-white opacity-100"
                    : "opacity-50 hover:opacity-80"
                }`}
              >
                <Image src={foto} alt={`miniatura ${i + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
