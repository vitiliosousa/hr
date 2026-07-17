"use client";

import { FloatingLabelInput } from "@/components/FloatingLabelInput";
import { FloatingLabelSelect } from "@/components/FloatingLabelSelect";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MetodoPagamento() {
  const router = useRouter();

  const concluir = () => {
    router.push("/entrar");
  };

  return (
    <div className="flex flex-col w-3/4 gap-3">
      <a href="/registar" className="flex items-center gap-2 text-sm font-semibold">
        <ChevronLeft className="h-4 w-4" /> Voltar
      </a>
      <h1 className="text-3xl font-semibold">Método de pagamento</h1>
      <p className="text-sm text-zinc-500">
        Adiciona um método de pagamento para desbloquear contactos de proprietários.
      </p>
      <form className="flex flex-col gap-4 w-full py-6">
        <FloatingLabelInput label="Número do cartão" name="cardNumber" type="text" required />
        <div className="flex w-full gap-4">
          <FloatingLabelInput label="Validade" name="expDate" type="text" required />
          <FloatingLabelInput label="CVC" name="cvc" type="text" required />
        </div>
        <FloatingLabelInput label="Nome no cartão" name="nameOnCard" type="text" required />
        <FloatingLabelSelect
          label="País"
          name="country"
          options={[
            { value: "mz", label: "Moçambique" },
            { value: "pt", label: "Portugal" },
            { value: "br", label: "Brasil" },
          ]}
          required
          className="border-gray-300"
        />
        <div className="flex items-center">
          <input type="checkbox" className="mr-2" />
          <label className="text-xs">Guardar para pagamentos futuros</label>
        </div>
        <div className="flex flex-col items-center gap-4 w-full">
          <button
            onClick={concluir}
            type="button"
            className="bg-mint text-black text-xs font-semibold h-10 px-4 rounded w-full hover:bg-mint/80 hover:cursor-pointer transition"
          >
            Guardar e concluir registo
          </button>
          <p className="text-xs text-center text-zinc-400">
            Os teus dados de pagamento são processados de forma segura e encriptada.
          </p>
        </div>
      </form>
    </div>
  );
}
