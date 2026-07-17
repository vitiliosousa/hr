import Header from "@/components/Header";
import Hero from "@/components/landing/Hero";
import Categorias from "@/components/landing/Categorias";
import PlanYourPerfectTrip from "@/components/landing/PlanYourPerfectTrip";
import ImoveisRecentes from "@/components/landing/ImoveisRecentes";
import ExplorarCidade from "@/components/landing/ExplorarCidade";
import FlightsHotels from "@/components/landing/FlightsHotels";
import PorqueEscolherNos from "@/components/landing/PorqueEscolherNos";
import Estatisticas from "@/components/landing/Estatisticas";
import Testemunhos from "@/components/landing/Testemunhos";
import PubliqueImovel from "@/components/landing/PubliqueImovel";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="w-full flex flex-col font-montserrat">
      <Header />
      <Hero />
      <Categorias />
      <PlanYourPerfectTrip />
      <ImoveisRecentes />
      <ExplorarCidade />
      <FlightsHotels />
      <PorqueEscolherNos />
      <Estatisticas />
      <Testemunhos />
      <PubliqueImovel />
      <Footer />
    </div>
  );
}
