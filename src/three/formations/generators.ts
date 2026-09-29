import * as THREE from "three";

export function getHeroPositions(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 60;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
  }
  return positions;
}

export function getCloudPositions(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    // Generate a clustered cloud-like shape using spherical distribution with perlin-like clustering bias
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    
    // Bias radius to be denser in the center
    const r = Math.pow(Math.random(), 3) * 15;
    
    // Stretch to make it look more like a wide cloud than a sphere
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta) * 1.5 - 5.0; // Offset to left
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
    positions[i * 3 + 2] = r * Math.cos(phi) * 0.8;
  }
  return positions;
}

export function getNetworkPositions(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  // Create nodes (hubs)
  const numHubs = 20;
  const hubs = [];
  for (let i = 0; i < numHubs; i++) {
    hubs.push(new THREE.Vector3(
      (Math.random() - 0.5) * 30 + 5.0, // Offset to right
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 15
    ));
  }
  
  for (let i = 0; i < count; i++) {
    // 70% of particles form clusters around hubs, 30% form lines between hubs
    if (Math.random() > 0.3) {
      const hub = hubs[Math.floor(Math.random() * hubs.length)];
      const r = Math.pow(Math.random(), 2) * 4;
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      
      positions[i * 3] = hub.x + r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = hub.y + r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = hub.z + r * Math.cos(phi);
    } else {
      const hub1 = hubs[Math.floor(Math.random() * hubs.length)];
      const hub2 = hubs[Math.floor(Math.random() * hubs.length)];
      const t = Math.random();
      positions[i * 3] = THREE.MathUtils.lerp(hub1.x, hub2.x, t) + (Math.random()-0.5)*0.5;
      positions[i * 3 + 1] = THREE.MathUtils.lerp(hub1.y, hub2.y, t) + (Math.random()-0.5)*0.5;
      positions[i * 3 + 2] = THREE.MathUtils.lerp(hub1.z, hub2.z, t) + (Math.random()-0.5)*0.5;
    }
  }
  return positions;
}

export function getCybersecurityPositions(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    // Generate a shield (curved front-facing hemisphere)
    const u = Math.random() * 0.5 + 0.25; // Only front part
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    
    // Mostly on the surface, some thickness
    const r = 12 + Math.random() * 2;
    
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta) - 5.0; // Offset to left
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi) - 5.0;
  }
  return positions;
}

export function getAIPositions(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    // Neural network abstract brain / complex layers
    // Let's do horizontal layers with dense vertical connections
    const layer = Math.floor(Math.random() * 5);
    const layerY = (layer - 2) * 5;
    
    const r = Math.sqrt(Math.random()) * (15 - Math.abs(layerY));
    const theta = Math.random() * 2.0 * Math.PI;
    
    positions[i * 3] = r * Math.cos(theta) + 5.0; // Offset to right
    positions[i * 3 + 1] = layerY + (Math.random() - 0.5) * 2.0;
    positions[i * 3 + 2] = r * Math.sin(theta);
  }
  return positions;
}

export function getEcosystemPositions(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    // Massive galaxy-like torus representing the entire ecosystem
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = v * 2.0 * Math.PI;
    
    const R = 25 + Math.random() * 5; // major radius
    const r = Math.pow(Math.random(), 2) * 10; // minor radius (denser in center)
    
    positions[i * 3] = (R + r * Math.cos(phi)) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * 0.5; // flatten
    positions[i * 3 + 2] = (R + r * Math.cos(phi)) * Math.sin(theta);
  }
  return positions;
}
