import { Hero } from "@/components/sections/Hero";
import { DawnOfDinosaurs } from "@/components/sections/DawnOfDinosaurs";
import { JurassicGiants } from "@/components/sections/JurassicGiants";
import { Predators } from "@/components/sections/Predators";
import { FlyingReptiles } from "@/components/sections/FlyingReptiles";
import { OceanMonsters } from "@/components/sections/OceanMonsters";
import { Extinction } from "@/components/sections/Extinction";
import { Discovery } from "@/components/sections/Discovery";
import { SiteNav } from "@/components/ui/SiteNav";
import { SiteFooter } from "@/components/ui/SiteFooter";

/**
 * The journey, in order: night vigil → Triassic dawn → Jurassic forest →
 * the tyrant's spotlight → the open sky → the deep sea → the impact →
 * the museum of the present.
 */
export default function Home() {
  return (
    <>
      <SiteNav />
      <main id="main">
        <Hero />
        <DawnOfDinosaurs />
        <JurassicGiants />
        <Predators />
        <FlyingReptiles />
        <OceanMonsters />
        <Extinction />
        <Discovery />
      </main>
      <SiteFooter />
    </>
  );
}
