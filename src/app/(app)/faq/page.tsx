"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs: { pergunta: string; resposta: string; categoria: string }[] = [
  {
    categoria: "Geral",
    pergunta: "O que é o CasaJá?",
    resposta: "O CasaJá é uma plataforma moçambicana para arrendar imóveis. Liga directamente proprietários e inquilinos, sem intermediários nem comissões de agência.",
  },
  {
    categoria: "Geral",
    pergunta: "O CasaJá funciona em toda Moçambique?",
    resposta: "Sim. Podes publicar e procurar imóveis em qualquer cidade ou província do país — Maputo, Matola, Beira, Nampula, Quelimane, entre outras.",
  },
  {
    categoria: "Para inquilinos",
    pergunta: "Preciso de criar uma conta para ver os anúncios?",
    resposta: "Não. Qualquer pessoa pode pesquisar e ver os detalhes dos imóveis — fotos, localização, preço e comodidades — sem criar conta. Só precisas de conta para desbloquear o contacto do proprietário.",
  },
  {
    categoria: "Para inquilinos",
    pergunta: "Quanto custa desbloquear um contacto?",
    resposta: "Apenas 25 MZN por contacto. É um pagamento único: o contacto fica guardado na tua conta para sempre, podes consultar quando quiseres.",
  },
  {
    categoria: "Para inquilinos",
    pergunta: "Como é feito o pagamento?",
    resposta: "Aceitamos M-Pesa, e-Mola e cartão de débito/crédito. O processo é rápido e seguro.",
  },
  {
    categoria: "Para inquilinos",
    pergunta: "Onde ficam guardados os contactos que desbloquei?",
    resposta: "Em \"A minha conta\" › \"Contactos\". Podes aceder a qualquer momento, mesmo após a publicação expirar.",
  },
  {
    categoria: "Para proprietários",
    pergunta: "Publicar um imóvel é gratuito?",
    resposta: "Sim. Publicar é completamente grátis. Só cobramos ao inquilino quando desbloqueia o teu contacto.",
  },
  {
    categoria: "Para proprietários",
    pergunta: "Durante quanto tempo fica activo o meu anúncio?",
    resposta: "Os anúncios ficam activos durante 90 dias. Podes renová-los gratuitamente após esse período.",
  },
  {
    categoria: "Para proprietários",
    pergunta: "Posso pausar ou remover o meu anúncio?",
    resposta: "Sim. No painel \"Os meus imóveis\" podes alterar o estado do anúncio para Pausado (fica oculto na pesquisa) ou removê-lo permanentemente a qualquer momento.",
  },
  {
    categoria: "Para proprietários",
    pergunta: "O que é o destaque?",
    resposta: "O destaque é um serviço opcional que coloca o teu imóvel no topo dos resultados de pesquisa. Tens três opções: 7 dias (150 MZN), 30 dias (450 MZN) ou 90 dias (1 200 MZN).",
  },
  {
    categoria: "Para proprietários",
    pergunta: "Como sei se alguém desbloqueou o meu contacto?",
    resposta: "No painel dos teus imóveis aparece o número total de contactos desbloqueados. Em breve adicionaremos notificações por SMS e email.",
  },
  {
    categoria: "Segurança",
    pergunta: "Como reporto um anúncio suspeito?",
    resposta: "Em cada página de imóvel encontras o botão \"Denunciar\". Selecciona o motivo e envia — a nossa equipa analisa em menos de 24 horas.",
  },
  {
    categoria: "Segurança",
    pergunta: "Os meus dados estão seguros?",
    resposta: "Sim. O teu número e email são mostrados apenas a quem paga para desbloquear o contacto. Não partilhamos dados com terceiros.",
  },
];

const categorias = ["Todos", ...Array.from(new Set(faqs.map((f) => f.categoria)))];

export default function FAQ() {
  const [cat, setCat] = useState("Todos");
  const [aberto, setAberto] = useState<number | null>(null);

  const lista = cat === "Todos" ? faqs : faqs.filter((f) => f.categoria === cat);

  return (
    <div className="max-w-2xl mx-auto w-full px-4 sm:px-6 py-12 pb-20">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">Perguntas frequentes</h1>
        <p className="text-zinc-500 text-base">Não encontras o que procuras? <a href="/contacto" className="text-mint font-semibold hover:underline">Entra em contacto</a>.</p>
      </div>

      {/* Filtros de categoria */}
      <div className="flex gap-2 flex-wrap mb-8 justify-center">
        {categorias.map((c) => (
          <button
            key={c}
            onClick={() => { setCat(c); setAberto(null); }}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition hover:cursor-pointer ${
              cat === c
                ? "bg-mint text-black border-mint"
                : "bg-white text-zinc-500 border-gray-200 hover:border-gray-300"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Acordeão */}
      <div className="flex flex-col divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm">
        {lista.map((faq, i) => (
          <div key={i}>
            <button
              onClick={() => setAberto(aberto === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition hover:cursor-pointer gap-4"
            >
              <span className="text-sm font-semibold">{faq.pergunta}</span>
              <ChevronDown
                className={`size-4 text-zinc-400 shrink-0 transition-transform duration-200 ${aberto === i ? "rotate-180" : ""}`}
              />
            </button>
            {aberto === i && (
              <div className="px-5 pb-5">
                <p className="text-sm text-zinc-500 leading-relaxed">{faq.resposta}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
