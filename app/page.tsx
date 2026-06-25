import { Hero } from "@/components/Hero";
import { RetroMarquee } from "@/components/RetroMarquee";
import { RetroDivider } from "@/components/RetroDivider";
import { WhatIDo } from "@/components/WhatIDo";
import { Projects } from "@/components/Projects";
import { Certifications } from "@/components/Certifications";
import { Timeline } from "@/components/Timeline";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ScrollHUD } from "@/components/ScrollHUD";

export default function Home() {
  return (
    <main className="relative">
      {/* journey indicator spans the whole page */}
      <ScrollHUD />

      <Hero />
      <RetroMarquee />
      <WhatIDo />
      <RetroDivider label="compiling projects.exe" />
      <Projects />
      <RetroDivider label="verifying credentials" />
      <Certifications />
      <RetroDivider label="reading career.log" />
      <Timeline />
      <Contact />
      <Footer />
    </main>
  );
}
