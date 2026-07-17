"use client";

import { FloatingLabelInput } from "@/components/FloatingLabelInput";
import { FloatingLabelPasswordInput } from "@/components/FloatingLabelPasswordInput";
import { useRouter } from "next/navigation";
import SocialMedia from "@/components/SocialMedia";

export default function Registar() {
  const router = useRouter();

  const next = () => {
    router.push("/registar/metodo-pagamento");
  };

  return (
    <div className="flex flex-col w-3/4 gap-3">
      <h1 className="text-3xl font-semibold">Criar conta</h1>
      <p className="text-sm text-zinc-500">
        Cria a tua conta para começar a pesquisar ou publicar imóveis.
      </p>
      <form className="flex flex-col gap-4 w-full py-6">
        <div className="flex flex-col gap-4 w-full">
          <div className="flex w-full gap-4">
            <FloatingLabelInput label="Nome" name="nome" type="text" required />
            <FloatingLabelInput label="Apelido" name="apelido" type="text" required />
          </div>
          <div className="flex w-full gap-4">
            <FloatingLabelInput label="Email" name="email" type="email" required />
            <FloatingLabelInput label="Telemóvel" name="telemovel" type="tel" required />
          </div>
          <FloatingLabelPasswordInput label="Password" name="password" required />
          <FloatingLabelPasswordInput label="Confirmar password" name="confirmPassword" required />
          <div className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <label className="text-xs">
              Concordo com os{" "}
              <a href="#" className="text-slamon">Termos</a> e{" "}
              <a href="#" className="text-slamon">Política de Privacidade</a>
            </label>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4 w-full">
          <button
            onClick={next}
            type="button"
            className="bg-mint text-black text-xs font-semibold h-10 px-4 rounded w-full hover:bg-mint/80 hover:cursor-pointer transition"
          >
            Criar conta
          </button>
          <p className="text-xs text-center font-semibold">
            Já tens conta?{" "}
            <a href="/entrar" className="text-slamon hover:underline">
              Entrar
            </a>
          </p>
        </div>
        <div className="flex items-center w-full gap-2">
          <hr className="border-gray-300 flex-grow" />
          <p className="text-xs text-gray-500 whitespace-nowrap">ou regista com</p>
          <hr className="border-gray-300 flex-grow" />
        </div>
      </form>
      <SocialMedia />
    </div>
  );
}
