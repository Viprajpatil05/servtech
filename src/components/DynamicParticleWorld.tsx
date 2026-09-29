"use client";

import dynamic from "next/dynamic";

// Dynamically import the 3D world with ssr: false
// We put this inside a 'use client' file because Next.js blocks ssr: false directly in Server Components
export const DynamicParticleWorld = dynamic(
  () => import("./ParticleWorld").then((mod) => mod.ParticleWorld),
  { ssr: false }
);
