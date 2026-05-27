import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Упрощённые контуры материков [lon, lat]
const CONTINENTS: [number, number][][] = [
  // Европа + западная Азия
  [[-10,35],[30,35],[30,55],[45,55],[45,70],[70,70],[70,55],[100,55],[100,35],[70,35],[70,10],[45,10],[45,35],[30,35],[30,20],[-10,20],[-10,35]],
  // Африка
  [[-20,37],[50,37],[50,15],[45,-10],[40,-35],[20,-35],[10,-35],[-20,10],[-20,37]],
  // Северная Америка
  [[-170,70],[-55,70],[-55,45],[-75,25],[-90,15],[-105,15],[-120,20],[-130,30],[-170,60],[-170,70]],
  // Южная Америка
  [[-80,12],[-35,12],[-35,-15],[-45,-55],[-65,-55],[-80,-20],[-80,12]],
  // Австралия
  [[114,-22],[154,-22],[154,-38],[132,-38],[114,-28],[114,-22]],
  // Гренландия
  [[-55,60],[-20,60],[-20,76],[-42,82],[-55,76],[-55,60]],
  // Юго-восточная Азия + Индия
  [[65,8],[80,8],[80,25],[100,25],[100,10],[120,10],[120,25],[140,25],[140,40],[100,40],[100,55],[70,55],[70,40],[65,25],[65,8]],
  // Японские острова (упрощённо)
  [[130,30],[145,30],[145,45],[130,42],[130,30]],
];

function toXYZ(lat: number, lon: number, r: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

function GlobeMesh() {
  const groupRef = useRef<THREE.Group>(null);

  const continentPoints = useMemo(() => {
    const r = 2.22;
    const pts: THREE.Vector3[] = [];
    for (const poly of CONTINENTS) {
      for (let i = 0; i < poly.length - 1; i++) {
        const [lon1, lat1] = poly[i];
        const [lon2, lat2] = poly[i + 1];
        const steps = 30;
        for (let s = 0; s <= steps; s++) {
          const t = s / steps;
          pts.push(toXYZ(lat1 + (lat2 - lat1) * t, lon1 + (lon2 - lon1) * t, r));
        }
      }
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, []);

  const gridPoints = useMemo(() => {
    const r = 2.2;
    const pts: THREE.Vector3[] = [];
    for (const lat of [-60, -30, 0, 30, 60]) {
      for (let lon = -180; lon <= 180; lon += 2) pts.push(toXYZ(lat, lon, r));
    }
    for (let lon = -180; lon < 180; lon += 30) {
      for (let lat = -90; lat <= 90; lat += 2) pts.push(toXYZ(lat, lon, r));
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.1;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[2.2, 64, 64]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.1} />
      </mesh>
      <points geometry={gridPoints}>
        <pointsMaterial color="#ffffff" size={0.01} transparent opacity={0.1} sizeAttenuation />
      </points>
      <points geometry={continentPoints}>
        <pointsMaterial color="#ffffff" size={0.025} transparent opacity={0.55} sizeAttenuation />
      </points>
    </group>
  );
}

export function Globe() {
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <GlobeMesh />
      </Canvas>
    </div>
  );
}
