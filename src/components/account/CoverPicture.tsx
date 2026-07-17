import { Upload } from "lucide-react";

export default function CoverPicture() {
  return (
    <div className="w-4/5 h-80 mt-10 relative rounded-lg overflow-hidden shadow-md group bg-gradient-to-br from-zinc-200 to-zinc-300">
      <button className="absolute bottom-4 right-4 bg-mint hover:bg-mint/80 text-gray-800 px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-all shadow-md hover:shadow-lg cursor-pointer z-10">
        <Upload className="h-4 w-4" />
        <span className="text-xs">Upload new cover</span>
      </button>
    </div>
  );
}
