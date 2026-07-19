import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Twitter, Linkedin, Mail } from "lucide-react";

const links = {
  arrendatarios: [
    { label: "Pesquisar imóveis",  href: "/pesquisa" },
    { label: "Como funciona",      href: "/como-funciona" },
    { label: "Perguntas frequentes", href: "/faq" },
    { label: "Os meus favoritos", href: "/favoritos" },
  ],
  proprietarios: [
    { label: "Publicar imóvel",    href: "/publicar" },
    { label: "Os meus anúncios",  href: "/meus-imoveis" },
    { label: "Os meus contactos", href: "/meus-contactos" },
  ],
  empresa: [
    { label: "Contacto",               href: "/contacto" },
    { label: "Como funciona",          href: "/como-funciona" },
    { label: "Política de privacidade", href: "#" },
    { label: "Termos de utilização",   href: "#" },
  ],
};

const sociais = [
  { Icon: Instagram, label: "Instagram" },
  { Icon: Facebook, label: "Facebook" },
  { Icon: Twitter, label: "Twitter" },
  { Icon: Linkedin, label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-zinc-900 text-white">
      {/* Newsletter */}
      <div className="border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-10 py-8 sm:py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5 sm:gap-6">
          <div className="min-w-0">
            <h3 className="text-base sm:text-lg font-semibold">Recebe os melhores imóveis</h3>
            <p className="text-sm text-zinc-400 mt-1">
              Alertas de novos imóveis na tua zona antes de toda a gente.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto md:min-w-[320px] md:max-w-md">
            <input
              type="email"
              placeholder="O teu email"
              className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-mint w-full md:w-64"
            />
            <button
              type="button"
              className="bg-mint text-black text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-mint/80 transition hover:cursor-pointer whitespace-nowrap w-full sm:w-auto"
            >
              Subscrever
            </button>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-10 py-10 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 w-fit">
              <Image src="/casaja.svg" alt="CasaJá" width={28} height={28} />
              <span className="font-bold text-lg">CasaJá</span>
            </Link>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">
              A plataforma mais simples para encontrar ou publicar um imóvel em Moçambique.
            </p>
            <div className="flex gap-3 mt-1">
              {sociais.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-mint hover:text-black transition"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="font-semibold text-sm mb-4">Para arrendatários</p>
            <ul className="flex flex-col gap-2.5">
              {links.arrendatarios.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-zinc-400 hover:text-white transition">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-semibold text-sm mb-4">Para proprietários</p>
            <ul className="flex flex-col gap-2.5">
              {links.proprietarios.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-zinc-400 hover:text-white transition">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-semibold text-sm mb-4">Empresa</p>
            <ul className="flex flex-col gap-2.5">
              {links.empresa.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-zinc-400 hover:text-white transition">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-center gap-2 text-zinc-400">
              <Mail className="size-4 shrink-0" />
              <a href="mailto:info@casaja.co.mz" className="text-xs hover:text-white transition break-all">
                info@casaja.co.mz
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-10 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-xs text-zinc-500">
            © {new Date().getFullYear()} CasaJá. Todos os direitos reservados.
          </p>
          <p className="text-xs text-zinc-600">Feito em Maputo</p>
        </div>
      </div>
    </footer>
  );
}
