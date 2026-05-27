import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function isLand(lat: number, lon: number): boolean {
  // Северная Америка
  if (lat > 25 && lat < 72 && lon > -168 && lon < -52) return true;
  // Гренландия
  if (lat > 60 && lat < 84 && lon > -58 && lon < -17) return true;
  // Центральная Америка
  if (lat > 7 && lat < 25 && lon > -92 && lon < -60) return true;
  // Южная Америка
  if (lat > -56 && lat < 12 && lon > -82 && lon < -34) return true;
  // Европа
  if (lat > 36 && lat < 72 && lon > -10 && lon < 40) return true;
  // Британские острова
  if (lat > 50 && lat < 60 && lon > -8 && lon < 2) return true;
  // Исландия
  if (lat > 63 && lat < 67 && lon > -24 && lon < -13) return true;
  // Россия + Сибирь
  if (lat > 50 && lat < 78 && lon > 28 && lon < 180) return true;
  if (lat > 42 && lat < 55 && lon > 28 && lon < 140) return true;
  // Ближний Восток
  if (lat > 12 && lat < 42 && lon > 26 && lon < 62) return true;
  // Индия
  if (lat > 8 && lat < 35 && lon > 68 && lon < 92) return true;
  // Китай + ЮВА
  if (lat > 0 && lat < 55 && lon > 90 && lon < 145) return true;
  // Япония
  if (lat > 30 && lat < 46 && lon > 129 && lon < 146) return true;
  // Африка
  if (lat > -35 && lat < 37 && lon > -18 && lon < 52) return true;
  // Мадагаскар
  if (lat > -26 && lat < -12 && lon > 43 && lon < 51) return true;
  // Австралия
  if (lat > -40 && lat < -10 && lon > 113 && lon < 155) return true;
  // Новая Зеландия
  if (lat > -47 && lat < -34 && lon > 166 && lon < 178) return true;
  // Антарктида
  if (lat < -70) return true;
  return false;
}

function toXYZ(lat: number, lon: number, r: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

function GlobeMesh() {
  const groupRef = useRef<THREE.Group>(null);

  const dotPoints = useMemo(() => {
    const r = 2.0;
    const pts: THREE.Vector3[] = [];
    const step = 4;
    for (let lat = -88; lat <= 88; lat += step) {
      for (let lon = -180; lon < 180; lon += step) {
        if (isLand(lat, lon)) {
          pts.push(toXYZ(lat, lon, r));
        }
      }
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.12;
  });

  return (
    <group ref={groupRef}>
      <points geometry={dotPoints}>
        <pointsMaterial
          color="#ffffff"
          size={0.12}
          transparent
          opacity={0.9}
          sizeAttenuation
        />
      </points>
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
        zIndex: 2,
        pointerEvents: "none",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "default" }}
        style={{ width: "100%", height: "100%", background: "transparent" }}
      >
        <GlobeMesh />
      </Canvas>
    </div>
  );
}
