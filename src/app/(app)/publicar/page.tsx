"use client";

import { useState } from "react";
import {
  Check, ChevronRight, ChevronLeft, Camera, MapPin, CheckCircle2,
} from "lucide-react";

/* ─────────────────────────── Constantes ─────────────────────────── */

const TOTAL = 10;

const TITULOS = [
  "Informações Básicas", "Localização", "Preço", "Características",
  "Comodidades", "Fotografias", "Descrição", "Disponibilidade",
  "Contacto e Preferências", "Revisão e Publicar",
];

const TIPOS_IMOVEL = [
  "Apartamento", "Casa", "Moradia", "Vivenda", "Estúdio",
  "Quarto", "Flat", "Escritório", "Loja", "Armazém", "Terreno",
];

const PROVINCIAS = [
  "Cabo Delgado", "Gaza", "Inhambane", "Manica",
  "Maputo Cidade", "Maputo Província", "Nampula",
  "Niassa", "Sofala", "Tete", "Zambézia",
];

const COMODIDADES = [
  "Mobilado", "Ar condicionado", "Piscina", "Jardim",
  "Varanda", "Terraço", "Segurança 24h", "Portão automático",
  "Cerca eléctrica", "Internet", "TV Cabo", "Água permanente",
  "Energia permanente", "Gerador", "Painéis solares", "Elevador",
  "Ginásio", "Parque infantil", "Lavandaria", "Vista para o mar",
];

const DESPESAS = ["Água", "Energia", "Internet", "Condomínio"];
const PREFERENCIAS_OP = ["Estudantes", "Famílias", "Empresas", "Estrangeiros"];
const PERMITE_OP = ["Animais de estimação", "Crianças"];

/* ─────────────────────────── Estado global ─────────────────────────── */

interface Dados {
  tipoAnuncio: string; tipoImovel: string; categoria: string; titulo: string;
  provincia: string; cidade: string; distrito: string; bairro: string;
  rua: string; numero: string; pontoRef: string;
  preco: string; moeda: string; caucao: string; mesesCaucao: string;
  negociavel: boolean; despesas: string[];
  area: string; quartos: string; casasBanho: string; salas: string;
  cozinhas: string; andares: string; piso: string; vagas: string; anoConstrucao: string;
  comodidades: string[];
  descricao: string;
  disponibilidade: string; dataDisp: string; fumadores: boolean; festas: boolean; horario: string;
  nomeContacto: string; telefone: string; whatsapp: string; emailContacto: string;
  preferencias: string[]; permite: string[]; contratoObrig: boolean;
}

const init: Dados = {
  tipoAnuncio: "", tipoImovel: "", categoria: "", titulo: "",
  provincia: "", cidade: "", distrito: "", bairro: "", rua: "", numero: "", pontoRef: "",
  preco: "", moeda: "MZN", caucao: "", mesesCaucao: "1",
  negociavel: false, despesas: [],
  area: "", quartos: "", casasBanho: "", salas: "", cozinhas: "",
  andares: "", piso: "", vagas: "", anoConstrucao: "",
  comodidades: [],
  descricao: "",
  disponibilidade: "imediata", dataDisp: "", fumadores: false, festas: false, horario: "",
  nomeContacto: "", telefone: "", whatsapp: "", emailContacto: "",
  preferencias: [], permite: [], contratoObrig: true,
};

/* ─────────────────────────── Helpers UI ─────────────────────────── */

function FInput({
  label, req, value, onChange, type = "text", placeholder, hint,
}: {
  label: string; req?: boolean; value: string;
  onChange: (v: string) => void; type?: string; placeholder?: string; hint?: string;
}) {
  const [focus, setFocus] = useState(false);
  const up = focus || !!value;
  return (
    <div className="flex flex-col gap-1">
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          placeholder={focus ? placeholder : ""}
          className="w-full h-12 border border-gray-200 rounded-xl px-3 pt-4 text-sm outline-none focus:border-black transition bg-white"
        />
        <label className={`absolute left-3 pointer-events-none transition-all duration-150 ${up ? "top-1.5 text-[10px] text-zinc-400" : "top-3.5 text-sm text-zinc-400"}`}>
          {label}{req && <span className="text-mint ml-0.5">*</span>}
        </label>
      </div>
      {hint && <p className="text-xs text-zinc-400 pl-1">{hint}</p>}
    </div>
  );
}

