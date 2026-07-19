"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, CheckCircle } from "lucide-react";

export default function Contacto() {
  const [enviado, setEnviado] = useState(false);
  const [form, setForm] = useState({ nome: "", email: "", assunto: "", mensagem: "" });

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nome || !form.email || !form.mensagem) return;
    setEnviado(true);
  };

  if (enviado) {
    return (
      <div className="max-w-md mx-auto w-full px-4 py-24 flex flex-col items-center gap-4 text-center">
        <div className="w-16 h-16 rounded-full bg-mint/10 flex items-center justify-center">
          <CheckCircle className="size-8 text-mint" />
        </div>
        <h2 className="text-xl font-bold">Mensagem enviada!</h2>
        <p className="text-sm text-zinc-500 leading-relaxed">
          Recebemos a tua mensagem. A nossa equipa responderá em até 24 horas para {form.email}.
        </p>
        <button
          onClick={() => { setEnviado(false); setForm({ nome: "", email: "", assunto: "", mensagem: "" }); }}
          className="text-sm text-mint font-semibold hover:underline hover:cursor-pointer mt-2"
        >
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-12 pb-20">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">Fala connosco</h1>
        <p className="text-zinc-500 text-base">Tens alguma dúvida ou sugestão? Estamos aqui para ajudar.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
        {/* Formulário */}
        <form onSubmit={enviar} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 flex flex-col gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-600">Nome completo *</label>
              <input
                type="text"
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
                placeholder="O teu nome"
                required
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-mint transition"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-600">Email *</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="o.teu@email.com"
                required
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-mint transition"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-600">Assunto</label>
            <select
              value={form.assunto}
              onChange={(e) => setForm({ ...form, assunto: e.target.value })}
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-mint transition bg-white"
            >
              <option value="">Selecciona um assunto</option>
              <option>Problema com um anúncio</option>
              <option>Problema com pagamento</option>
              <option>Sugestão</option>
              <option>Parceria</option>
              <option>Outro</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-600">Mensagem *</label>
            <textarea
              value={form.mensagem}
              onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
              placeholder="Escreve a tua mensagem aqui..."
              required
              rows={5}
              className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-mint transition resize-none"
            />
          </div>

          <button
            type="submit"
            className="bg-mint text-black font-bold text-sm py-3.5 rounded-xl hover:bg-mint/80 transition hover:cursor-pointer"
          >
            Enviar mensagem
          </button>
        </form>

        {/* Info de contacto */}
        <div className="flex flex-col gap-4">
          {[
            { icon: Mail,   titulo: "Email",      val: "suporte@casaja.co.mz", href: "mailto:suporte@casaja.co.mz" },
            { icon: Phone,  titulo: "Telemóvel",  val: "+258 84 000 000",       href: "tel:+25884000000" },
            { icon: MapPin, titulo: "Localização", val: "Maputo, Moçambique",   href: undefined },
          ].map(({ icon: Icon, titulo, val, href }) => (
            <div key={titulo} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-mint/10 flex items-center justify-center shrink-0">
                <Icon className="size-5 text-mint" />
              </div>
              <div>
                <p className="text-xs font-semibold text-zinc-400 mb-0.5">{titulo}</p>
                {href ? (
                  <a href={href} className="text-sm font-semibold hover:text-mint transition">{val}</a>
                ) : (
                  <p className="text-sm font-semibold">{val}</p>
                )}
              </div>
            </div>
          ))}

          <div className="bg-mint/5 border border-mint/20 rounded-2xl p-5">
            <p className="text-xs font-semibold text-mint mb-1">Horário de atendimento</p>
            <p className="text-sm text-zinc-600">Segunda a Sexta</p>
            <p className="text-sm font-semibold">08:00 – 17:00</p>
          </div>
        </div>
      </div>
    </div>
  );
}
