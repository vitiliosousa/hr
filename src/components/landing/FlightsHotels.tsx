import { Home, Search, LockOpen } from "lucide-react";

const passos = [
  {
    numero: "01",
    icone: Home,
    titulo: "Publica o teu imóvel",
    descricao: "Cria o teu anúncio gratuitamente em menos de 5 minutos. Adiciona fotos, descrição, preço e todas as comodidades.",
  },
  {
    numero: "02",
    icone: Search,
    titulo: "Interessados descobrem-te",
    descricao: "O teu imóvel fica visível para milhares de pessoas à procura de casa na tua zona.",
  },
  {
    numero: "03",
    icone: LockOpen,
    titulo: "Contacto directo",
    descricao: "O interessado paga 150 MZN para desbloquear o teu contacto. Esse valor vai directamente para ti.",
  },
];

export default function FlightsHotels() {
  return (
    <section className="w-full bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-10">
        <div className="flex flex-col items-center text-center mb-14">
          <p className="text-xs font-semibold text-mint uppercase tracking-widest mb-2">Simples e transparente</p>
          <h2 className="text-2xl font-bold">Como funciona</h2>
          <p className="text-sm text-zinc-500 mt-2">Três passos. Zero burocracia.</p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {passos.map((passo) => {
            const Icone = passo.icone;
            return (
              <div key={passo.numero} className="bg-white rounded-2xl shadow-sm p-8 flex flex-col gap-5 border border-gray-100 hover:shadow-md transition-shadow duration-300 relative overflow-hidden">
                <span className="absolute top-4 right-5 text-5xl font-bold text-gray-50 select-none pointer-events-none">{passo.numero}</span>
                <div className="flex items-center gap-3">
                  <div className="bg-mint/10 rounded-xl p-3 w-fit">
                    <Icone className="size-6 text-mint" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold text-base">{passo.titulo}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{passo.descricao}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
