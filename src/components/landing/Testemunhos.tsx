import { Star } from "lucide-react";

const testemunhos = [
  {
    nome: "Maria João Nhantumbo",
    papel: "Inquilina · Maputo",
    texto:
      "Encontrei o meu apartamento na Polana em menos de 48 horas. O processo foi incrivelmente simples — pesquisei, vi as fotos, paguei para desbloquear o contacto e falámos logo a seguir. Sem agências, sem stress.",
    estrelas: 5,
    inicial: "M",
    cor: "bg-purple-100 text-purple-700",
  },
  {
    nome: "Carlos Sitoe",
    papel: "Proprietário · Matola",
    texto:
      "Publiquei o meu imóvel gratuitamente e recebi 12 contactos na primeira semana. Cada desbloqueio representa um interessado real. Já aluguei dois imóveis através da CasaJá e recomendo a todos os proprietários.",
    estrelas: 5,
    inicial: "C",
    cor: "bg-blue-100 text-blue-700",
  },
  {
    nome: "Ana Machava",
    papel: "Inquilina · Beira",
    texto:
      "Moro na Beira e estava com dificuldade em encontrar opções online. A CasaJá tinha imóveis da minha cidade com fotos reais e preços claros. Finalmente uma plataforma que funciona fora de Maputo.",
    estrelas: 5,
    inicial: "A",
    cor: "bg-green-100 text-green-700",
  },
];

function Estrelas({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} className="size-4 text-yellow-400 fill-yellow-400" />
      ))}
    </div>
  );
}

export default function Testemunhos() {
  return (
    <section className="w-full bg-white py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <p className="text-xs font-semibold text-mint uppercase tracking-widest mb-2">O que dizem de nós</p>
            <h2 className="text-xl sm:text-2xl font-bold">Testemunhos</h2>
            <p className="text-sm text-zinc-500 mt-1">Experiências reais de utilizadores da CasaJá</p>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-zinc-500">
            <Estrelas n={5} />
            <span className="font-semibold text-black">4.9</span>
            <span>· 200+ avaliações</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {testemunhos.map(({ nome, papel, texto, estrelas, inicial, cor }) => (
            <div key={nome} className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-7 flex flex-col gap-5 shadow-sm hover:shadow-md transition-shadow duration-300">
              <Estrelas n={estrelas} />
              <p className="text-sm text-zinc-600 leading-relaxed flex-1">&ldquo;{texto}&rdquo;</p>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${cor}`}>
                  {inicial}
                </div>
                <div>
                  <p className="font-semibold text-sm text-black">{nome}</p>
                  <p className="text-xs text-zinc-400">{papel}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
