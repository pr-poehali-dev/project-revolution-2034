import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import earcut from "earcut";

type Ring = number[][];
type GeoPolygon = { type: "Polygon"; coordinates: Ring[] };
type GeoMultiPolygon = { type: "MultiPolygon"; coordinates: Ring[][] };
type GeoFeature = { type: "Feature"; geometry: GeoPolygon | GeoMultiPolygon };
type GeoJSON = { type: "FeatureCollection"; features: GeoFeature[] };

function ll2v(lon: number, lat: number, r: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = lon * (Math.PI / 180);
  return new THREE.Vector3(
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

function buildGeometryFromGeoJSON(geojson: GeoJSON, r: number): THREE.BufferGeometry {
  const positions: number[] = [];
  const indices: number[] = [];
  let offset = 0;

  function processPolygon(rings: Ring[]) {
    if (!rings || rings.length === 0) return;
    const outer = rings[0];
    if (outer.length < 3) return;

    // Собираем flat массив + holeIndices для earcut
    const flat: number[] = [];
    const holeIndices: number[] = [];

    for (const coord of outer) {
      flat.push(coord[0], coord[1]);
    }

    for (let h = 1; h < rings.length; h++) {
      holeIndices.push(flat.length / 2);
      for (const coord of rings[h]) {
        flat.push(coord[0], coord[1]);
      }
    }

    const triIndices = earcut(flat, holeIndices.length ? holeIndices : undefined, 2);
    if (!triIndices || triIndices.length === 0) return;

    const base = offset;
    const totalVerts = flat.length / 2;
    for (let i = 0; i < totalVerts; i++) {
      const lon = flat[i * 2];
      const lat = flat[i * 2 + 1];
      const v = ll2v(lon, lat, r);
      positions.push(v.x, v.y, v.z);
      offset++;
    }

    for (const idx of triIndices) {
      indices.push(base + idx);
    }
  }

  for (const feature of geojson.features) {
    const geom = feature.geometry;
    if (!geom) continue;
    if (geom.type === "Polygon") {
      processPolygon(geom.coordinates);
    } else if (geom.type === "MultiPolygon") {
      for (const poly of geom.coordinates) {
        processPolygon(poly);
      }
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

function GlobeMesh({ geojson }: { geojson: GeoJSON | null }) {
  const groupRef = useRef<THREE.Group>(null);

  const continentGeo = geojson
    ? buildGeometryFromGeoJSON(geojson, 2.012)
    : null;

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.1;
  });

  return (
    <group ref={groupRef}>
      {/* Океан — белый */}
      <mesh>
        <sphereGeometry args={[2.0, 128, 128]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      {/* Материки — чёрные */}
      {continentGeo && (
        <mesh geometry={continentGeo}>
          <meshBasicMaterial color="#111111" side={THREE.FrontSide} />
        </mesh>
      )}
      {/* Тонкий контур по краю */}
      <mesh>
        <sphereGeometry args={[2.03, 64, 64]} />
        <meshBasicMaterial color="#111111" side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

export function Globe() {
  const [geojson, setGeojson] = useState<GeoJSON | null>(null);

  useEffect(() => {
    // Сначала получаем CDN URL через backend, потом грузим сам GeoJSON
    fetch("https://functions.poehali.dev/feb5a455-da85-4f36-8331-24ecfa953c33")
      .then((r) => r.json())
      .then(({ url }) => fetch(url))
      .then((r) => r.json())
      .then((data) => setGeojson(data as GeoJSON))
      .catch(() => {});
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100svh",
        zIndex: 0,
        background: "#ffffff",
        pointerEvents: "none",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: false }}
        style={{ width: "100%", height: "100%" }}
      >
        <color attach="background" args={["#ffffff"]} />
        <GlobeMesh geojson={geojson} />
      </Canvas>
    </div>
  );
}

export default Globe;