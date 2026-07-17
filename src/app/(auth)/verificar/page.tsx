"use client";

import Link from "next/link";
import { FloatingLabelPasswordInput } from "@/components/FloatingLabelPasswordInput";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Verificar() {
  const router = useRouter();

  const next = () => {
    router.push("/nova-senha");
  };

  return (
    <div className="flex flex-col w-3/4 gap-3">
      <Link href="/entrar" className="flex items-center gap-2 text-sm font-semibold hover:text-mint transition">
        <ChevronLeft className="h-4 w-4" /> Voltar para o login
      </Link>
      <h1 className="text-3xl font-semibold">Verificar código</h1>
      <p className="text-sm text-zinc-500">
        Um código de autenticação foi enviado para o teu email.
      </p>
      <form className="flex flex-col gap-4 w-full py-6">
        <FloatingLabelPasswordInput label="Código de verificação" name="codigo" required />
        <button
          onClick={next}
          type="button"
          className="bg-mint text-black text-xs font-semibold h-11 px-4 rounded-xl w-full hover:bg-mint/80 hover:cursor-pointer transition"
        >
          Verificar
        </button>
        <p className="text-xs">
          Não recebeste o código?{" "}
          <Link href="#" className="text-mint hover:underline">
            Reenviar
          </Link>
        </p>
      </form>
    </div>
  );
}
