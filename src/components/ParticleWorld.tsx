"use client";

// ... imports ...
import { Canvas } from "@react-three/fiber";
import { ParticleSystem } from "./ParticleSystem";
import { Suspense, useRef, useEffect } from "react";
import { ScrollControls, Scroll, useScroll, useGLTF, Environment, Center } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Footer } from "./Footer";

// A component to handle native GLTF models synced with scroll
function NativeModels() {
  const scroll = useScroll();
  
  // Load the native models
  const cloud = useGLTF('/cloud.glb');
  const cloud2 = useGLTF('/cloud_2.glb');
  const networking = useGLTF('/networking.glb');
  const security = useGLTF('/security.glb');
  const ai = useGLTF('/ai.glb');

  // Refs for animating each model independently
  const cloudRef = useRef<THREE.Group>(null);
  const cloud2Ref = useRef<THREE.Group>(null);
  const networkRef = useRef<THREE.Group>(null);
  const securityRef = useRef<THREE.Group>(null);
  const aiRef = useRef<THREE.Group>(null);

  // Refs for the glowing frames
  const cloudFrameRef = useRef<THREE.Group>(null);
  const networkFrameRef = useRef<THREE.Group>(null);
  const securityFrameRef = useRef<THREE.Group>(null);
  const aiFrameRef = useRef<THREE.Group>(null);

  // ScrollControls has 11 pages total (see <ScrollControls pages={11} .../> below).
  // scroll.offset runs from 0 (top) to 1 (bottom) across ALL pages, so each page
  // only "owns" a 1/11 slice of that range. To make a model appear only while its
  // own section is on screen, we target the exact center of that page's slice and
  // cap the fade width at half a page — that way scale hits 0 exactly at the page's
  // own start/end boundaries instead of bleeding into the previous/next section.
  const TOTAL_PAGES = 11;
  const PAGE_FRACTION = 1 / TOTAL_PAGES;
  const pageCenter = (pageIndex: number) => (pageIndex + 0.5) * PAGE_FRACTION;
  const FADE_WIDTH = PAGE_FRACTION / 2; // fully faded out by the adjacent page's edge

  useFrame((state) => {
    if (!scroll) return;
    const offset = scroll.offset; // 0 to 1

    // Helper to calculate scale based on distance to the target offset (bell curve)
    const getScale = (targetOffset: number, width = FADE_WIDTH) => {
      const dist = Math.abs(offset - targetOffset);
      return Math.max(0, 1 - dist / width);
    };

    const time = state.clock.elapsedTime;

    const CLOUD_CENTER = pageCenter(1); // Page 2 (Cloud)
    
    const NETWORK_CENTER = pageCenter(2); // Page 3 (Networking)
 
    const SECURITY_CENTER = pageCenter(3); // Page 4 (Cybersecurity)
    const AI_CENTER = pageCenter(4); // Page 5 (AI)

    if (cloudRef.current) {
      const s = getScale(CLOUD_CENTER);
      cloudRef.current.scale.setScalar(s * 0.8); // Top cloud scale
      cloudRef.current.position.set(10, Math.sin(time) * 0.2 + 3, 0); // Positioned higher
      cloudRef.current.rotation.y = time * 0.1;
      cloudRef.current.visible = s > 0;
    }

    if (cloud2Ref.current) {
      const s = getScale(CLOUD_CENTER);
      cloud2Ref.current.scale.setScalar(s * 0.15); // Adjusting size to fit as a base
      cloud2Ref.current.position.set(10, Math.sin(time) * 0.2 - 2, 0); // Positioned much lower so cloud sits on top
      cloud2Ref.current.rotation.y = time * 0.1; // EXACT same rotation as top cloud to lock them together
      cloud2Ref.current.visible = s > 0;
    }

    if (cloudFrameRef.current) {
      const s = getScale(CLOUD_CENTER);
      cloudFrameRef.current.scale.setScalar(s);
      cloudFrameRef.current.position.set(10, Math.sin(time) * 0.2 + 0.5, 0); // Centered between the two clouds
      cloudFrameRef.current.visible = s > 0;
    }

    if (networkRef.current) {
      const s = getScale(NETWORK_CENTER);
      networkRef.current.scale.setScalar(s * 0.18); // 3x bigger than last try
      networkRef.current.position.set(-10, Math.sin(time + 1) * 0.5 - 0.5, 0);
      networkRef.current.rotation.y = -time * 0.35 + Math.PI / 8; // Slight angle
      networkRef.current.visible = s > 0;
    }

    if (networkFrameRef.current) {
      const s = getScale(NETWORK_CENTER);
      networkFrameRef.current.scale.setScalar(s);
      networkFrameRef.current.position.set(-10, Math.sin(time + 1) * 0.5 - 0.5, 0);
      networkFrameRef.current.visible = s > 0;
    }

    if (securityRef.current) {
      const s = getScale(SECURITY_CENTER);
      securityRef.current.scale.setScalar(s * 3.5); // Reduced from 5
      securityRef.current.position.set(10, Math.sin(time + 2) * 0.2 - 1, 0); // Moved down and slightly right
      securityRef.current.rotation.y = time * 0.2;
      securityRef.current.visible = s > 0;
    }

    if (securityFrameRef.current) {
      const s = getScale(SECURITY_CENTER);
      securityFrameRef.current.scale.setScalar(s);
      securityFrameRef.current.position.set(10, Math.sin(time + 2) * 0.2 - 1.0, 0);
      securityFrameRef.current.visible = s > 0;
    }

    if (aiRef.current) {
      const s = getScale(AI_CENTER);
      aiRef.current.scale.setScalar(s * 0.15); // Increased from 0.03
      aiRef.current.position.set(-10, Math.sin(time + 3) * 0.2 - 0.5, 0); // Moved further left
      aiRef.current.rotation.y = time * 0.1;
      aiRef.current.visible = s > 0;
    }

    if (aiFrameRef.current) {
      const s = getScale(AI_CENTER);
      aiFrameRef.current.scale.setScalar(s);
      aiFrameRef.current.position.set(-10, Math.sin(time + 3) * 0.2 - 0.5, 0);
      aiFrameRef.current.visible = s > 0;
    }
  });

  return (
    <>
      <group ref={cloudRef}>
        <Center><primitive object={cloud.scene} /></Center>
      </group>
      <group ref={cloud2Ref}>
        <Center><primitive object={cloud2.scene} /></Center>
      </group>
      <group ref={networkRef}>
        <Center><primitive object={networking.scene} /></Center>
      </group>
      <group ref={securityRef}>
        <Center><primitive object={security.scene} /></Center>
      </group>
      <group ref={aiRef}>
        <Center><primitive object={ai.scene} /></Center>
      </group>
    </>
  );
}

