"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "/pesquisa", label: "Pesquisar" },
  { href: "/publicar", label: "Publicar imóvel" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="bg-white border-b border-gray-100 w-full sticky top-0 z-50">
      <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-10 h-16 flex items-center justify-between gap-4">

        <Link href="/" className="flex items-center gap-2 shrink-0" onClick={() => setOpen(false)}>
          <Image src="/casaja.svg" alt="CasaJá" width={28} height={28} />
          <span className="font-bold text-base tracking-tight text-blackish">CasaJá</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium text-zinc-600 hover:text-black hover:bg-gray-50 px-4 py-2 rounded-lg transition-all duration-150"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2 shrink-0">
          <Link
            href="/entrar"
            className="text-sm font-semibold text-zinc-700 hover:text-black px-4 py-2 rounded-lg hover:bg-gray-50 transition-all duration-150"
          >
            Entrar
          </Link>
          <Link
            href="/registar"
            className="bg-mint text-black text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-mint/80 transition-colors duration-150"
          >
            Criar conta
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden p-2 -mr-2 rounded-lg hover:bg-gray-50 transition hover:cursor-pointer"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <X className="size-5 text-zinc-700" /> : <Menu className="size-5 text-zinc-700" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 flex flex-col gap-1 shadow-lg">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-zinc-600 hover:text-black hover:bg-gray-50 px-4 py-3 rounded-lg transition-all duration-150"
            >
              {label}
            </Link>
          ))}
          <div className="border-t border-gray-100 mt-2 pt-3 flex flex-col gap-2">
            <Link
              href="/entrar"
              onClick={() => setOpen(false)}
              className="w-full text-sm font-semibold text-zinc-700 hover:text-black px-4 py-3 rounded-lg hover:bg-gray-50 transition-all duration-150"
            >
              Entrar
            </Link>
            <Link
              href="/registar"
              onClick={() => setOpen(false)}
              className="w-full text-center bg-mint text-black text-sm font-bold px-5 py-3 rounded-xl hover:bg-mint/80 transition-colors duration-150"
            >
              Criar conta
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
