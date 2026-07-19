import Link from "next/link";
import { Search, Lock, Phone, Home, Camera, Eye, CheckCircle } from "lucide-react";

const passosProcura = [
  { icon: Search,      titulo: "Pesquisa",              desc: "Usa os filtros para encontrar imóveis por zona, tipo, preço e número de quartos." },
  { icon: Eye,         titulo: "Visualiza o anúncio",   desc: "Vê fotos, especificações, comodidades e localização — tudo sem criar conta." },
  { icon: Lock,        titulo: "Desbloqueia o contacto", desc: "Paga 25 MZN para ver o contacto directo do proprietário. Pagamento único, acesso permanente." },
  { icon: Phone,       titulo: "Entra em contacto",     desc: "Liga, envia WhatsApp ou email directamente ao proprietário. Sem intermediários." },
];

const passosAnuncio = [
  { icon: Home,        titulo: "Cria a tua conta",       desc: "Registo rápido com nome, email e telemóvel. Opcional: adiciona método de pagamento." },
  { icon: Camera,      titulo: "Publica o teu imóvel",   desc: "Preenche o formulário em 4 passos: localização, detalhes, comodidades e fotos." },
  { icon: Eye,         titulo: "Recebe visibilidade",    desc: "O teu anúncio fica visível para todos os utilizadores da plataforma imediatamente." },
  { icon: CheckCircle, titulo: "Interessados contactam", desc: "Quando alguém desbloquear o teu contacto, entras directamente em contacto com eles." },
];

export default function ComoFunciona() {
  return (
    <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-12 pb-20">
      {/* Hero */}
      <div className="text-center mb-14">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Como funciona o CasaJá?</h1>
        <p className="text-zinc-500 text-base max-w-xl mx-auto">
          A plataforma mais simples para encontrar ou publicar um imóvel em Moçambique.
          Sem comissões, sem intermediários.
        </p>
      </div>

      {/* Para quem procura */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-full bg-mint flex items-center justify-center text-sm font-bold shrink-0">1</div>
          <h2 className="text-xl font-bold">Para quem procura um imóvel</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {passosProcura.map(({ icon: Icon, titulo, desc }, i) => (
            <div key={titulo} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex gap-4">
              <div className="shrink-0 w-10 h-10 rounded-xl bg-mint/10 flex items-center justify-center relative">
                <Icon className="size-5 text-mint" />
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-mint text-black text-xs font-bold rounded-full flex items-center justify-center">
                  {i + 1}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-1">{titulo}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link href="/pesquisa">
            <button className="bg-mint text-black text-sm font-semibold px-6 py-3 rounded-xl hover:bg-mint/80 transition hover:cursor-pointer">
              Começar a pesquisar
            </button>
          </Link>
        </div>
      </section>

      {/* Para quem anuncia */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-full bg-zinc-800 text-white flex items-center justify-center text-sm font-bold shrink-0">2</div>
          <h2 className="text-xl font-bold">Para quem anuncia um imóvel</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {passosAnuncio.map(({ icon: Icon, titulo, desc }, i) => (
            <div key={titulo} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex gap-4">
              <div className="shrink-0 w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center relative">
                <Icon className="size-5 text-zinc-600" />
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-zinc-800 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {i + 1}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-1">{titulo}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link href="/publicar">
            <button className="bg-zinc-900 text-white text-sm font-semibold px-6 py-3 rounded-xl hover:bg-zinc-700 transition hover:cursor-pointer">
              Publicar o meu imóvel
            </button>
          </Link>
        </div>
      </section>

      {/* Pagamento */}
      <section className="bg-mint/5 border border-mint/20 rounded-2xl p-6 sm:p-8">
        <h2 className="text-lg font-bold mb-2">Como funciona o pagamento?</h2>
        <p className="text-sm text-zinc-600 leading-relaxed mb-4">
          Publicar um imóvel é <strong>gratuito</strong>. O CasaJá cobra apenas <strong>25 MZN</strong> ao interessado
          quando desbloqueia o contacto do proprietário. Este pagamento é único — o contacto fica guardado
          na conta do utilizador para sempre.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
          {[
            { label: "Publicar imóvel",          valor: "Grátis" },
            { label: "Desbloquear contacto",      valor: "25 MZN" },
            { label: "Acesso ao contacto",        valor: "Para sempre" },
          ].map(({ label, valor }) => (
            <div key={label} className="bg-white rounded-xl p-4 text-center border border-mint/20">
              <p className="text-xs text-zinc-500 mb-1">{label}</p>
              <p className="font-bold text-mint">{valor}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