function FSelect({
  label, req, value, onChange, options,
}: {
  label: string; req?: boolean; value: string;
  onChange: (v: string) => void; options: { value: string; label: string }[];
}) {
  const [focus, setFocus] = useState(false);
  const up = focus || !!value;
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        className="w-full h-12 border border-gray-200 rounded-xl px-3 pt-4 text-sm outline-none focus:border-black appearance-none transition bg-white"
      >
        <option value="" />
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <label className={`absolute left-3 pointer-events-none transition-all duration-150 ${up ? "top-1.5 text-[10px] text-zinc-400" : "top-3.5 text-sm text-zinc-400"}`}>
        {label}{req && <span className="text-mint ml-0.5">*</span>}
      </label>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}

function Toggle({ value, onChange, label }: { value: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-sm text-zinc-600">{label}</span>
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={`w-11 h-6 rounded-full transition-colors duration-200 relative flex-shrink-0 hover:cursor-pointer ${value ? "bg-mint" : "bg-gray-200"}`}
      >
        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${value ? "left-6" : "left-1"}`} />
      </button>
    </div>
  );
}

function ChipCheck({ label, checked, onClick }: { label: string; checked: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-xs text-left transition hover:cursor-pointer ${
        checked ? "border-mint bg-mint/5 text-black font-medium" : "border-gray-200 text-zinc-500 hover:border-gray-300"
      }`}
    >
      <div className={`w-4 h-4 rounded flex-shrink-0 flex items-center justify-center ${checked ? "bg-mint" : "border border-gray-300"}`}>
        {checked && <Check className="size-3 text-black" />}
      </div>
      {label}
    </button>
  );
}

function CardSelect({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`py-3.5 rounded-xl border-2 text-sm font-medium transition hover:cursor-pointer ${
        active ? "border-mint bg-mint/5 text-black" : "border-gray-200 text-zinc-500 hover:border-gray-300"
      }`}
    >
      {label}
    </button>
  );
}

function SLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-sm font-medium text-zinc-600 mb-3">{children}</p>;
}

/* ─────────────────────────── Componente principal ─────────────────────────── */

