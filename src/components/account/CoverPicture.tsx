import { Upload } from "lucide-react";

export default function CoverPicture() {
  return (
    <div className="relative w-full h-48 sm:h-56 bg-gradient-to-br from-zinc-200 to-zinc-300 overflow-hidden">
      <button className="absolute bottom-4 right-4 bg-mint hover:bg-mint/80 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition shadow-sm hover:cursor-pointer">
        <Upload className="h-4 w-4" />
        <span className="text-xs">Alterar capa</span>
      </button>
    </div>
  );
}
