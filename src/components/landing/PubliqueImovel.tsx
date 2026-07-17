import Link from "next/link";
import { ArrowRight, BadgeCheck, Coins, TrendingUp } from "lucide-react";

const beneficios = [
  { icone: BadgeCheck, texto: "Publicação 100% gratuita" },
  { icone: Coins,      texto: "Recebe 150 MZN por cada contacto desbloqueado" },
  { icone: TrendingUp, texto: "Anúncio visível para milhares de utilizadores" },
];

export default function PubliqueImovel() {
  return (
    <section className="w-full bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-10">
        <div className="bg-zinc-900 rounded-3xl overflow-hidden">
          <div className="flex items-center gap-0">
            {/* Conteúdo */}
            <div className="flex-1 p-14 flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <p className="text-mint text-xs font-semibold uppercase tracking-widest">Para senhorios</p>
                <h2 className="text-3xl font-bold text-white leading-snug">
                  Tens um imóvel<br />para alugar?
                </h2>
                <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
                  Publica o teu anúncio gratuitamente e chega a centenas de interessados.
                  Só pagas quando alguém quer falar contigo — e esse valor vai directamente para ti.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                {beneficios.map(({ icone: Icon, texto }) => (
                  <div key={texto} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-mint/15 flex items-center justify-center flex-shrink-0">
                      <Icon className="size-4 text-mint" />
                    </div>
                    <p className="text-zinc-300 text-sm">{texto}</p>
                  </div>
                ))}
              </div>

              <Link href="/publicar">
                <button className="inline-flex items-center gap-2 bg-mint text-black font-bold px-7 py-3.5 rounded-xl hover:bg-mint/80 transition hover:cursor-pointer text-sm">
                  Publicar imóvel grátis <ArrowRight className="size-4" />
                </button>
              </Link>
            </div>

            {/* Visual decorativo */}
            <div className="w-80 h-full min-h-[400px] flex-shrink-0 relative flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-l from-mint/5 to-transparent" />
              <div className="relative z-10 flex flex-col gap-4 p-8">
                {[
                  { label: "Imóveis publicados hoje", valor: "+24", cor: "text-mint" },
                  { label: "Contactos desbloqueados", valor: "187", cor: "text-white" },
                  { label: "Média MZN / imóvel", valor: "1.350", cor: "text-green-400" },
                ].map(({ label, valor, cor }) => (
                  <div key={label} className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4">
                    <p className={`text-2xl font-bold ${cor}`}>{valor}</p>
                    <p className="text-zinc-500 text-xs mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
