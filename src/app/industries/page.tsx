"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Auralis from "@/components/Auralis";

export default function IndustriesPage() {
  const environments = [
    "Government",
    "Public Sector",
    "BFSI",
    "Energy",
    "Oil & Gas",
    "Infrastructure",
    "Transportation",
    "Airports",
    "Large Enterprises",
    "Data Center Environments"
  ];

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col relative w-full overflow-hidden">
      <div className="absolute inset-0 z-0 h-screen">
        <Auralis speed={0.3} grain={0.05} />
      </div>

      <Navbar />
      
      <div className="flex-grow z-10 pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="max-w-3xl mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-[#1c1c1c] mb-6 tracking-tight">
            Built for complex technology environments.
          </h1>
          <p className="text-xl text-gray-600 font-medium leading-relaxed">
            Servtech is positioned for organizations and projects that require enterprise-scale and mission-critical technology infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {environments.map((env, idx) => (
            <div key={idx} className="bg-white border border-gray-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-center justify-center text-center h-32">
              <span className="font-semibold text-[#1c1c1c]">{env}</span>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
