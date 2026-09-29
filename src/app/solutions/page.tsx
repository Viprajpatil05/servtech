"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Auralis from "@/components/Auralis";

export default function SolutionsPage() {
  const pillars = [
    {
      title: "Cloud",
      tagline: "Infrastructure without boundaries.",
      desc: "Scalable, flexible, modern infrastructure built for modern workloads and digital transformation.",
      color: "#0ea5e9"
    },
    {
      title: "Networking",
      tagline: "Connecting everything that matters.",
      desc: "The digital foundation connecting systems, users, applications, data, and infrastructure with high-performance reliability.",
      color: "#f97316"
    },
    {
      title: "Cybersecurity",
      tagline: "Defending what's connected.",
      desc: "Protection, resilience, visibility, and trust across your entire technology environment. Secure digital infrastructure.",
      color: "#0ea5e9"
    },
    {
      title: "Artificial Intelligence",
      tagline: "Turning infrastructure into intelligence.",
      desc: "Machine intelligence, automation, analytics, and intelligent operations for a data-driven infrastructure.",
      color: "#f97316"
    }
  ];

  return (
    <main className="min-h-screen bg-white flex flex-col relative w-full overflow-hidden">
      <div className="absolute inset-0 z-0 h-screen">
        <Auralis speed={0.2} grain={0} />
      </div>

      <Navbar />
      
      <div className="flex-grow z-10 pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="max-w-4xl mx-auto text-center mb-24">
          <h1 className="text-5xl md:text-6xl font-bold text-[#1c1c1c] mb-6 tracking-tight">
            One connected technology ecosystem.
          </h1>
          <p className="text-xl text-gray-600 font-medium leading-relaxed max-w-2xl mx-auto">
            We architect and integrate comprehensive digital environments through our four core technology pillars.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((pillar, idx) => (
            <div key={idx} className="group relative bg-white border border-gray-100 p-10 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full" style={{ backgroundColor: pillar.color }}></div>
              <h3 className="text-3xl font-bold text-[#1c1c1c] mb-2">{pillar.title}</h3>
              <h4 className="text-lg font-semibold text-gray-500 mb-6">{pillar.tagline}</h4>
              <p className="text-gray-600 leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
