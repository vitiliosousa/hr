"use client";

import Link from "next/link";
import { FloatingLabelInput } from "@/components/FloatingLabelInput";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RecuperarSenha() {
  const router = useRouter();

  const next = () => {
    router.push("/verificar");
  };

  return (
    <div className="flex flex-col w-full gap-3">
      <Link href="/entrar" className="flex items-center gap-2 text-sm font-semibold hover:text-mint transition w-fit">
        <ChevronLeft className="h-4 w-4" /> Voltar para o login
      </Link>
      <h1 className="text-2xl sm:text-3xl font-semibold">Esqueceste a password?</h1>
      <p className="text-sm text-zinc-500">
        Não te preocupes. Introduz o teu email e enviaremos um código de recuperação.
      </p>
      <form className="flex flex-col gap-4 w-full py-6">
        <FloatingLabelInput label="Email" name="email" type="email" required />
        <button
          onClick={next}
          type="button"
          className="bg-mint text-black text-xs font-semibold h-11 px-4 rounded-xl w-full hover:bg-mint/80 hover:cursor-pointer transition"
        >
          Enviar código
        </button>
      </form>
    </div>
  );
}
