import { Edit } from "lucide-react";

const campos = [
  { label: "Nome", value: "João" },
  { label: "Apelido", value: "Silva" },
  { label: "Email", value: "joao.silva@gmail.com" },
  { label: "Telemóvel", value: "+258 84 733 3514" },
  { label: "Password", value: "••••••••••••" },
];

export default function AccountTab() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">Perfil</h2>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-50">
        {campos.map(({ label, value }) => (
          <div key={label} className="flex items-center justify-between px-5 py-4">
            <div>
              <p className="text-xs text-zinc-400">{label}</p>
              <p className="text-sm font-medium mt-0.5">{value}</p>
            </div>
            <button className="flex items-center gap-1.5 text-xs border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition hover:cursor-pointer shrink-0">
              <Edit className="size-3" /> Editar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
