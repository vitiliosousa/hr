"use client";

import { useState } from "react";
import AccountTab from "@/components/account/AccountTab";
import HistoryTab from "@/components/account/HistoryTab";
import PaymentTab from "@/components/account/PaymentTab";
import FavoritosTab from "@/components/account/FavoritosTab";
import { User, Heart, Phone, Receipt } from "lucide-react";

const tabs = [
  { id: "perfil",    label: "Perfil",    Icon: User },
  { id: "favoritos", label: "Favoritos", Icon: Heart },
  { id: "contactos", label: "Contactos", Icon: Phone },
  { id: "historico", label: "Histórico", Icon: Receipt },
];

export function Tabs() {
  const [active, setActive] = useState("perfil");

  return (
    <div className="w-full mt-6">
      <div className="flex border-b border-gray-200 overflow-x-auto">
        {tabs.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className={`flex items-center gap-2 px-4 sm:px-5 py-3.5 text-sm font-medium whitespace-nowrap transition border-b-2 -mb-px hover:cursor-pointer ${
              active === id
                ? "border-mint text-black"
                : "border-transparent text-zinc-500 hover:text-black"
            }`}
          >
            <Icon className="size-4" />
            {label}
          </button>
        ))}
      </div>

      <div className="py-6">
        {active === "perfil"    && <AccountTab />}
        {active === "favoritos" && <FavoritosTab />}
        {active === "contactos" && <HistoryTab />}
        {active === "historico" && <PaymentTab />}
      </div>
    </div>
  );
}
