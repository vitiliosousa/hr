"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X, User, ChevronDown, Home, Phone, Heart, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const navLinks = [
  { href: "/pesquisa", label: "Pesquisar" },
  { href: "/publicar", label: "Publicar imóvel" },
];

const menuUsuario = [
  { href: "/meus-imoveis",   label: "Os meus imóveis",  Icon: Home },
  { href: "/conta",          label: "Minha conta",       Icon: User },
  { href: "/meus-contactos", label: "Contactos",         Icon: Phone },
  { href: "/favoritos",      label: "Favoritos",         Icon: Heart },
];

export default function Header() {
  const router = useRouter();
  const [open, setOpen]           = useState(false);   // mobile menu
  const [dropOpen, setDropOpen]   = useState(false);   // user dropdown
  const [loggedIn, setLoggedIn]   = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  // Lê o estado de auth do localStorage (simulação)
  useEffect(() => {
    setLoggedIn(localStorage.getItem("casaja_auth") === "true");
  }, []);

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Fecha menu mobile com Escape + bloqueia scroll
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const logout = () => {
    localStorage.removeItem("casaja_auth");
    setLoggedIn(false);
    setDropOpen(false);
    setOpen(false);
    router.push("/");
  };

  // Simulação: clicar em "Entrar" faz login directo (sem ir para a página)
  const simularLogin = () => {
    localStorage.setItem("casaja_auth", "true");
    setLoggedIn(true);
    setOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-100 w-full sticky top-0 z-50">
      <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-10 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0" onClick={() => setOpen(false)}>
          <Image src="/casaja.svg" alt="CasaJá" width={28} height={28} />
          <span className="font-bold text-base tracking-tight text-blackish">CasaJá</span>
        </Link>

        {/* Nav central — desktop */}
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

        {/* Direita — desktop */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          {loggedIn ? (
            <div className="relative" ref={dropRef}>
              <button
                onClick={() => setDropOpen((v) => !v)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-50 transition hover:cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-mint/10 flex items-center justify-center">
                  <User className="size-4 text-mint" />
                </div>
                <span className="text-sm font-semibold text-zinc-700">A minha conta</span>
                <ChevronDown className={`size-4 text-zinc-400 transition-transform duration-200 ${dropOpen ? "rotate-180" : ""}`} />
              </button>

              {dropOpen && (
                <div className="absolute right-0 top-12 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 w-52 z-50">
                  {menuUsuario.map(({ href, label, Icon }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setDropOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-700 hover:bg-gray-50 transition"
                    >
                      <Icon className="size-4 text-zinc-400" /> {label}
                    </Link>
                  ))}
                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition hover:cursor-pointer"
                    >
                      <LogOut className="size-4" /> Sair
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                onClick={simularLogin}
                className="text-sm font-semibold text-zinc-700 hover:text-black px-4 py-2 rounded-lg hover:bg-gray-50 transition-all duration-150 hover:cursor-pointer"
              >
                Entrar
              </button>
              <Link
                href="/registar"
                className="bg-mint text-black text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-mint/80 transition-colors duration-150"
              >
                Criar conta
              </Link>
            </>
          )}
        </div>

        {/* Hamburger — mobile */}
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

      {/* Menu mobile */}
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

          {loggedIn ? (
            <>
              <div className="border-t border-gray-100 mt-2 pt-3 flex flex-col gap-1">
                {menuUsuario.map(({ href, label, Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 text-sm font-medium text-zinc-700 hover:bg-gray-50 px-4 py-3 rounded-lg transition"
                  >
                    <Icon className="size-4 text-zinc-400" /> {label}
                  </Link>
                ))}
                <button
                  onClick={logout}
                  className="flex items-center gap-3 text-sm font-medium text-red-500 hover:bg-red-50 px-4 py-3 rounded-lg transition hover:cursor-pointer"
                >
                  <LogOut className="size-4" /> Sair
                </button>
              </div>
            </>
          ) : (
            <div className="border-t border-gray-100 mt-2 pt-3 flex flex-col gap-2">
              <button
                onClick={simularLogin}
                className="w-full text-sm font-semibold text-zinc-700 hover:text-black px-4 py-3 rounded-lg hover:bg-gray-50 transition-all duration-150 text-left hover:cursor-pointer"
              >
                Entrar
              </button>
              <Link
                href="/registar"
                onClick={() => setOpen(false)}
                className="w-full text-center bg-mint text-black text-sm font-bold px-5 py-3 rounded-xl hover:bg-mint/80 transition-colors duration-150"
              >
                Criar conta
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