export default function Publicar() {
  const [passo, setPasso] = useState(1);
  const [publicado, setPublicado] = useState(false);
  const [d, setD] = useState<Dados>(init);

  const set = <K extends keyof Dados>(k: K, v: Dados[K]) => setD((prev) => ({ ...prev, [k]: v }));

  const toggleArr = (k: "comodidades" | "despesas" | "preferencias" | "permite", val: string) => {
    const arr = d[k] as string[];
    set(k, arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);
  };

  /* ── Ecrã de sucesso ── */
  if (publicado) {
    return (
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center py-20 px-10">
        <div className="max-w-md w-full flex flex-col items-center gap-6 text-center">
          <div className="bg-mint/10 rounded-full p-6">
            <CheckCircle2 className="size-16 text-mint" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Anúncio publicado!</h1>
            <p className="text-sm text-zinc-500 mt-2">
              <strong>{d.titulo || "O teu imóvel"}</strong> já está visível para todos.
              Serás notificado quando alguém desbloquear o teu contacto.
            </p>
          </div>
          <a href="/meus-imoveis" className="w-full">
            <button className="w-full bg-mint text-black font-semibold text-sm px-6 py-3.5 rounded-xl hover:bg-mint/80 transition hover:cursor-pointer">
              Ver os meus anúncios
            </button>
          </a>
          <a href="/publicar" className="text-sm text-zinc-400 hover:text-zinc-600 hover:underline hover:cursor-pointer">
            Publicar outro imóvel
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto w-full px-10 py-8 pb-16">
      <div className="w-full flex flex-col gap-6">

        {/* Título */}
        <div>
          <h1 className="text-2xl font-semibold">Publicar imóvel</h1>
          <p className="text-sm text-zinc-500 mt-1">Gratuito · Sem comissões de publicação</p>
        </div>

        {/* Stepper */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold">{TITULOS[passo - 1]}</p>
            <p className="text-xs text-zinc-400">Passo {passo} de {TOTAL}</p>
          </div>
          <div className="flex items-center">
            {Array.from({ length: TOTAL }).map((_, i) => {
              const n = i + 1;
              const done = passo > n;
              const cur = passo === n;
              return (
                <div key={n} className="flex items-center flex-1 last:flex-none">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors ${
                    done ? "bg-mint text-black" : cur ? "bg-black text-white" : "bg-gray-100 text-zinc-400"
                  }`}>
                    {done ? <Check className="size-3" /> : n}
                  </div>
                  {i < TOTAL - 1 && (
                    <div className={`flex-1 h-0.5 mx-0.5 ${passo > n ? "bg-mint" : "bg-gray-100"}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Conteúdo do passo */}
        <div className="bg-white shadow-sm rounded-2xl p-8 border border-gray-100 flex flex-col gap-6">

          {/* ── Passo 1: Informações Básicas ── */}
          {passo === 1 && (
            <>
              <h2 className="font-semibold text-lg -mb-2">Informações Básicas</h2>

              <div>
                <SLabel>Tipo de anúncio <span className="text-mint">*</span></SLabel>
                <div className="grid grid-cols-2 gap-3">
                  {[{ v: "Aluguer", icon: "🏠" }, { v: "Venda", icon: "🏷️" }].map(({ v, icon }) => (
                    <CardSelect key={v} label={`${icon} ${v}`} active={d.tipoAnuncio === v} onClick={() => set("tipoAnuncio", v)} />
                  ))}
                </div>
              </div>

              <div>
                <SLabel>Tipo de imóvel <span className="text-mint">*</span></SLabel>
                <div className="grid grid-cols-3 gap-2">
                  {TIPOS_IMOVEL.map((t) => (
                    <CardSelect key={t} label={t} active={d.tipoImovel === t} onClick={() => set("tipoImovel", t)} />
                  ))}
                </div>
              </div>

              <div>
                <SLabel>Categoria <span className="text-mint">*</span></SLabel>
                <div className="grid grid-cols-2 gap-3">
                  {[{ v: "Residencial", icon: "🏘️" }, { v: "Comercial", icon: "🏢" }].map(({ v, icon }) => (
                    <CardSelect key={v} label={`${icon} ${v}`} active={d.categoria === v} onClick={() => set("categoria", v)} />
                  ))}
                </div>
              </div>

              <FInput
                label="Título do anúncio" req
                value={d.titulo} onChange={(v) => set("titulo", v)}
                placeholder="Ex: Apartamento T2 Mobilado na Polana"
                hint="Seja específico — bons títulos atraem mais interessados"
              />
            </>
          )}

          {/* ── Passo 2: Localização ── */}
          {passo === 2 && (
            <>
              <div className="-mb-2">
                <h2 className="font-semibold text-lg">Localização</h2>
                <p className="text-xs text-zinc-400 mt-1">Apenas o bairro e cidade serão visíveis publicamente</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FSelect label="Província" req value={d.provincia} onChange={(v) => set("provincia", v)}
                  options={PROVINCIAS.map((p) => ({ value: p, label: p }))} />
                <FInput label="Cidade" req value={d.cidade} onChange={(v) => set("cidade", v)} />
                <FInput label="Distrito" value={d.distrito} onChange={(v) => set("distrito", v)} />
                <FInput label="Bairro" req value={d.bairro} onChange={(v) => set("bairro", v)} />
                <FInput label="Rua" value={d.rua} onChange={(v) => set("rua", v)} />
                <FInput label="Número" value={d.numero} onChange={(v) => set("numero", v)} />
              </div>

              <FInput label="Ponto de referência" value={d.pontoRef} onChange={(v) => set("pontoRef", v)}
                placeholder="Ex: Próximo ao Shopping Maputo"
                hint="Ajuda os interessados a localizar o imóvel" />

              <div className="border-2 border-dashed border-gray-200 rounded-xl h-44 flex flex-col items-center justify-center gap-2 text-zinc-400 hover:border-mint transition hover:cursor-pointer">
                <MapPin className="size-7" />
                <p className="text-sm font-medium">Marcar localização no mapa</p>
                <p className="text-xs">Google Maps · integração em breve</p>
              </div>
            </>
          )}

          {/* ── Passo 3: Preço ── */}
          {passo === 3 && (
            <>
              <h2 className="font-semibold text-lg -mb-2">Preço</h2>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <FInput label="Valor mensal" req type="number" value={d.preco} onChange={(v) => set("preco", v)} placeholder="0" />
                </div>
                <FSelect label="Moeda" value={d.moeda} onChange={(v) => set("moeda", v)}
                  options={[{ value: "MZN", label: "MZN" }, { value: "USD", label: "USD" }, { value: "EUR", label: "EUR" }]} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FInput label="Valor da caução" type="number" value={d.caucao} onChange={(v) => set("caucao", v)} />
                <FSelect label="Meses de caução" value={d.mesesCaucao} onChange={(v) => set("mesesCaucao", v)}
                  options={["0", "1", "2", "3", "6"].map((m) => ({ value: m, label: `${m} ${m === "1" ? "mês" : "meses"}` }))} />
              </div>

              <div className="flex flex-col gap-3 p-4 bg-gray-50 rounded-xl">
                <Toggle value={d.negociavel} onChange={(v) => set("negociavel", v)} label="Valor negociável" />
              </div>

              <div>
                <SLabel>Despesas incluídas no preço</SLabel>
                <div className="grid grid-cols-2 gap-2">
                  {DESPESAS.map((dep) => (
                    <ChipCheck key={dep} label={dep} checked={d.despesas.includes(dep)} onClick={() => toggleArr("despesas", dep)} />
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ── Passo 4: Características ── */}
          {passo === 4 && (
            <>
              <h2 className="font-semibold text-lg -mb-2">Características</h2>
              <div className="grid grid-cols-3 gap-4">
                {([
                  { label: "Área total (m²)", req: true, key: "area" },
                  { label: "Quartos", req: true, key: "quartos" },
                  { label: "Casas de banho", req: true, key: "casasBanho" },
                  { label: "Salas de estar", key: "salas" },
                  { label: "Cozinhas", key: "cozinhas" },
                  { label: "Nº total de andares", key: "andares" },
                  { label: "Piso do imóvel", key: "piso" },
                  { label: "Vagas de estacionamento", key: "vagas" },
                  { label: "Ano de construção", key: "anoConstrucao" },
                ] as { label: string; req?: boolean; key: keyof Dados }[]).map(({ label, req, key }) => (
                  <FInput key={key} label={label} req={req} type="number"
                    value={d[key] as string} onChange={(v) => set(key, v)} />
                ))}
              </div>
            </>
          )}

          {/* ── Passo 5: Comodidades ── */}
          {passo === 5 && (
            <>
              <div className="-mb-2">
                <h2 className="font-semibold text-lg">Comodidades</h2>
                <p className="text-sm text-zinc-400 mt-1">Selecciona tudo o que o imóvel tem disponível</p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {COMODIDADES.map((c) => (
                  <ChipCheck key={c} label={c} checked={d.comodidades.includes(c)} onClick={() => toggleArr("comodidades", c)} />
                ))}
              </div>
              {d.comodidades.length > 0 && (
                <p className="text-xs text-mint font-medium">{d.comodidades.length} comodidade{d.comodidades.length !== 1 ? "s" : ""} seleccionada{d.comodidades.length !== 1 ? "s" : ""}</p>
              )}
            </>
          )}

          {/* ── Passo 6: Fotografias ── */}
          {passo === 6 && (
            <>
              <div className="-mb-2">
                <h2 className="font-semibold text-lg">Fotografias</h2>
                <p className="text-sm text-zinc-400 mt-1">Mínimo 3 fotos <span className="text-mint">*</span> · Máximo 20 fotos</p>
              </div>

              <div className="border-2 border-dashed border-gray-200 rounded-xl p-12 flex flex-col items-center gap-4 text-center hover:border-mint transition hover:cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                  <Camera className="size-8 text-zinc-300" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-zinc-600">Adicionar fotografias</p>
                  <p className="text-xs text-zinc-400 mt-1">Arrasta aqui ou clica para seleccionar</p>
                  <p className="text-xs text-zinc-300 mt-0.5">JPG, PNG, WEBP · Máx. 10 MB por foto</p>
                </div>
                <button type="button" className="text-xs bg-gray-100 px-5 py-2 rounded-lg hover:bg-gray-200 transition hover:cursor-pointer font-medium">
                  Seleccionar ficheiros
                </button>
              </div>

              <div className="bg-mint/5 border border-mint/20 rounded-xl p-5 flex flex-col gap-2 text-sm text-zinc-600">
                <p className="font-semibold text-black text-sm">Dicas para boas fotografias</p>
                <ul className="space-y-1 text-xs">
                  <li>✓ Usa luz natural — abre as janelas antes de fotografar</li>
                  <li>✓ Fotografa todos os compartimentos: sala, quartos, cozinha, WC</li>
                  <li>✓ Inclui o exterior e a zona envolvente do imóvel</li>
                  <li>✓ A primeira foto será a imagem de capa do anúncio</li>
                  <li>✓ Fotos de qualidade aumentam em 3× as visitas ao anúncio</li>
                </ul>
              </div>
            </>
          )}

          {/* ── Passo 7: Descrição ── */}
          {passo === 7 && (
            <>
              <div className="-mb-2">
                <h2 className="font-semibold text-lg">Descrição</h2>
                <p className="text-sm text-zinc-400 mt-1">Descreve o imóvel para atrair os melhores candidatos</p>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-zinc-600">
                  Descrição do imóvel <span className="text-mint">*</span>
                </label>
                <textarea
                  rows={9}
                  value={d.descricao}
                  onChange={(e) => set("descricao", e.target.value)}
                  placeholder={"Descreve o teu imóvel com detalhe...\n\nEx: Apartamento T2 localizado na Polana, em zona residencial tranquila. Completamente mobilado e equipado. Dispõe de sala espaçosa com varanda, cozinha americana, dois quartos com roupeiro embutido e casa de banho com banheira. Condomínio com piscina e segurança 24h."}
                  className="border border-gray-200 rounded-xl p-4 text-sm resize-none outline-none focus:border-black transition leading-relaxed"
                />
                <p className="text-xs text-zinc-400 text-right">{d.descricao.length} caracteres</p>
              </div>
            </>
          )}

          {/* ── Passo 8: Disponibilidade ── */}
          {passo === 8 && (
            <>
              <h2 className="font-semibold text-lg -mb-2">Disponibilidade</h2>

              <div>
                <SLabel>Estado do imóvel <span className="text-mint">*</span></SLabel>
                <div className="flex flex-col gap-2">
                  {[
                    { v: "imediata", t: "Disponível imediatamente", d: "O imóvel está pronto para ser arrendado agora" },
                    { v: "data", t: "Disponível a partir de uma data", d: "Define quando o imóvel ficará disponível" },
                    { v: "alugado", t: "Já alugado (arquivar)", d: "O imóvel já tem inquilino — fica invisível na pesquisa" },
                  ].map(({ v, t, d: desc }) => (
                    <label key={v} className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition ${
                      d.disponibilidade === v ? "border-mint bg-mint/5" : "border-gray-200 hover:border-gray-300"
                    }`}>
                      <input type="radio" name="disp" value={v} checked={d.disponibilidade === v}
                        onChange={() => set("disponibilidade", v)} className="mt-0.5 accent-black" />
                      <div>
                        <p className="text-sm font-medium">{t}</p>
                        <p className="text-xs text-zinc-400 mt-0.5">{desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {d.disponibilidade === "data" && (
                <FInput label="Data de disponibilidade" req type="date" value={d.dataDisp} onChange={(v) => set("dataDisp", v)} />
              )}

              <div className="flex flex-col gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-sm font-medium text-zinc-600">Regras do imóvel</p>
                <FInput label="Horário para visitas" value={d.horario} onChange={(v) => set("horario", v)}
                  placeholder="Ex: 08h – 18h, dias de semana" />
                <Toggle value={d.fumadores} onChange={(v) => set("fumadores", v)} label="Fumadores permitidos" />
                <Toggle value={d.festas} onChange={(v) => set("festas", v)} label="Festas / eventos permitidos" />
              </div>
            </>
          )}

          {/* ── Passo 9: Contacto e Preferências ── */}
          {passo === 9 && (
            <>
              <h2 className="font-semibold text-lg -mb-2">Contacto e Preferências</h2>

              <div className="grid grid-cols-2 gap-4">
                <FInput label="Nome" req value={d.nomeContacto} onChange={(v) => set("nomeContacto", v)} />
                <FInput label="Telefone" req type="tel" value={d.telefone} onChange={(v) => set("telefone", v)} placeholder="+258 8X XXX XXXX" />
                <FInput label="WhatsApp (opcional)" type="tel" value={d.whatsapp} onChange={(v) => set("whatsapp", v)} placeholder="+258 8X XXX XXXX" />
                <FInput label="Email (opcional)" type="email" value={d.emailContacto} onChange={(v) => set("emailContacto", v)} />
              </div>

              <div className="flex flex-col gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div>
                  <p className="text-sm font-medium text-zinc-600 mb-3">Prefiro arrendar a</p>
                  <div className="grid grid-cols-2 gap-2">
                    {PREFERENCIAS_OP.map((p) => (
                      <ChipCheck key={p} label={p} checked={d.preferencias.includes(p)} onClick={() => toggleArr("preferencias", p)} />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-600 mb-3">Permite</p>
                  <div className="grid grid-cols-2 gap-2">
                    {PERMITE_OP.map((p) => (
                      <ChipCheck key={p} label={p} checked={d.permite.includes(p)} onClick={() => toggleArr("permite", p)} />
                    ))}
                  </div>
                </div>
                <Toggle value={d.contratoObrig} onChange={(v) => set("contratoObrig", v)} label="Contrato de arrendamento obrigatório" />
              </div>
            </>
          )}

          {/* ── Passo 10: Revisão e Publicar ── */}
          {passo === 10 && (
            <>
              <div className="-mb-2">
                <h2 className="font-semibold text-lg">Revisão e Publicar</h2>
                <p className="text-sm text-zinc-400 mt-1">Confirma todos os dados antes de publicar</p>
              </div>

              {[
                {
                  t: "Informações Básicas",
                  rows: [
                    ["Tipo de anúncio", d.tipoAnuncio],
                    ["Tipo de imóvel", d.tipoImovel],
                    ["Categoria", d.categoria],
                    ["Título", d.titulo],
                  ],
                },
                {
                  t: "Localização",
                  rows: [
                    ["Província", d.provincia],
                    ["Cidade", d.cidade],
                    ["Bairro", d.bairro],
                    ["Ponto de referência", d.pontoRef || "—"],
                  ],
                },
                {
                  t: "Preço",
                  rows: [
                    ["Valor mensal", d.preco ? `${Number(d.preco).toLocaleString("pt-PT")} ${d.moeda}/mês` : ""],
                    ["Caução", d.caucao ? `${d.caucao} ${d.moeda} (${d.mesesCaucao} mês/meses)` : "Sem caução"],
                    ["Negociável", d.negociavel ? "Sim" : "Não"],
                    ["Despesas incluídas", d.despesas.length ? d.despesas.join(", ") : "Nenhuma"],
                  ],
                },
                {
                  t: "Características",
                  rows: [
                    ["Área", d.area ? `${d.area} m²` : ""],
                    ["Quartos", d.quartos || ""],
                    ["Casas de banho", d.casasBanho || ""],
                    ["Vagas de estacionamento", d.vagas || "0"],
                  ],
                },
                {
                  t: "Disponibilidade",
                  rows: [
                    ["Estado", d.disponibilidade === "imediata" ? "Disponível já" : d.disponibilidade === "data" ? `A partir de ${d.dataDisp}` : "Já alugado"],
                    ["Fumadores", d.fumadores ? "Permitido" : "Não permitido"],
                    ["Festas", d.festas ? "Permitido" : "Não permitido"],
                    ["Horário visitas", d.horario || "Não definido"],
                  ],
                },
                {
                  t: "Contacto",
                  rows: [
                    ["Nome", d.nomeContacto],
                    ["Telefone", d.telefone],
                    ["WhatsApp", d.whatsapp || "—"],
                    ["Email", d.emailContacto || "—"],
                  ],
                },
              ].map((sec) => (
                <div key={sec.t} className="border border-gray-100 rounded-xl overflow-hidden">
                  <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-100">
                    <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">{sec.t}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-3 p-4">
                    {sec.rows.map(([l, v]) => (
                      <div key={l}>
                        <p className="text-xs text-zinc-400">{l}</p>
                        <p className={`text-sm font-medium mt-0.5 ${!v ? "text-mint" : "text-black"}`}>
                          {v || "Não preenchido"}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {d.comodidades.length > 0 && (
                <div className="border border-gray-100 rounded-xl overflow-hidden">
                  <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-100">
                    <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">Comodidades ({d.comodidades.length})</p>
                  </div>
                  <div className="p-4 flex flex-wrap gap-2">
                    {d.comodidades.map((c) => (
                      <span key={c} className="bg-mint/10 text-black text-xs px-2.5 py-1 rounded-full font-medium">{c}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-mint/5 border border-mint/20 rounded-xl p-5">
                <p className="font-semibold text-sm mb-1.5">Pronto para publicar</p>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  O anúncio será publicado gratuitamente e ficará visível a todos os utilizadores da CasaJá.
                  Receberás uma notificação cada vez que alguém desbloquear o teu contacto (150 MZN por desbloqueio).
                </p>
              </div>
            </>
          )}

        </div>

        {/* Navegação */}
        <div className="flex items-center justify-between">
          {passo > 1 ? (
            <button
              type="button"
              onClick={() => setPasso((p) => p - 1)}
              className="flex items-center gap-2 text-sm font-medium border border-gray-200 px-5 py-2.5 rounded-xl hover:bg-gray-50 transition hover:cursor-pointer"
            >
              <ChevronLeft className="size-4" /> Anterior
            </button>
          ) : <div />}

          {passo < TOTAL ? (
            <button
              type="button"
              onClick={() => setPasso((p) => p + 1)}
              className="flex items-center gap-2 bg-mint text-black text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-mint/80 transition hover:cursor-pointer"
            >
              Seguinte <ChevronRight className="size-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setPublicado(true)}
              className="bg-black text-white text-sm font-semibold px-8 py-2.5 rounded-xl hover:bg-zinc-800 transition hover:cursor-pointer"
            >
              🚀 Publicar anúncio
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
