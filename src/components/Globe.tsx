import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const MAP_URL =
  "https://cdn.poehali.dev/projects/17ebc9d7-b892-431e-a0b0-87f4e8af47af/bucket/98dcee83-7f34-4fbc-a5dc-166406edb258.png";

function GlobeMesh() {
  const groupRef = useRef<THREE.Group>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");
    loader.load(MAP_URL, (tex) => setTexture(tex));
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.1;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[2.2, 64, 64]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.15} />
      </mesh>

      {texture ? (
        <mesh>
          <sphereGeometry args={[2.22, 64, 64]} />
          <meshBasicMaterial
            map={texture}
            transparent
            opacity={0.5}
            depthWrite={false}
            onBeforeCompile={(shader) => {
              shader.fragmentShader = shader.fragmentShader.replace(
                "#include <color_fragment>",
                `#include <color_fragment>
                float brightness = dot(diffuseColor.rgb, vec3(0.299, 0.587, 0.114));
                diffuseColor.a *= brightness;
                diffuseColor.rgb = vec3(1.0);`
              );
            }}
          />
        </mesh>
      ) : (
        <mesh>
          <sphereGeometry args={[2.22, 32, 32]} />
          <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.08} />
        </mesh>
      )}
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
        <ambientLight intensity={1.5} />
        <GlobeMesh />
      </Canvas>
    </div>
  );
}
