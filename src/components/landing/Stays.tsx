"use client";

import { Search, BedDouble } from "lucide-react";
import { FloatingLabelInput } from "../FloatingLabelInput";
import { FloatingLabelSelect } from "../FloatingLabelSelect";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Stays() {
  const router = useRouter();
  const [localizacao, setLocalizacao] = useState("");
  const [tipo, setTipo] = useState("");
  const [quartos, setQuartos] = useState("");

  const pesquisar = () => {
    const params = new URLSearchParams();
    if (localizacao) params.set("localizacao", localizacao);
    if (tipo) params.set("tipo", tipo);
    if (quartos) params.set("quartos", quartos);
    router.push(`/pesquisa?${params.toString()}`);
  };

  return (
    <div className="w-4/5 flex flex-col justify-between bg-white p-5 -m-24 rounded-xl shadow-lg z-20 relative">
      <h2 className="font-semibold flex items-center gap-2 mb-3">
        <BedDouble className="h-5 w-5" />
        Pesquisar imóveis
      </h2>
      <div className="flex items-center justify-center gap-4">
        <FloatingLabelInput
          label="Localização"
          name="localizacao"
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocalizacao(e.target.value)}
        />
        <FloatingLabelSelect
          label="Tipo de imóvel"
          name="tipo"
          options={[
            { value: "Apartamento", label: "Apartamento" },
            { value: "Vivenda", label: "Vivenda" },
            { value: "Moradia", label: "Moradia" },
            { value: "Quarto", label: "Quarto" },
            { value: "Estúdio", label: "Estúdio" },
          ]}
          className="border-gray-300"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTipo(e.target.value)}
        />
        <FloatingLabelSelect
          label="Quartos"
          name="quartos"
          options={[
            { value: "1", label: "1 quarto" },
            { value: "2", label: "2 quartos" },
            { value: "3", label: "3 quartos" },
            { value: "4", label: "4+ quartos" },
          ]}
          className="border-gray-300"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setQuartos(e.target.value)}
        />
        <FloatingLabelInput
          label="Preço máx. (MZN)"
          name="precoMax"
          type="number"
        />
      </div>
      <div className="flex items-center justify-end mt-3">
        <button
          onClick={pesquisar}
          className="bg-mint rounded px-4 py-2 text-xs flex gap-1 items-center justify-center font-semibold hover:cursor-pointer hover:bg-mint/80 ease-in-out duration-300"
        >
          <Search className="h-4 w-4" />
          Pesquisar
        </button>
      </div>
    </div>
  );
}
