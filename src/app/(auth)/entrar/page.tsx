"use client";

import Link from "next/link";
import { FloatingLabelInput } from "@/components/FloatingLabelInput";
import { FloatingLabelPasswordInput } from "@/components/FloatingLabelPasswordInput";
import SocialMedia from "@/components/SocialMedia";
import { useRouter } from "next/navigation";

export default function Entrar() {
  const router = useRouter();

  const entrar = () => {
    localStorage.setItem("casaja_auth", "true");
    router.push("/meus-imoveis");
  };

  return (
    <div className="flex flex-col w-full gap-3">
      <h1 className="text-2xl sm:text-3xl font-semibold">Entrar</h1>
      <p className="text-sm text-zinc-500">Acede à tua conta</p>
      <form className="flex flex-col gap-4 w-full py-6">
        <div className="flex flex-col gap-4 w-full">
          <FloatingLabelInput label="Email" name="email" type="email" required />
          <FloatingLabelPasswordInput label="Password" name="password" required />
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <label className="text-xs">Lembrar-me</label>
            </div>
            <Link href="/recuperar-senha" className="text-xs text-mint hover:underline shrink-0">
              Esqueci a password
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4 w-full">
          <button
            type="button"
            onClick={entrar}
            className="bg-mint text-black text-xs font-semibold h-11 px-4 rounded-xl w-full hover:bg-mint/80 hover:cursor-pointer transition"
          >
            Entrar
          </button>
          <p className="text-xs text-center font-semibold">
            Ainda não tens conta?{" "}
            <Link href="/registar" className="text-mint hover:underline">
              Registar
            </Link>
          </p>
        </div>
        <div className="flex items-center w-full gap-2">
          <hr className="border-gray-300 flex-grow" />
          <p className="text-xs text-gray-500 whitespace-nowrap">ou entra com</p>
          <hr className="border-gray-300 flex-grow" />
        </div>
      </form>
      <SocialMedia />
    </div>
  );
}
