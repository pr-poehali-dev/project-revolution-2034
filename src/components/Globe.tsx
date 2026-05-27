import { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { TextureLoader } from "three";

const MAP_URL =
  "https://cdn.poehali.dev/projects/17ebc9d7-b892-431e-a0b0-87f4e8af47af/bucket/3b0295cd-edd2-4a35-97a6-055236eb7347.png";

function GlobeMesh() {
  const groupRef = useRef<THREE.Group>(null);
  const texture = useLoader(TextureLoader, MAP_URL);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.12;
  });

  return (
    <group ref={groupRef}>
      {/* Сфера океана — тёмно-серая */}
      <mesh>
        <sphereGeometry args={[2.0, 64, 64]} />
        <meshBasicMaterial color="#111111" />
      </mesh>
      {/* Материки — белая текстура карты, прозрачный фон */}
      <mesh>
        <sphereGeometry args={[2.01, 64, 64]} />
        <meshBasicMaterial
          map={texture}
          transparent
          alphaMap={texture}
          color="#ffffff"
          depthWrite={false}
        />
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
