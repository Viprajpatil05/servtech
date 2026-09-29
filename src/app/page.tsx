import { Navbar } from "@/components/Navbar";
import { DynamicParticleWorld } from "@/components/DynamicParticleWorld";
import Auralis from "@/components/Auralis";

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden">
      {/* Background layer */}
      <div className="absolute inset-0 z-0">
        <Auralis speed={0.4} grain={0} />
      </div>

      {/* 3D Canvas Background & Scroll Handler */}
      <div className="absolute inset-0 z-0">
        <DynamicParticleWorld />
      </div>

      {/* Navbar sits above the canvas HTML overlay (z-[9999] beats the drei fixed overlay) */}
      <Navbar />
    </main>
  );
}
