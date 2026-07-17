"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft, CheckCircle, Lock, Phone, CreditCard,
  User, Mail, ShieldCheck, BedDouble, Bath, Square,
} from "lucide-react";
import { imoveis } from "@/data/imoveis";

type Metodo = "mpesa" | "cartao";
type Estado = "idle" | "sucesso";

export default function Desbloquear({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const imovel = imoveis.find((i) => i.id === id) ?? imoveis[0];

  const [metodo, setMetodo] = useState<Metodo>("mpesa");
  const [estado, setEstado] = useState<Estado>("idle");
  const [telefone, setTelefone] = useState("");
  const [cardNum, setCardNum] = useState("");
  const [validade, setValidade] = useState("");
  const [cvc, setCvc] = useState("");

  /* ── Ecrã de sucesso ── */
  if (estado === "sucesso") {
    return (
      <div className="w-full py-16 pb-24">
        <div className="max-w-7xl mx-auto w-full px-10 flex flex-col items-center gap-8 text-center">
          <div className="bg-green-50 rounded-full p-5">
            <CheckCircle className="size-16 text-green-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Contacto desbloqueado!</h1>
            <p className="text-sm text-zinc-500 mt-2 leading-relaxed">
              Já podes contactar directamente o proprietário de{" "}
              <strong className="text-black">{imovel.titulo}</strong>
            </p>
          </div>

          <div className="bg-white shadow-sm rounded-2xl p-6 w-full max-w-sm flex flex-col gap-3 border border-gray-100">
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider text-left">
              Dados do proprietário
            </p>
            {[
              { icon: User,  label: "Nome",      val: imovel.proprietario.nome },
              { icon: Phone, label: "Telemóvel", val: "+258 84 123 456" },
              { icon: Mail,  label: "Email",     val: "proprietario@gmail.com" },
            ].map(({ icon: Icon, label, val }) => (
              <div key={label} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3.5">
                <div className="w-9 h-9 rounded-full bg-mint/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="size-4 text-mint" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-zinc-400">{label}</p>
                  <p className="text-sm font-semibold">{val}</p>
                </div>
              </div>
            ))}
          </div>

          <Link href={`/imovel/${imovel.id}`}>
            <button className="border border-gray-200 text-black text-sm font-semibold px-8 py-3 rounded-xl hover:bg-gray-50 transition hover:cursor-pointer">
              Voltar ao imóvel
            </button>
          </Link>
        </div>
      </div>
    );
  }

  /* ── Formulário de pagamento ── */
  return (
    <div className="w-full py-8 pb-24">
      <div className="max-w-7xl mx-auto w-full px-10 flex flex-col gap-6">

        {/* Breadcrumb */}
        <Link
          href={`/imovel/${imovel.id}`}
          className="flex items-center gap-1.5 text-sm font-medium text-zinc-500 hover:text-black transition w-fit"
        >
          <ChevronLeft className="size-4" /> Voltar ao imóvel
        </Link>

        <div>
          <h1 className="text-2xl font-bold">Desbloquear contacto</h1>
          <p className="text-sm text-zinc-500 mt-1">
            Pagamento único para acederes directamente ao proprietário
          </p>
        </div>

        {/* Layout de duas colunas */}
        <div className="flex gap-8 items-start">

          {/* ── Coluna esquerda: resumo ── */}
          <div className="flex-1 flex flex-col gap-5">

            {/* Card do imóvel */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="relative w-full h-52">
                <Image
                  src={imovel.fotos?.[0] ?? imovel.imagem}
                  alt={imovel.titulo}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute bottom-3 left-3 bg-mint text-black text-xs font-bold px-2.5 py-1 rounded-full">
                  {imovel.tipo}
                </span>
              </div>
              <div className="p-5">
                <h2 className="font-bold text-base">{imovel.titulo}</h2>
                <p className="text-sm text-zinc-500 mt-1">{imovel.localizacao}</p>
                <div className="flex items-center gap-4 mt-3 text-xs text-zinc-500">
                  <span className="flex items-center gap-1">
                    <BedDouble className="size-3.5" />
                    {imovel.quartos > 0 ? `${imovel.quartos} quartos` : "Estúdio"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath className="size-3.5" />
                    {imovel.casasBanho} WC
                  </span>
                  <span className="flex items-center gap-1">
                    <Square className="size-3.5" />
                    {imovel.area} m²
                  </span>
                </div>
              </div>
            </div>

            {/* Resumo do pedido */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-4">
              <p className="font-bold text-sm">Resumo do pedido</p>

              <div className="flex flex-col gap-2 text-sm">
                <div className="flex items-center justify-between text-zinc-600">
                  <span>Aluguer mensal do imóvel</span>
                  <span className="font-semibold">{imovel.preco.toLocaleString("pt-PT")} MZN/mês</span>
                </div>
                <div className="flex items-center justify-between text-zinc-600">
                  <span>Desbloqueio de contacto</span>
                  <span className="font-semibold text-mint">150 MZN</span>
                </div>
              </div>

              <hr className="border-gray-100" />

              <div className="flex items-center justify-between">
                <span className="text-sm font-bold">Total a pagar agora</span>
                <span className="text-xl font-bold text-mint">150 MZN</span>
              </div>
            </div>

            {/* Garantias */}
            <div className="flex flex-col gap-3">
              {[
                { icon: ShieldCheck, texto: "Pagamento único — sem subscrições ou cobranças futuras" },
                { icon: Lock,        texto: "Contacto revelado imediatamente após o pagamento" },
                { icon: CheckCircle, texto: "Se não receberes resposta, reembolsamos na totalidade" },
              ].map(({ icon: Icon, texto }) => (
                <div key={texto} className="flex items-start gap-3 text-xs text-zinc-500">
                  <Icon className="size-4 text-mint flex-shrink-0 mt-0.5" />
                  {texto}
                </div>
              ))}
            </div>
          </div>

          {/* ── Coluna direita: pagamento ── */}
          <div className="w-[480px] flex-shrink-0 flex flex-col gap-5">

            {/* Valor destacado */}
            <div className="bg-mint/5 rounded-2xl p-5 flex items-center justify-between border border-mint/20">
              <div className="flex items-center gap-3">
                <div className="bg-mint/20 rounded-full p-2.5">
                  <Lock className="size-5 text-black" />
                </div>
                <div>
                  <p className="font-bold text-sm">Desbloquear contacto</p>
                  <p className="text-xs text-zinc-500">Acesso imediato · Pagamento único</p>
                </div>
              </div>
              <p className="text-3xl font-bold text-mint">150 MZN</p>
            </div>

            {/* Método de pagamento */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-5">
              <p className="font-bold text-sm">Método de pagamento</p>

              <div className="flex gap-3">
                {([
                  { key: "mpesa",  icon: Phone,      label: "M-Pesa" },
                  { key: "cartao", icon: CreditCard, label: "Cartão bancário" },
                ] as { key: Metodo; icon: typeof Phone; label: string }[]).map(({ key, icon: Icon, label }) => (
                  <button
                    key={key}
                    onClick={() => setMetodo(key)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 text-sm font-semibold transition hover:cursor-pointer ${
                      metodo === key
                        ? "border-mint bg-mint/5 text-black"
                        : "border-gray-200 text-zinc-500 hover:border-gray-300"
                    }`}
                  >
                    <Icon className="size-4" /> {label}
                  </button>
                ))}
              </div>

              {metodo === "mpesa" ? (
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                    Número M-Pesa
                  </label>
                  <input
                    type="tel"
                    placeholder="84 123 456"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    className="w-full h-12 border border-gray-200 rounded-xl px-4 text-sm outline-none focus:border-black transition"
                  />
                  <p className="text-xs text-zinc-400">
                    Receberás um pedido de confirmação no teu telemóvel
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                      Número do cartão
                    </label>
                    <input
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      value={cardNum}
                      onChange={(e) => setCardNum(e.target.value)}
                      className="w-full h-12 border border-gray-200 rounded-xl px-4 text-sm outline-none focus:border-black transition"
                    />
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-1 flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                        Validade
                      </label>
                      <input
                        type="text"
                        placeholder="MM/AA"
                        value={validade}
                        onChange={(e) => setValidade(e.target.value)}
                        className="w-full h-12 border border-gray-200 rounded-xl px-4 text-sm outline-none focus:border-black transition"
                      />
                    </div>
                    <div className="w-32 flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                        CVC
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value)}
                        className="w-full h-12 border border-gray-200 rounded-xl px-4 text-sm outline-none focus:border-black transition"
                      />
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={() => setEstado("sucesso")}
                className="w-full bg-mint text-black font-bold text-sm py-4 rounded-xl hover:bg-mint/80 transition duration-200 hover:cursor-pointer"
              >
                Pagar 150 MZN e desbloquear contacto
              </button>

              <p className="text-xs text-zinc-400 text-center">
                Pagamento encriptado e seguro. Não armazenamos dados do cartão.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
