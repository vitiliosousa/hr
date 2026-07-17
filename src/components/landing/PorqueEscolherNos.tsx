import { Banknote, Users, Zap, ShieldCheck } from "lucide-react";

const razoes = [
  {
    icone: Banknote,
    titulo: "Publicação 100% gratuita",
    descricao: "Publica o teu imóvel sem pagar nada. Nunca cobraremos comissão pela publicação do teu anúncio.",
    cor: "bg-green-50 text-green-600",
  },
  {
    icone: Users,
    titulo: "Contacto directo",
    descricao: "Sem agências no meio. Proprietário e inquilino falam directamente, poupando tempo e dinheiro.",
    cor: "bg-blue-50 text-blue-600",
  },
  {
    icone: Zap,
    titulo: "Rápido e simples",
    descricao: "Cria o teu anúncio em menos de 5 minutos. A pesquisa com filtros avançados encontra o imóvel certo.",
    cor: "bg-purple-50 text-purple-600",
  },
  {
    icone: ShieldCheck,
    titulo: "Plataforma verificada",
    descricao: "Todos os anúncios são revistos pela nossa equipa. Reporta facilmente qualquer conteúdo suspeito.",
    cor: "bg-orange-50 text-orange-600",
  },
];

export default function PorqueEscolherNos() {
  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-7xl mx-auto px-10">
        <div className="flex flex-col items-center text-center mb-14">
          <p className="text-xs font-semibold text-mint uppercase tracking-widest mb-2">A nossa diferença</p>
          <h2 className="text-2xl font-bold">Porque escolher a CasaJá?</h2>
          <p className="text-sm text-zinc-500 mt-2 max-w-lg">
            Criámos a plataforma que queríamos ter quando andávamos à procura de casa em Moçambique.
          </p>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {razoes.map(({ icone: Icon, titulo, descricao, cor }) => (
            <div key={titulo} className="flex flex-col gap-4 p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow duration-300 bg-white group">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${cor} group-hover:scale-110 transition-transform duration-200`}>
                <Icon className="size-6" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-sm">{titulo}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{descricao}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
