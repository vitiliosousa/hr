import Card from "@/components/account/Card";
import AddNewCard from "@/components/account/AddNewCard";

export default function PaymentTab() {
  return (
    <div className="flex flex-col w-full space-y-4">
      <h1 className="text-2xl">Payment Methods</h1>
      <div className="bg-white w-full shadow-lg py-6 px-4 grid grid-cols-3 rounded-lg gap-4">
        <Card/>
        <AddNewCard/>
      </div>
    </div>
  );
}
