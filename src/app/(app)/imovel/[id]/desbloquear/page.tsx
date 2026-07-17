"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, CheckCircle, Lock, Phone, CreditCard } from "lucide-react";
import { imoveis } from "@/data/imoveis";
import { FloatingLabelInput } from "@/components/FloatingLabelInput";

type Metodo = "mpesa" | "cartao";
type Estado = "idle" | "sucesso";

export default function Desbloquear({ params }: { params: { id: string } }) {
  const imovel = imoveis.find((i) => i.id === params.id) ?? imoveis[0];
  const [metodo, setMetodo] = useState<Metodo>("mpesa");
  const [estado, setEstado] = useState<Estado>("idle");

  const pagar = () => {
    setEstado("sucesso");
  };

  if (estado === "sucesso") {
    return (
      <div className="w-full flex flex-col items-center py-16">
        <div className="w-[480px] flex flex-col items-center gap-6 text-center">
          <div className="bg-mint/10 rounded-full p-6">
            <CheckCircle className="size-14 text-mint" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Contacto desbloqueado!</h1>
            <p className="text-sm text-zinc-500 mt-2">
              Já podes contactar diretamente o proprietário de{" "}
              <span className="font-semibold text-black">{imovel.titulo}</span>
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 w-full flex flex-col gap-4 border border-mint/20">
            <p className="text-sm font-semibold text-zinc-600">Dados do proprietário</p>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
                <span className="text-lg">👤</span>
                <div>
                  <p className="text-xs text-zinc-400">Nome</p>
                  <p className="font-semibold">Carlos Manuel</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
                <span className="text-lg">📞</span>
                <div>
                  <p className="text-xs text-zinc-400">Telemóvel</p>
                  <p className="font-semibold">+258 84 123 456</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
                <span className="text-lg">✉️</span>
                <div>
                  <p className="text-xs text-zinc-400">Email</p>
                  <p className="font-semibold">carlos.manuel@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          <Link href={`/imovel/${imovel.id}`} className="w-full">
            <button className="w-full border border-mint text-black text-sm font-semibold py-3 rounded-lg hover:bg-mint/10 transition hover:cursor-pointer">
              Voltar ao imóvel
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[520px] flex flex-col gap-6">
        <Link
          href={`/imovel/${imovel.id}`}
          className="flex items-center gap-2 text-sm font-semibold"
        >
          <ChevronLeft className="size-4" /> Voltar ao imóvel
        </Link>

        <div>
          <h1 className="text-2xl font-semibold">Desbloquear contacto</h1>
          <p className="text-sm text-zinc-500 mt-1">
            Paga um valor único para acederes ao contacto directo do proprietário
          </p>
        </div>

        {/* Resumo do imóvel */}
        <div className="bg-white shadow-sm rounded-xl p-4 flex gap-4 border border-gray-100">
          <div className="relative w-24 h-20 rounded-lg overflow-hidden flex-shrink-0">
            <Image src={imovel.imagem} alt={imovel.titulo} fill className="object-cover" />
          </div>
          <div className="flex flex-col justify-center gap-1">
            <p className="font-semibold text-sm line-clamp-1">{imovel.titulo}</p>
            <p className="text-xs text-zinc-500">{imovel.localizacao}</p>
            <p className="text-xs text-zinc-400">
              {imovel.tipo} · {imovel.quartos > 0 ? `${imovel.quartos} quartos` : "Estúdio"} · {imovel.area} m²
            </p>
          </div>
          <div className="ml-auto text-right flex-shrink-0">
            <p className="text-xs text-zinc-400">Aluguer</p>
            <p className="text-slamon font-bold text-sm">
              {imovel.preco.toLocaleString("pt-PT")} MZN
            </p>
          </div>
        </div>

        {/* Valor a pagar */}
        <div className="bg-mint/5 rounded-xl p-5 flex items-center justify-between border border-mint/20">
          <div className="flex items-center gap-3">
            <div className="bg-mint/20 rounded-full p-2">
              <Lock className="size-4 text-mint" />
            </div>
            <div>
              <p className="font-semibold text-sm">Desbloquear contacto do proprietário</p>
              <p className="text-xs text-zinc-500">Acesso imediato · Pagamento único</p>
            </div>
          </div>
          <p className="text-2xl font-bold text-slamon">150 MZN</p>
        </div>

        {/* Método de pagamento */}
        <div className="bg-white shadow-sm rounded-xl p-5 flex flex-col gap-4 border border-gray-100">
          <p className="font-semibold text-sm">Método de pagamento</p>

          <div className="flex gap-3">
            <button
              onClick={() => setMetodo("mpesa")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border-2 text-sm font-medium transition hover:cursor-pointer ${
                metodo === "mpesa"
                  ? "border-mint bg-mint/5"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <Phone className="size-4" />
              M-Pesa
            </button>
            <button
              onClick={() => setMetodo("cartao")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border-2 text-sm font-medium transition hover:cursor-pointer ${
                metodo === "cartao"
                  ? "border-mint bg-mint/5"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <CreditCard className="size-4" />
              Cartão
            </button>
          </div>

          {metodo === "mpesa" ? (
            <FloatingLabelInput
              label="Número M-Pesa (ex: 84 123 456)"
              name="mpesa"
              type="tel"
            />
          ) : (
            <div className="flex flex-col gap-3">
              <FloatingLabelInput label="Número do cartão" name="cardNumber" type="text" />
              <div className="flex gap-3">
                <FloatingLabelInput label="Validade" name="expDate" type="text" />
                <FloatingLabelInput label="CVC" name="cvc" type="text" />
              </div>
            </div>
          )}
        </div>

        <button
          onClick={pagar}
          className="w-full bg-mint text-black font-semibold text-sm py-4 rounded-xl hover:bg-mint/80 transition ease-in-out duration-300 hover:cursor-pointer"
        >
          Pagar 150 MZN e desbloquear contacto
        </button>

        <p className="text-xs text-zinc-400 text-center">
          Pagamento seguro e encriptado. O contacto é revelado imediatamente após o pagamento.
        </p>
      </div>
    </div>
  );
}