// Preload models so they are ready instantly
useGLTF.preload('/cloud.glb');
useGLTF.preload('/cloud_2.glb');
useGLTF.preload('/networking.glb');
useGLTF.preload('/security.glb');
useGLTF.preload('/ai.glb');

export function ParticleWorld() {
  return (
    <Canvas
      camera={{ position: [0, 0, 15], fov: 60 }}
      dpr={[1, 2]} 
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
    >
      <Suspense fallback={null}>
        {/* Superior Environment Lighting for realistic PBR materials */}
        <Environment preset="city" />
        <ambientLight intensity={1.5} />
        <directionalLight position={[0, 0, 10]} intensity={2.5} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} />
        <directionalLight position={[-10, -10, -10]} intensity={1} />
        
        <ScrollControls pages={11} damping={0.2}>
          {/* Background Particles replaced by Auralis in page.tsx */}
          
          {/* Native 3D Models */}
          <NativeModels />

          {/* HTML Text Overlay (Without Iframes) */}
          <Scroll html style={{ width: "100%", height: "100%" }}>
            {/* PAGE 1: HERO */}
<section className="relative h-screen w-full flex flex-col px-6 pt-24 pb-10 overflow-hidden">

  {/* HERO CONTENT */}
  <div className="flex-1 flex flex-col items-center justify-center text-center">

    <p className="text-sm md:text-base font-bold tracking-[0.2em] text-gray-500 mb-6 uppercase">
      Servtech Horizon Technologies
    </p>

    <h1 className="
      text-[clamp(2.8rem,6vw,6.5rem)]
      font-black
      tracking-[-0.055em]
      text-transparent
      bg-clip-text
      bg-gradient-to-br
      from-gray-950
      via-gray-800
      to-gray-600
      leading-[0.88]
      font-heading
      drop-shadow-sm
      max-w-[1250px]
      mx-auto
    ">
      <span className="block">Engineering the</span>
      <span className="block">Infrastructure Behind</span>
      <span className="block">What&apos;s Next.</span>
    </h1>

    <p className="
      text-base
      md:text-lg
      lg:text-xl
      text-gray-600
      font-medium
      mt-5
      max-w-3xl
      mx-auto
      leading-relaxed
    ">
      We design and integrate the technology foundations that modern
      organizations depend on — connecting cloud, networks, cybersecurity
      and intelligent systems into infrastructure built for the future.
    </p>

    {/* TECHNOLOGY AREAS */}
    <p className="
      text-xs
      md:text-sm
      font-bold
      tracking-[0.2em]
      text-[#1c1c1c]
      mt-5
      uppercase
    ">
      Cloud
      <span className="text-[#f97316] mx-2">·</span>

      Networking
      <span className="text-[#f97316] mx-2">·</span>

      Cybersecurity
      <span className="text-[#f97316] mx-2">·</span>

      AI
    </p>

    {/* CTA BUTTONS */}
    <div className="
      flex
      flex-col
      sm:flex-row
      items-center
      justify-center
      gap-4
      mt-6
    ">
      <button className="
        bg-[#1c1c1c]
        text-white
        px-7
        py-3
        rounded-full
        text-sm
        md:text-base
        font-semibold
        hover:bg-gray-800
        transition-all
        hover:shadow-xl
        hover:-translate-y-1
      ">
        Explore Our Technology
      </button>

      <button className="
        bg-white/60
        backdrop-blur-sm
        border
        border-gray-300
        text-[#1c1c1c]
        px-7
        py-3
        rounded-full
        text-sm
        md:text-base
        font-semibold
        hover:bg-white
        transition-all
      ">
        Talk to an Expert
      </button>
    </div>

  </div>

  {/* BOTTOM MESSAGE */}
  <div className="
    w-full
    max-w-4xl
    mx-auto
    text-center
    mt-6
  ">
    <h3 className="
      text-lg
      md:text-xl
      font-bold
      text-[#1c1c1c]
      mb-2
      font-heading
    ">
      Technology Does Not Work in Isolation.
    </h3>

    <p className="
      text-xs
      md:text-sm
      text-gray-500
      font-medium
      leading-relaxed
    ">
      Infrastructure must connect. Networks must perform. Data must remain
      protected. Intelligence must drive what comes next. At Servtech, we
      bring these technologies together.
    </p>
  </div>

</section>
            {/* PAGE 2: CLOUD */}
            <section className="h-screen w-screen flex flex-col justify-between overflow-hidden pl-[10%] pr-4 pt-20 pb-6 relative">
              <div className="max-w-2xl pointer-events-auto my-auto py-6">
                <p className="text-sm font-bold tracking-widest text-gray-400 mb-4 uppercase">01 / Cloud</p>
                <h2 className="text-[clamp(2.6rem,5vw,5rem)] font-bold font-heading tracking-[-0.05em] text-[#1c1c1c] mb-4 leading-[0.95] max-w-[620px]">
                  <span className="block">Infrastructure Without</span>
                  <span className="block">Boundaries.</span>
                </h2>
                <p className="text-lg text-gray-600 font-medium mb-4 leading-relaxed max-w-[620px]">
                  Modern organizations need infrastructure that can adapt to changing demands. Servtech helps organizations build cloud environments designed for flexibility, performance and scalability.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div>
                    <h4 className="font-bold text-[#1c1c1c] mb-1">Cloud Infrastructure</h4>
                    <p className="text-sm text-gray-500">Build modern infrastructure designed for evolving requirements.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1c1c1c] mb-1">Compute & Storage</h4>
                    <p className="text-sm text-gray-500">Create scalable foundations for enterprise workloads.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1c1c1c] mb-1">Cloud Integration</h4>
                    <p className="text-sm text-gray-500">Connect cloud environments with the wider ecosystem.</p>
                  </div>
                </div>
                <div className="mt-6 p-4 border-l-4 border-[#f97316] bg-gray-50">
                  <p className="font-semibold italic text-gray-700">`Infrastructure should adapt as fast as your ambitions do.`</p>
                </div>
              </div>
              <div className="max-w-2xl pointer-events-auto pb-4">
                <h3 className="text-lg font-bold text-[#1c1c1c] mb-2">Infrastructure Is Only Powerful When It Is Connected.</h3>
                <p className="text-gray-500 text-sm">Every application, user, and workload depends on connectivity. The cloud becomes more powerful when it connects seamlessly with everything around it.</p>
              </div>
            </section>
            
            {/* PAGE 3: NETWORKING */}
            <section className="h-screen w-screen flex flex-col items-end justify-between overflow-hidden pr-[10%] pl-4 pt-20 pb-6 text-right relative">
              <div className="max-w-2xl pointer-events-auto my-auto py-6">
                <p className="text-sm font-bold tracking-widest text-gray-400 mb-4 uppercase">02 / Networking</p>
                <h2 className="text-[clamp(2.4rem,4.5vw,4.5rem)] font-bold font-heading tracking-[-0.05em] text-[#1c1c1c] mb-6 leading-[0.95] max-w-[620px] ml-auto">
                  <span className="block">Connecting Everything</span>
                  <span className="block">That Matters.</span>
                </h2>
                <p className="text-lg text-gray-600 font-medium mb-4 leading-relaxed max-w-[620px] ml-auto">
                  The network is the digital backbone of the modern organization. Servtech helps build and integrate network environments designed to connect people, applications, systems and infrastructure.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-6 text-left">
                  <div>
                    <h4 className="font-bold text-[#1c1c1c] mb-1">Enterprise Networking</h4>
                    <p className="text-sm text-gray-500">Reliable and high-performance connectivity.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1c1c1c] mb-1">Network Infrastructure</h4>
                    <p className="text-sm text-gray-500">Design the technology foundation for modern operations.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1c1c1c] mb-1">Secure Connectivity</h4>
                    <p className="text-sm text-gray-500">Bring connectivity and protection together.</p>
                  </div>
                </div>
                <div className="mt-6 p-4 border-r-4 border-[#f97316] bg-gray-50 text-right">
                  <p className="font-semibold italic text-gray-700">`Every connection is part of something bigger.`</p>
                </div>
              </div>
              <div className="max-w-2xl text-right pointer-events-auto pb-4">
                <h3 className="text-lg font-bold text-[#1c1c1c] mb-2">Every Connection Creates a Responsibility.</h3>
                <p className="text-gray-500 text-sm">As digital environments become more connected, protecting them becomes critical. Infrastructure must not only perform. It must remain resilient.</p>
              </div>
            </section>
            
            {/* PAGE 4: CYBERSECURITY */}
            <section className="h-screen w-screen flex flex-col justify-between overflow-hidden pl-[10%] pr-4 pt-20 pb-6 relative">
              <div className="max-w-2xl pointer-events-auto my-auto py-6">
                <p className="text-sm font-bold tracking-widest text-gray-400 mb-4 uppercase">03 / Cybersecurity</p>
                <h2 className="text-[clamp(2.4rem,4.5vw,4.5rem)] font-bold font-heading tracking-[-0.05em] text-[#1c1c1c] mb-6 leading-[0.95] max-w-[620px]">
                  <span className="block">Defending What&apos;s</span>
                  <span className="block">Connected.</span>
                </h2>
                <p className="text-lg text-gray-600 font-medium mb-4 leading-relaxed max-w-[620px]">
                  Servtech helps organizations strengthen the security of their digital infrastructure by bringing security considerations into the broader technology ecosystem.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div>
                    <h4 className="font-bold text-[#1c1c1c] mb-1">Network Security</h4>
                    <p className="text-sm text-gray-500">Strengthen the protection of connected infrastructure.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1c1c1c] mb-1">Cyber Resilience</h4>
                    <p className="text-sm text-gray-500">Respond and adapt in an evolving technology landscape.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1c1c1c] mb-1">Integrated Security</h4>
                    <p className="text-sm text-gray-500">Bring cybersecurity into the wider infrastructure ecosystem.</p>
                  </div>
                </div>
                <div className="mt-6 p-4 border-l-4 border-[#f97316] bg-gray-50">
                  <p className="font-semibold italic text-gray-700">`Protection should be part of the infrastructure, not an afterthought.`</p>
                </div>
              </div>
              <div className="max-w-2xl pointer-events-auto pb-4">
                <h3 className="text-lg font-bold text-[#1c1c1c] mb-2">Protection Creates Data. Data Creates Intelligence.</h3>
                <p className="text-gray-500 text-sm">The next stage of infrastructure is not simply processing more data. It is understanding it.</p>
              </div>
            </section>
            
            {/* PAGE 5: AI */}
            <section className="h-screen w-screen flex flex-col items-end justify-center overflow-hidden pr-[10%] pl-4 text-right relative">
              <div className="max-w-2xl pointer-events-auto">
                <p className="text-sm font-bold tracking-widest text-gray-400 mb-4 uppercase">04 / Artificial Intelligence</p>
                <h2 className="text-[clamp(2.4rem,4.5vw,4.5rem)] font-bold font-heading tracking-[-0.05em] text-[#1c1c1c] mb-6 leading-[0.95] max-w-[620px] ml-auto">
                  <span className="block">Turning Infrastructure</span>
                  <span className="block">Into Intelligence.</span>
                </h2>
                <p className="text-lg text-gray-600 font-medium mb-4 leading-relaxed max-w-[620px] ml-auto">
                  Servtech explores how intelligent systems can support more efficient operations, better decision-making and the evolution of digital infrastructure.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-6 text-left">
                  <div>
                    <h4 className="font-bold text-[#1c1c1c] mb-1">AI Solutions</h4>
                    <p className="text-sm text-gray-500">Intelligent technology applications for real requirements.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1c1c1c] mb-1">Automation</h4>
                    <p className="text-sm text-gray-500">Reduce repetitive processes and enable efficiency.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1c1c1c] mb-1">Intelligent Operations</h4>
                    <p className="text-sm text-gray-500">Use data to support better visibility and decision-making.</p>
                  </div>
                </div>
                <div className="mt-6 p-4 border-r-4 border-[#f97316] bg-gray-50 text-right">
                  <p className="font-semibold italic text-gray-700">`The future of infrastructure is not only connected. It is intelligent.`</p>
                </div>
              </div>
            </section>
            
            {/* PAGE 6: THE ECOSYSTEM */}
            <section className="h-screen w-screen flex flex-col items-center justify-center overflow-hidden text-center px-4">
              <div className="pointer-events-auto max-w-4xl">
                <p className="text-sm font-bold tracking-widest text-[#f97316] mb-4 uppercase">One Connected Ecosystem</p>
                <h2 className="text-[clamp(2.4rem,4.5vw,5rem)] font-bold font-heading tracking-[-0.05em] text-[#1c1c1c] mb-6 leading-[0.88] max-w-[1100px] mx-auto">
                  <span className="block">Four Technologies. One</span>
                  <span className="block">Integrated Infrastructure.</span>
                </h2>
                <p className="text-lg md:text-xl text-gray-600 font-medium mb-8 leading-relaxed max-w-[920px] mx-auto">
                  Cloud. Networking. Cybersecurity. Artificial Intelligence. These technologies do not operate independently. Servtech brings these technology layers together.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h4 className="font-bold text-[#1c1c1c] mb-2 text-xl">Cloud</h4>
                    <p className="text-gray-500 text-sm">The foundation to scale.</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h4 className="font-bold text-[#1c1c1c] mb-2 text-xl">Networking</h4>
                    <p className="text-gray-500 text-sm">The connections that keep everything moving.</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h4 className="font-bold text-[#1c1c1c] mb-2 text-xl">Security</h4>
                    <p className="text-gray-500 text-sm">The protection behind every connection.</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h4 className="font-bold text-[#1c1c1c] mb-2 text-xl">AI</h4>
                    <p className="text-gray-500 text-sm">The intelligence driving what comes next.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* PAGE 7: SYSTEM INTEGRATION */}
            <section className="h-screen w-screen flex flex-col justify-center overflow-hidden px-[10%] relative">
              <div className="max-w-3xl pointer-events-auto">
                <p className="text-sm font-bold tracking-widest text-[#f97316] mb-4 uppercase">The Servtech Approach</p>
                <h2 className="text-4xl md:text-5xl font-bold font-heading tracking-tight text-[#1c1c1c] mb-4 leading-tight">Technology Is More Powerful When It Works Together.</h2>
                <p className="text-lg text-gray-600 font-medium mb-6 leading-relaxed">
                  Organizations do not need another collection of disconnected technologies. They need infrastructure that works as an ecosystem.
                </p>
                <div className="space-y-4">
                  <div className="border-l-2 border-[#1c1c1c] pl-6">
                    <h4 className="font-bold text-[#1c1c1c] text-lg mb-1">Understand</h4>
                    <p className="text-gray-500">Every environment begins with understanding the technology landscape.</p>
                  </div>
                  <div className="border-l-2 border-[#1c1c1c] pl-6">
                    <h4 className="font-bold text-[#1c1c1c] text-lg mb-1">Integrate</h4>
                    <p className="text-gray-500">We bring technologies together to create more connected infrastructure.</p>
                  </div>
                  <div className="border-l-2 border-[#1c1c1c] pl-6">
                    <h4 className="font-bold text-[#1c1c1c] text-lg mb-1">Evolve</h4>
                    <p className="text-gray-500">Infrastructure must be designed with the future in mind.</p>
                  </div>
                </div>
              </div>
            </section>
            
            {/* PAGE 8: CAPABILITIES */}
            <section className="h-screen w-screen flex flex-col justify-center overflow-hidden px-[10%] relative">
              <div className="pointer-events-auto">
                <p className="text-sm font-bold tracking-widest text-gray-400 mb-4 uppercase">What We Build</p>
                <h2 className="text-4xl md:text-5xl font-bold font-heading tracking-tight text-[#1c1c1c] mb-4 leading-tight">Built for Complex Technology Environments.</h2>
                <p className="text-lg text-gray-600 font-medium mb-8 max-w-2xl leading-relaxed">
                  Servtech brings together the technologies and capabilities required to support complex digital environments.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-[#f97316] font-bold mb-2">01</p>
                    <h4 className="font-bold text-[#1c1c1c] text-xl mb-2">Digital Infrastructure</h4>
                    <p className="text-sm text-gray-500">Foundations designed to support modern operations.</p>
                  </div>
                  <div>
                    <p className="text-[#f97316] font-bold mb-2">02</p>
                    <h4 className="font-bold text-[#1c1c1c] text-xl mb-2">Enterprise Connectivity</h4>
                    <p className="text-sm text-gray-500">Network environments that connect people and systems.</p>
                  </div>
                  <div>
                    <p className="text-[#f97316] font-bold mb-2">03</p>
                    <h4 className="font-bold text-[#1c1c1c] text-xl mb-2">Secure Environments</h4>
                    <p className="text-sm text-gray-500">Integrated approaches to protecting infrastructure.</p>
                  </div>
                  <div>
                    <p className="text-[#f97316] font-bold mb-2">04</p>
                    <h4 className="font-bold text-[#1c1c1c] text-xl mb-2">Cloud Transformation</h4>
                    <p className="text-sm text-gray-500">Infrastructure designed for flexibility and scalability.</p>
                  </div>
                  <div>
                    <p className="text-[#f97316] font-bold mb-2">05</p>
                    <h4 className="font-bold text-[#1c1c1c] text-xl mb-2">Intelligent Technology</h4>
                    <p className="text-sm text-gray-500">AI and automation approaches for digital operations.</p>
                  </div>
                  <div>
                    <p className="text-[#f97316] font-bold mb-2">06</p>
                    <h4 className="font-bold text-[#1c1c1c] text-xl mb-2">System Integration</h4>
                    <p className="text-sm text-gray-500">Bringing technologies together into one environment.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* PAGE 9: INDUSTRIES */}
            <section className="h-screen w-screen flex flex-col justify-center overflow-hidden px-[10%] relative">
              <div className="pointer-events-auto">
                <p className="text-sm font-bold tracking-widest text-gray-400 mb-4 uppercase">Built for Complex Environments</p>
                <h2 className="text-4xl md:text-5xl font-bold font-heading tracking-tight text-[#1c1c1c] mb-4 leading-tight">Technology Where Performance Matters.</h2>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                  <div className="p-6 border border-gray-100 bg-white rounded-xl shadow-sm">
                    <h4 className="font-bold text-[#1c1c1c] mb-2">Government & Public Sector</h4>
                    <p className="text-sm text-gray-500">Large-scale digital environments and public services.</p>
                  </div>
                  <div className="p-6 border border-gray-100 bg-white rounded-xl shadow-sm">
                    <h4 className="font-bold text-[#1c1c1c] mb-2">BFSI</h4>
                    <p className="text-sm text-gray-500">Environments where performance and security are fundamental.</p>
                  </div>
                  <div className="p-6 border border-gray-100 bg-white rounded-xl shadow-sm">
                    <h4 className="font-bold text-[#1c1c1c] mb-2">Energy & Utilities</h4>
                    <p className="text-sm text-gray-500">Connected and operationally critical environments.</p>
                  </div>
                  <div className="p-6 border border-gray-100 bg-white rounded-xl shadow-sm">
                    <h4 className="font-bold text-[#1c1c1c] mb-2">Transportation & Infrastructure</h4>
                    <p className="text-sm text-gray-500">Supporting large-scale infrastructure operations.</p>
                  </div>
                  <div className="p-6 border border-gray-100 bg-white rounded-xl shadow-sm">
                    <h4 className="font-bold text-[#1c1c1c] mb-2">Enterprise</h4>
                    <p className="text-sm text-gray-500">Integrated technology foundations around evolving needs.</p>
                  </div>
                </div>
                <div className="mt-8 border-l-4 border-[#f97316] pl-4">
                  <h3 className="text-xl font-bold text-[#1c1c1c] italic">`Built for environments where technology cannot simply stop.`</h3>
                </div>
              </div>
            </section>
            
            {/* PAGE 10: WHY SERVTECH & IMPACT */}
            <section className="h-screen w-screen flex flex-col justify-center overflow-hidden px-[10%] relative">
              <div className="pointer-events-auto flex flex-col md:flex-row gap-6 md:gap-10 max-h-[85vh] overflow-hidden">
                <div className="md:w-1/2">
                  <p className="text-sm font-bold tracking-widest text-[#f97316] mb-3 uppercase">Why Servtech</p>
                  <h2 className="text-2xl md:text-3xl font-bold font-heading tracking-tight text-[#1c1c1c] mb-3 leading-tight">From Components to Connected Possibilities.</h2>
                  <p className="text-base text-gray-600 font-medium mb-4 leading-relaxed">
                    The challenge in modern technology is rarely finding a single product. The real challenge is making multiple technologies work together.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-bold text-[#1c1c1c] mb-1 text-sm">Integrated Thinking</h4>
                      <p className="text-xs text-gray-500">Looking beyond individual technologies.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1c1c1c] mb-1 text-sm">Technology Focus</h4>
                      <p className="text-xs text-gray-500">Understanding how infrastructure is evolving.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1c1c1c] mb-1 text-sm">Enterprise Perspective</h4>
                      <p className="text-xs text-gray-500">Focusing on complex environment demands.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1c1c1c] mb-1 text-sm">Future-Ready</h4>
                      <p className="text-xs text-gray-500">Supporting current requirements and what comes next.</p>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2 flex flex-col justify-center">
                  <h3 className="text-xl md:text-2xl font-bold text-[#1c1c1c] mb-4">Designed for the Infrastructure That Keeps Organizations Moving.</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-2xl font-bold text-[#f97316] mb-1">[50]+</p>
                      <p className="font-bold text-[#1c1c1c] text-sm">Projects Delivered</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[#f97316] mb-1">[20]+</p>
                      <p className="font-bold text-[#1c1c1c] text-sm">Technology Implementations</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[#f97316] mb-1">[100]+</p>
                      <p className="font-bold text-[#1c1c1c] text-sm">Enterprise Engagements</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[#f97316] mb-1">[150]+</p>
                      <p className="font-bold text-[#1c1c1c] text-sm">Technology Partners</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            {/* PAGE 11: FINAL CTA & FOOTER */}
            {/* Footer height is unknown here (imported component), so the hero/CTA block
                is a shrinkable flex item (flex-1 min-h-0) rather than a fixed size — it
                will size itself to whatever room is left after the Footer, instead of a
                guessed height that could either clip content or leave a gap. */}
            <section className="h-screen w-screen flex flex-col overflow-hidden relative pointer-events-auto">
              <div className="flex-1 min-h-0 flex flex-col items-center justify-center text-center px-4 py-3 overflow-hidden">
                <h1 className="text-[clamp(1.6rem,4.5vw,3rem)] font-black font-heading tracking-tighter text-[#1c1c1c] mb-3">
                  The Infrastructure Behind Whats Next.
                </h1>
                <p className="text-xs md:text-sm text-gray-600 font-medium mb-4 max-w-2xl leading-relaxed mx-auto">
                  The future will demand more from technology. More connectivity. More intelligence. More security. More adaptability. The infrastructure being built today must be ready for what comes next.
                </p>
                <div className="bg-white p-4 md:p-5 rounded-2xl shadow-xl border border-gray-100 max-w-xl w-full mx-auto">
                  <h3 className="text-lg font-bold text-[#1c1c1c] mb-2">Let's Build Whats Next.</h3>
                  <p className="text-gray-500 text-xs mb-3">Start a conversation with Servtech and explore how connected technology infrastructure can support your next challenge.</p>
                  <div className="flex flex-col sm:flex-row justify-center gap-3">
                    <button className="bg-[#f97316] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-orange-600 transition-colors shadow-md">
                      Start a Conversation
                    </button>
                    <button className="bg-transparent border border-gray-300 text-[#1c1c1c] px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors">
                      Explore Our Capabilities
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Native Footer imported and rendered at the very bottom of the scroll */}
              <div className="w-full flex-shrink-0">
                <Footer />
              </div>
            </section>
            
          </Scroll>
        </ScrollControls>
      </Suspense>
    </Canvas>
  );
}
