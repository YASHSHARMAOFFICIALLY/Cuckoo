import EmiCalculator from "@/components/tools/emicalculatortools"
import ToolGrid from "@/components/tools/toolsgrid"
import StockMarketTool from "@/components/tools/stockmarkettools"
import ToolsHero from "@/components/tools/toolshero"
import GoalTracker from "@/components/tools/goaltrackertools"
import Newsletter from "@/components/tools/Newsletter"
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import ToolsGrid from "@/components/tools/toolsgrid"
import SipCalculator from "@/components/tools/sipcalculatortools"


export default function Tools() {
  return (
    <div className="bg-white dark:bg-[#0a0a0a] min-h-screen font-sans antialiased">
      <Navbar />
      <main>
       <ToolsHero/>
        {/* Divider */}
        <div className="max-w-6xl mx-auto px-6">
          <div className="h-px bg-[#F0F0F0] dark:bg-[#222]" />
        </div>
        <ToolsGrid/>
        <StockMarketTool/>
        <SipCalculator />
        <EmiCalculator/>
        <GoalTracker/>  
       <Newsletter/>
      </main>
      <Footer />
    </div>
  );
}
 
