import Link from "next/link";
import { Building2, Home, BedSingle, Briefcase, Store, TreePine, Warehouse, Landmark } from "lucide-react";

const categorias = [
  { nome: "Apartamento", icone: Building2, count: 342, href: "/pesquisa?tipo=Apartamento", bg: "bg-blue-50", cor: "text-blue-600" },
  { nome: "Casa",        icone: Home,       count: 215, href: "/pesquisa?tipo=Casa",        bg: "bg-green-50", cor: "text-green-600" },
  { nome: "Vivenda",     icone: Landmark,   count: 89,  href: "/pesquisa?tipo=Vivenda",     bg: "bg-purple-50", cor: "text-purple-600" },
  { nome: "Quarto",      icone: BedSingle,  count: 178, href: "/pesquisa?tipo=Quarto",      bg: "bg-orange-50", cor: "text-orange-600" },
  { nome: "Escritório",  icone: Briefcase,  count: 56,  href: "/pesquisa?tipo=Escritório",  bg: "bg-pink-50", cor: "text-pink-600" },
  { nome: "Loja",        icone: Store,      count: 41,  href: "/pesquisa?tipo=Loja",        bg: "bg-yellow-50", cor: "text-yellow-600" },
  { nome: "Armazém",     icone: Warehouse,  count: 29,  href: "/pesquisa?tipo=Armazém",     bg: "bg-slate-50", cor: "text-slate-600" },
  { nome: "Terreno",     icone: TreePine,   count: 43,  href: "/pesquisa?tipo=Terreno",     bg: "bg-emerald-50", cor: "text-emerald-600" },
];

export default function Categorias() {
  return (
    <section className="w-full bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-10">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-semibold text-mint uppercase tracking-widest mb-2">Navega por categoria</p>
            <h2 className="text-2xl font-bold">Tipo de imóvel</h2>
          </div>
          <Link href="/pesquisa" className="text-sm font-semibold text-zinc-500 hover:text-black transition">
            Ver todos →
          </Link>
        </div>

        <div className="grid grid-cols-4 gap-4 lg:grid-cols-8">
          {categorias.map(({ nome, icone: Icon, count, href, bg, cor }) => (
            <Link key={nome} href={href}>
              <div className="bg-white rounded-2xl p-5 flex flex-col items-center gap-3 text-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 border border-gray-100 cursor-pointer group">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${bg} group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className={`size-5 ${cor}`} />
                </div>
                <div>
                  <p className="font-semibold text-xs text-black">{nome}</p>
                  <p className="text-[10px] text-zinc-400 mt-0.5">{count} imóveis</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
