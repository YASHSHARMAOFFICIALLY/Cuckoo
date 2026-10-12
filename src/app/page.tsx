import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import TrustStrip from "@/components/sections/TrustStrip";
import Work from "@/components/sections/Work";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Ownership from "@/components/sections/Ownership";
import Faq from "@/components/sections/Faq";
import FinalCta from "@/components/sections/FinalCta";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TrustStrip />
        <Work />
        <Services />
        <Process />
        <Ownership />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
