import { Home } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-100 w-full h-16 flex items-center sticky top-0 z-50">
      <div className="max-w-7xl mx-auto w-full px-10 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Home className="size-5 text-mint" />
          <span className="font-bold text-base tracking-tight text-blackish">CasaJá</span>
        </Link>

        {/* Navegação central */}
        <nav className="flex items-center gap-1">
          <Link
            href="/pesquisa"
            className="text-sm font-medium text-zinc-600 hover:text-black hover:bg-gray-50 px-4 py-2 rounded-lg transition-all duration-150"
          >
            Pesquisar
          </Link>
          <Link
            href="/publicar"
            className="text-sm font-medium text-zinc-600 hover:text-black hover:bg-gray-50 px-4 py-2 rounded-lg transition-all duration-150"
          >
            Publicar imóvel
          </Link>
          <Link
            href="/#como-funciona"
            className="text-sm font-medium text-zinc-600 hover:text-black hover:bg-gray-50 px-4 py-2 rounded-lg transition-all duration-150"
          >
            Como funciona
          </Link>
        </nav>

        {/* Autenticação */}
        <div className="flex items-center gap-2">
          <Link href="/entrar">
            <button className="text-sm font-semibold text-zinc-700 hover:text-black px-4 py-2 rounded-lg hover:bg-gray-50 transition-all duration-150 hover:cursor-pointer">
              Entrar
            </button>
          </Link>
          <Link href="/registar">
            <button className="bg-mint text-black text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-mint/80 transition-colors duration-150 hover:cursor-pointer">
              Criar conta
            </button>
          </Link>
        </div>

      </div>
    </header>
  );
}
