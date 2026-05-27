import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Directions } from "@/components/Directions";
import { WorldMap } from "@/components/WorldMap";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { SectionIndicator } from "@/components/SectionIndicator";

export default function Index() {
  return (
    <>
      <SectionIndicator />
      <Hero />
      <About />
      <Directions />
      <WorldMap />
      <Contact />
      <Footer />
    </>
  );
}
