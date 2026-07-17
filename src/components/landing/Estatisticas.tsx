const stats = [
  { valor: "1.200+", label: "Imóveis publicados", sub: "e a crescer todos os dias" },
  { valor: "8.500+", label: "Utilizadores activos", sub: "à procura do imóvel certo" },
  { valor: "32",     label: "Cidades cobertas",   sub: "em todo o território nacional" },
  { valor: "95%",    label: "Taxa de satisfação",  sub: "dos nossos utilizadores" },
];

export default function Estatisticas() {
  return (
    <section className="w-full bg-zinc-900 py-20">
      <div className="max-w-7xl mx-auto px-10">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold text-mint uppercase tracking-widest mb-2">Os nossos números</p>
          <h2 className="text-2xl font-bold text-white">CasaJá em números</h2>
          <p className="text-sm text-zinc-400 mt-2">A plataforma que cresce com Moçambique</p>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {stats.map(({ valor, label, sub }) => (
            <div key={label} className="flex flex-col items-center text-center p-8 rounded-2xl bg-zinc-800/50 border border-zinc-700/50">
              <p className="text-4xl font-bold text-mint mb-2">{valor}</p>
              <p className="text-white font-semibold text-sm">{label}</p>
              <p className="text-zinc-500 text-xs mt-1">{sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
