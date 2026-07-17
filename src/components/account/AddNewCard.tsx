import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CirclePlus } from "lucide-react";
import { FloatingLabelInput } from "../FloatingLabelInput";
import { FloatingLabelSelect } from "../FloatingLabelSelect";

export default function AddNewCard() {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="h-full flex flex-col justify-center items-center space-y-2 outline-2 outline-dashed outline-mint rounded-lg hover:bg-mint hover:bg-opacity-10 transition-all duration-200 ease-in-out cursor-pointer text-mint hover:text-black">
          <CirclePlus className="text-sm size-10" strokeWidth={1} />
          <p className="text-xs">Add New Card</p>
        </div>
      </DialogTrigger>
      <DialogContent className="font-montserrat py-10 px-10">
        <DialogHeader className="font-montserrat">
          <DialogTitle className="text-3xl my-4">Add New Card</DialogTitle>
          <div className="flex flex-col space-y-4">
            <FloatingLabelInput label="Card Number" name="cardNumber" type="number"/>
            <div className="flex gap-4">
              <FloatingLabelInput label="Exp. Date" name="expDate" type="text"/>
              <FloatingLabelInput label="CVC" name="cvc" type="number"/>
            </div>
            <FloatingLabelInput label="Card Number" name="cardNumber" type="number"/>
            <FloatingLabelSelect label="Country or Region" name="country"
            options={
              [
                { value: "USA", label: "United States" },
                { value: "CAN", label: "Canada" },
                { value: "MOZ", label: "Mozambique" },
              ]
            }/>
            <div className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <label htmlFor="remember-me" className="text-xs">
               Securely save my information for 1-click checkout
              </label>
              </div>
              <button className="w-full bg-mint text-black py-3 rounded text-xs font-semibold hover:cursor-pointer hover:ease-in-out hover:bg-mint/80">Add Card</button>
              <p className="text-xs text-center text-gray-500">By confirming your subscription, you allow The Outdoor Inn Crowd Limited to charge your card for this payment and future payments in accordance with their terms. You can always cancel your subscription.</p>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
