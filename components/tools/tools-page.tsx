import EmiCalculator from "@/components/tools/emicalculatortools";
import StockMarketTool from "@/components/tools/stockmarkettools";
import GoalTracker from "@/components/tools/goaltrackertools";
import ToolsHero from "@/components/tools/toolshero";
import Newsletter from "@/components/tools/Newsletter";
import ToolsGrid from "@/components/tools/toolsgrid";
import SipCalculator from "@/components/tools/sipcalculatortools";

export default function ToolsPage() {
  return (
    <>
      <ToolsHero />

      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-[#F0F0F0] dark:bg-[#222]" />
      </div>

      <ToolsGrid />
      <StockMarketTool />
      <SipCalculator />
      <EmiCalculator />
      <GoalTracker />
      <Newsletter />
    </>
  );
}