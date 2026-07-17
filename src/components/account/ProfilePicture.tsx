import { Edit, User } from "lucide-react";

export default function ProfilePicture() {
  return (
    <div className="flex items-center flex-col justify-center">
      <div className="relative w-full flex justify-center -mt-16">
        <div className="relative group">
          <div className="relative h-32 w-32 rounded-full border-4 border-mint overflow-hidden shadow-lg bg-zinc-200 flex items-center justify-center">
            <User className="size-14 text-zinc-400" />
          </div>
          <div className="absolute bottom-2 right-2 bg-mint p-2 rounded-full cursor-pointer hover:bg-mint/80 transition-colors">
            <Edit className="h-4 w-4 text-white" />
          </div>
        </div>
      </div>
      <h1 className="font-semibold mt-4">John Doe</h1>
      <p className="text-xs">john.doe@gmail.com</p>
    </div>
  );
}
