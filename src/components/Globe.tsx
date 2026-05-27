import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const CONTINENTS: [number, number][][] = [
  // Северная Америка
  [
    [-168, 72], [-140, 72], [-120, 75], [-85, 75], [-65, 48], [-52, 46],
    [-55, 35], [-80, 25], [-90, 18], [-92, 10], [-78, 8], [-77, 10],
    [-83, 15], [-88, 16], [-90, 20], [-97, 22], [-105, 22], [-115, 30],
    [-118, 35], [-122, 38], [-124, 46], [-130, 55], [-140, 60], [-158, 70],
    [-168, 72],
  ],
  // Гренландия
  [[-58, 76], [-30, 84], [-18, 78], [-25, 70], [-44, 60], [-58, 64], [-58, 76]],
  // Южная Америка
  [
    [-82, 10], [-78, 0], [-72, -5], [-52, -5], [-38, -10], [-35, -8],
    [-34, -20], [-40, -32], [-52, -34], [-58, -40], [-65, -55], [-70, -55],
    [-75, -50], [-72, -42], [-68, -30], [-70, -18], [-75, -10], [-80, 0],
    [-82, 10],
  ],
  // Европа
  [
    [-10, 36], [5, 36], [15, 38], [28, 42], [32, 46], [26, 52],
    [30, 60], [20, 68], [10, 70], [0, 62], [-5, 55], [-8, 50],
    [-5, 44], [-10, 38], [-10, 36],
  ],
  // Скандинавия
  [[5, 57], [8, 58], [14, 66], [18, 70], [28, 72], [30, 70], [28, 64], [22, 60], [12, 56], [5, 57]],
  // Африка
  [
    [-18, 16], [-18, 12], [-14, 8], [-8, 4], [0, 4], [8, 4],
    [12, 0], [10, -8], [14, -18], [18, -30], [22, -35], [28, -35],
    [36, -26], [42, -12], [44, -2], [42, 10], [44, 12], [42, 16],
    [38, 22], [32, 30], [28, 32], [20, 38], [10, 38], [0, 30],
    [-8, 20], [-18, 16],
  ],
  // Мадагаскар
  [[44, -12], [50, -14], [50, -24], [44, -26], [44, -12]],
  // Азия
  [
    [28, 42], [36, 38], [38, 36], [44, 38], [50, 40], [60, 38],
    [62, 30], [68, 24], [72, 22], [80, 12], [88, 12], [92, 8],
    [100, 4], [104, 2], [108, 2], [115, 5], [120, 15], [125, 20],
    [130, 30], [132, 38], [130, 45], [135, 48], [142, 50], [145, 55],
    [140, 60], [130, 62], [120, 68], [100, 72], [80, 78], [60, 78],
    [40, 72], [32, 68], [28, 62], [26, 52], [32, 46], [28, 42],
  ],
  // Индостан
  [[68, 24], [72, 22], [76, 8], [80, 8], [80, 12], [88, 22], [92, 22], [88, 12], [80, 12], [72, 22], [68, 24]],
  // Япония
  [[130, 32], [131, 34], [134, 35], [137, 37], [140, 40], [142, 44], [144, 44], [143, 42], [141, 38], [138, 34], [133, 33], [130, 32]],
  // Австралия
  [
    [114, -22], [120, -14], [130, -12], [136, -12], [140, -18],
    [148, -20], [155, -28], [152, -38], [144, -40], [130, -35],
    [116, -34], [114, -26], [114, -22],
  ],
  // Новая Зеландия
  [[166, -46], [168, -44], [174, -38], [176, -38], [174, -42], [172, -44], [168, -46], [166, -46]],
  // Антарктида
  [[-180, -70], [-120, -72], [-60, -72], [0, -72], [60, -72], [120, -72], [180, -70], [180, -90], [-180, -90], [-180, -70]],
];

function ll2v(lon: number, lat: number, r: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

function buildContinents(r: number): THREE.BufferGeometry {
  const pos: number[] = [];
  for (const ring of CONTINENTS) {
    const n = ring.length;
    if (n < 3) continue;
    // Fan-триангуляция от первой точки (не от центра масс — это давало артефакты)
    const origin = ll2v(ring[0][0], ring[0][1], r);
    for (let i = 1; i < n - 1; i++) {
      const a = ll2v(ring[i][0], ring[i][1], r);
      const b = ll2v(ring[i + 1][0], ring[i + 1][1], r);
      pos.push(origin.x, origin.y, origin.z, a.x, a.y, a.z, b.x, b.y, b.z);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  return geo;
}

function buildEdges(r: number): THREE.BufferGeometry {
  const pos: number[] = [];
  for (const ring of CONTINENTS) {
    for (let i = 0; i < ring.length - 1; i++) {
      const a = ll2v(ring[i][0], ring[i][1], r);
      const b = ll2v(ring[i + 1][0], ring[i + 1][1], r);
      pos.push(a.x, a.y, a.z, b.x, b.y, b.z);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  return geo;
}

function GlobeMesh() {
  const groupRef = useRef<THREE.Group>(null);
  const continentGeo = useMemo(() => buildContinents(2.0), []);
  const edgeGeo = useMemo(() => buildEdges(2.02), []);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.1;
  });

  return (
    <group ref={groupRef}>
      {/* Чёрный океан */}
      <mesh>
        <sphereGeometry args={[2.0, 64, 64]} />
        <meshBasicMaterial color="#000000" side={THREE.BackSide} />
      </mesh>
      {/* Белые материки поверх */}
      <mesh geometry={continentGeo}>
        <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} depthWrite={true} />
      </mesh>
    </group>
  );
}

export function Globe() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100svh",
        zIndex: 0,
        background: "#000",
        pointerEvents: "none",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: false }}
        style={{ width: "100%", height: "100%" }}
      >
        <color attach="background" args={["#000000"]} />
        <GlobeMesh />
      </Canvas>
    </div>
  );
}