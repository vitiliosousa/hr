import { CheckCircle } from "lucide-react";

const historico = [
  { id: 1, descricao: "Contacto desbloqueado — Apartamento T2 no Sommerschield", data: "15 Jul 2025", valor: 25, metodo: "M-Pesa" },
  { id: 2, descricao: "Contacto desbloqueado — Vivenda T3 na Polana Cimento",    data: "10 Jul 2025", valor: 25, metodo: "e-Mola" },
  { id: 3, descricao: "Contacto desbloqueado — Estúdio moderno na Costa do Sol", data: "3 Jul 2025",  valor: 25, metodo: "M-Pesa" },
];

export default function PaymentTab() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">Histórico de pagamentos</h2>
      {historico.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm py-16 flex flex-col items-center gap-3 text-zinc-400">
          <CheckCircle className="size-10 text-zinc-200" />
          <p className="text-sm font-medium">Nenhum pagamento ainda</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-50">
          {historico.map((h) => (
            <div key={h.id} className="flex items-center justify-between px-5 py-4 gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="bg-mint/10 rounded-full p-1.5 shrink-0">
                  <CheckCircle className="size-4 text-mint" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{h.descricao}</p>
                  <p className="text-xs text-zinc-400 mt-0.5">{h.data} · {h.metodo}</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-bold text-mint">{h.valor} MZN</p>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Pago</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
