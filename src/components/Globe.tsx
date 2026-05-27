import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function GlobeMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);

  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.12;
    if (pointsRef.current) pointsRef.current.rotation.y += delta * 0.12;
  });

  const dotGeometry = useMemo(() => {
    const radius = 2.2;
    const rows = 80;
    const positions: number[] = [];

    for (let lat = 0; lat < rows; lat++) {
      const phi = (Math.PI * lat) / rows;
      const dotsInRow = Math.floor(Math.sin(phi) * rows * 1.5);
      for (let dot = 0; dot < dotsInRow; dot++) {
        const theta = (2 * Math.PI * dot) / dotsInRow;
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.cos(phi);
        const z = radius * Math.sin(phi) * Math.sin(theta);
        positions.push(x, y, z);
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    return geo;
  }, []);

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[2.2, 64, 64]} />
        <meshStandardMaterial
          color="#111111"
          transparent
          opacity={0.15}
          wireframe={false}
        />
      </mesh>
      <points ref={pointsRef} geometry={dotGeometry}>
        <pointsMaterial
          color="#ffffff"
          size={0.025}
          transparent
          opacity={0.5}
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
        position: "absolute",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <GlobeMesh />
      </Canvas>
    </div>
  );
}
