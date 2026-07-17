"use client";

import { FloatingLabelPasswordInput } from "@/components/FloatingLabelPasswordInput";
import { useRouter } from "next/navigation";

export default function NovaSenha() {
  const router = useRouter();

  const next = () => {
    router.push("/entrar");
  };

  return (
    <div className="flex flex-col w-full gap-3">
      <h1 className="text-2xl sm:text-3xl font-semibold">Definir nova password</h1>
      <p className="text-sm text-zinc-500">
        A tua password anterior foi redefinida. Define uma nova password para a tua conta.
      </p>
      <form className="flex flex-col gap-4 w-full py-6">
        <FloatingLabelPasswordInput label="Nova password" name="password" required />
        <FloatingLabelPasswordInput label="Confirmar password" name="confirmPassword" required />
        <button
          onClick={next}
          type="button"
          className="bg-mint text-black text-xs font-semibold h-11 px-4 rounded-xl w-full hover:bg-mint/80 hover:cursor-pointer transition"
        >
          Guardar password
        </button>
      </form>
    </div>
  );
}
