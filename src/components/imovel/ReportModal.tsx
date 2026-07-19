"use client";

import { useState } from "react";
import { Flag, X } from "lucide-react";

const motivos = [
  "Já alugado",
  "Informação falsa",
  "Fraude ou burla",
  "Fotos falsas",
  "Preço enganoso",
  "Outro",
];

export default function ReportModal() {
  const [open, setOpen] = useState(false);
  const [motivo, setMotivo] = useState("");
  const [enviado, setEnviado] = useState(false);

  const enviar = () => {
    if (!motivo) return;
    setEnviado(true);
    setTimeout(() => { setOpen(false); setEnviado(false); setMotivo(""); }, 2000);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-red-500 border border-gray-200 px-3 py-2 rounded-lg hover:border-red-200 hover:bg-red-50 transition hover:cursor-pointer"
      >
        <Flag className="size-3.5" /> Denunciar
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
            {enviado ? (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="w-12 h-12 rounded-full bg-mint/10 flex items-center justify-center">
                  <Flag className="size-6 text-mint" />
                </div>
                <p className="font-semibold text-center">Denúncia enviada</p>
                <p className="text-xs text-zinc-500 text-center">Obrigado. Vamos analisar o anúncio.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold text-base">Denunciar anúncio</h3>
                  <button onClick={() => setOpen(false)} className="p-1.5 hover:bg-gray-100 rounded-lg transition hover:cursor-pointer">
                    <X className="size-4 text-zinc-500" />
                  </button>
                </div>
                <p className="text-xs text-zinc-500 mb-4">Qual é o motivo da denúncia?</p>
                <div className="flex flex-col gap-2 mb-5">
                  {motivos.map((m) => (
                    <label key={m} className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-mint/50 hover:bg-mint/5 cursor-pointer transition">
                      <input
                        type="radio"
                        name="motivo"
                        value={m}
                        checked={motivo === m}
                        onChange={() => setMotivo(m)}
                        className="accent-mint"
                      />
                      <span className="text-sm">{m}</span>
                    </label>
                  ))}
                </div>
                <button
                  onClick={enviar}
                  disabled={!motivo}
                  className="w-full bg-red-500 text-white font-semibold text-sm py-3 rounded-xl hover:bg-red-600 transition hover:cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Enviar denúncia
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
