"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Auralis from "@/components/Auralis";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col relative w-full overflow-hidden">
      {/* Background layer */}
      <div className="absolute inset-0 z-0 h-screen">
        <Auralis speed={0.2} grain={0.05} />
      </div>

      <Navbar />
      
      <div className="flex-grow z-10 pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="max-w-3xl mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-[#1c1c1c] mb-6 tracking-tight">
            Technology is more powerful when it works together.
          </h1>
          <p className="text-xl text-gray-600 font-medium leading-relaxed">
            Servtech Horizon Technologies is an enterprise technology partner and system integrator. We don't look at technologies as isolated products; we build interconnected ecosystems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
          <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-[#1c1c1c] mb-4">Our Philosophy</h3>
            <p className="text-gray-600 leading-relaxed">
              Modern infrastructure is interconnected. Cloud does not exist independently. Networking connects the infrastructure. Cybersecurity protects it. AI makes it more intelligent. Servtech brings these technology layers together.
            </p>
          </div>
          <div className="bg-[#1c1c1c] p-10 rounded-2xl shadow-lg border border-gray-800 text-white">
            <h3 className="text-2xl font-bold mb-4">System Integration</h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              A key part of our identity is our ability to bring technologies together. We emphasize integration, interoperability, and architecture for complex enterprise environments.
            </p>
            <div className="h-1 w-12 bg-[#f97316]"></div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
