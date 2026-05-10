import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import DemoPreview from "@/components/DemoPreview";
import Compare from "@/components/Compare";
import HowItWorks from "@/components/HowItWorks";
import ClosingCTA from "@/components/ClosingCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <DemoPreview />
        <Compare />
        <HowItWorks />
        <ClosingCTA />
      </main>
      <Footer />
    </>
  );
}
