"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { 
  getHeroPositions, 
  getCloudPositions, 
  getNetworkPositions,
  getCybersecurityPositions,
  getAIPositions,
  getEcosystemPositions
} from "../three/formations/generators";

export function ParticleSystem() {
  const pointsRef = useRef<THREE.Points>(null);
  const { size } = useThree();
  
  // Drei's useScroll hook returns scroll data synced to the rAF loop
  // Note: useScroll must be called inside a component that is a child of <ScrollControls>
  const scroll = useScroll();

  const particleCount = useMemo(() => {
    return size.width < 768 ? 5000 : 15000;
  }, [size.width]);

  // Generate all formations once
  const formations = useMemo(() => {
    return [
      getHeroPositions(particleCount),
      getCloudPositions(particleCount),
      getNetworkPositions(particleCount),
      getCybersecurityPositions(particleCount),
      getAIPositions(particleCount),
      getEcosystemPositions(particleCount)
    ];
  }, [particleCount]);

  // Generate colors
  const colors = useMemo(() => {
    const cols = new Float32Array(particleCount * 3);
    const colorOptions = [
      new THREE.Color("#e2e8f0"), 
      new THREE.Color("#cbd5e1"), 
      new THREE.Color("#0ea5e9"), 
      new THREE.Color("#38bdf8"), 
      new THREE.Color("#f97316"), 
    ];

    for (let i = 0; i < particleCount; i++) {
      const isOrange = Math.random() > 0.98;
      const isBlue = Math.random() > 0.8;
      
      let c;
      if (isOrange) c = colorOptions[4];
      else if (isBlue) c = colorOptions[Math.random() > 0.5 ? 2 : 3];
      else c = colorOptions[Math.random() > 0.5 ? 0 : 1];

      cols[i * 3] = c.r;
      cols[i * 3 + 1] = c.g;
      cols[i * 3 + 2] = c.b;
    }
    return cols;
  }, [particleCount]);

  const [posStart, setPosStart] = useState(formations[0]);
  const [posEnd, setPosEnd] = useState(formations[1]);
  const currentStageRef = useRef(0);

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        uMorphProgress: { value: 0 },
        mouse: { value: new THREE.Vector2(0, 0) },
      },
      vertexShader: `
        uniform float time;
        uniform float uMorphProgress;
        uniform vec2 mouse;
        
        attribute vec3 color;
        attribute vec3 positionEnd; // The target position for morphing
        
        varying vec3 vColor;
        varying float vDistance;

        // Easing function for smoother particle morphing
        float easeInOutCubic(float x) {
          return x < 0.5 ? 4.0 * x * x * x : 1.0 - pow(-2.0 * x + 2.0, 3.0) / 2.0;
        }

        void main() {
          vColor = color;
          
          float easedProgress = easeInOutCubic(uMorphProgress);
          
          // Lerp between current start position and end position
          vec3 basePos = mix(position, positionEnd, easedProgress);
          
          // Add subtle floating motion on top
          basePos.y += sin(time * 0.5 + basePos.x * 2.0) * 0.1;
          basePos.x += cos(time * 0.3 + basePos.y * 2.0) * 0.05;
          
          // Subtle mouse repel logic
          // Convert mouse (-1 to +1) to world space approx
          vec3 mouseWorld = vec3(mouse.x * 20.0, mouse.y * 10.0, 0.0);
          float distToMouse = distance(basePos.xy, mouseWorld.xy);
          
          if (distToMouse < 8.0) {
            float repelStrength = (8.0 - distToMouse) * 0.1;
            vec2 repelDir = normalize(basePos.xy - mouseWorld.xy);
            basePos.x += repelDir.x * repelStrength;
            basePos.y += repelDir.y * repelStrength;
            // slightly brighten color for nearby particles
            vColor = min(vColor + vec3(repelStrength * 0.5), vec3(1.0));
          }
          
          vec4 mvPosition = modelViewMatrix * vec4(basePos, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          
          gl_PointSize = (20.0 / -mvPosition.z);
          vDistance = -mvPosition.z;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vDistance;

        void main() {
          vec2 coord = gl_PointCoord - vec2(0.5);
          float dist = length(coord);
          if (dist > 0.5) discard;
          
          float alpha = 1.0 - (dist * 2.0);
          float depthAlpha = smoothstep(30.0, 5.0, vDistance);
          
          gl_FragColor = vec4(vColor, alpha * depthAlpha * 0.9);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  useFrame((state) => {
    if (!pointsRef.current || !scroll) return;
    
    const material = pointsRef.current.material as THREE.ShaderMaterial;
    material.uniforms.time.value = state.clock.elapsedTime;
    
    // Lerp mouse position for smooth trailing effect
    material.uniforms.mouse.value.lerp(state.pointer, 0.1);
    
    // scroll.offset is 0 at top, 1 at bottom
    // We have N formations, so there are N-1 transitions
    const numTransitions = formations.length - 1;
    const scrollProgress = scroll.offset * numTransitions;
    
    // Add a tiny buffer to avoid out-of-bounds at exactly 1.0 offset
    const stage = Math.min(Math.floor(scrollProgress), numTransitions - 1); 
    const localProgress = scrollProgress - stage;
    
    // Update buffer attributes if the stage has changed
    if (stage !== currentStageRef.current) {
      currentStageRef.current = stage;
      
      const geometry = pointsRef.current.geometry;
      const posStartAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
      const posEndAttr = geometry.getAttribute("positionEnd") as THREE.BufferAttribute;
      
      // Use .set() to copy the values into the existing buffer instead of reassigning the array reference
      posStartAttr.set(formations[stage]);
      posEndAttr.set(formations[stage + 1]);
      
      posStartAttr.needsUpdate = true;
      posEndAttr.needsUpdate = true;
    }
    
    // Update morph uniform
    material.uniforms.uMorphProgress.value = Math.max(0, Math.min(1, localProgress));
    
    // Camera / System slight rotation based on scroll to add depth
    pointsRef.current.rotation.y = scroll.offset * Math.PI * 0.5 + state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[posStart, 3]}
          count={posStart.length / 3}
          array={posStart}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-positionEnd"
          args={[posEnd, 3]}
          count={posEnd.length / 3}
          array={posEnd}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <primitive object={shaderMaterial} attach="material" />
    </points>
  );
}
