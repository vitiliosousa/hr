import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import avatar from "@/assets/avatar.svg";
import { User, CreditCard, Home, HelpCircle, LogOut, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function AvatarDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <Image
          src={avatar}
          alt="avatar"
          width={36}
          height={36}
          className="rounded-full hover:cursor-pointer ring-2 ring-transparent hover:ring-mint transition"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="px-4 font-montserrat w-56" align="end">
        <div className="flex items-center gap-3 p-3">
          <Image src={avatar} alt="avatar" width={48} height={48} className="rounded-full" />
          <div>
            <p className="font-semibold text-sm">João D.</p>
            <p className="text-xs text-mint">● Online</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <div className="flex flex-col py-2 gap-1">
          <Link href="/conta">
            <div className="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-gray-50 hover:text-mint cursor-pointer transition">
              <div className="flex gap-2 items-center text-sm">
                <User className="w-4 h-4" />
                Minha conta
              </div>
              <ChevronRight className="w-4 h-4" />
            </div>
          </Link>
          <Link href="/meus-imoveis">
            <div className="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-gray-50 hover:text-mint cursor-pointer transition">
              <div className="flex gap-2 items-center text-sm">
                <Home className="w-4 h-4" />
                Os meus imóveis
              </div>
              <ChevronRight className="w-4 h-4" />
            </div>
          </Link>
          <Link href="/conta">
            <div className="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-gray-50 hover:text-mint cursor-pointer transition">
              <div className="flex gap-2 items-center text-sm">
                <CreditCard className="w-4 h-4" />
                Pagamentos
              </div>
              <ChevronRight className="w-4 h-4" />
            </div>
          </Link>
        </div>
        <DropdownMenuSeparator />
        <div className="flex flex-col py-2 gap-1">
          <div className="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-gray-50 hover:text-mint cursor-pointer transition">
            <div className="flex gap-2 items-center text-sm">
              <HelpCircle className="w-4 h-4" />
              Suporte
            </div>
            <ChevronRight className="w-4 h-4" />
          </div>
          <Link href="/entrar">
            <div className="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-red-50 hover:text-red-500 cursor-pointer transition">
              <div className="flex gap-2 items-center text-sm">
                <LogOut className="w-4 h-4" />
                Terminar sessão
              </div>
            </div>
          </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
