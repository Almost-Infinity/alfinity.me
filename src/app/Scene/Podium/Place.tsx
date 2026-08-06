import { useGLTF } from "@react-three/drei";
import { useCallback, useContext, useRef, type JSX } from "react";
import { DoubleSide, Mesh, Vector3, type Material, type Object3D } from "three";
import { PodiumContext } from "./Podium";
import { PlaceAnimation } from "./PlaceAnimation";

export type PlaceProps = Omit<JSX.IntrinsicElements['mesh'], 'material' | 'geometry'> & {
  place: number;
  gltfPath: string;
  material?: JSX.IntrinsicElements['mesh']['material'] | ((materials: {
    [p: string]: Material,
  }) => JSX.IntrinsicElements['mesh']['material']);
  geometry?: JSX.IntrinsicElements['mesh']['geometry'] | ((nodes: {
    [p: string]: Object3D,
  }) => JSX.IntrinsicElements['mesh']['geometry']);
  meta: {
    title: string;
    description: string;
    link?: string;
  };
};

export function Place({ gltfPath, place, material, geometry, ...props }: PlaceProps) {
  const gltf = useGLTF(gltfPath);
  const { places } = useContext(PodiumContext);

  const placeAnimationRef = useRef<any>(null!);
  const localRef = useRef<Mesh>(null!);

  const getPosition = useCallback<() => Vector3>(() => {
    const index = place.toString().padStart(3, '0');
    return places[`Place${index}`]!.position;
  }, [places, place]);

  const getMaterial = useCallback(() => {
    return typeof material === 'function' ? material(gltf.materials) : material;
  }, [material, gltf]);

  const getGeometry = useCallback(() => {
    return typeof geometry === 'function' ? geometry(gltf.nodes) : (gltf.nodes['Logo'] as Mesh).geometry;
  }, [geometry, gltf]);

  const scale = new Vector3(0.5, 1.5, 0.5);

  return (
    <group position={getPosition()}
      onPointerOver={() => placeAnimationRef.current.onPointerOver()}
      onPointerOut={() => placeAnimationRef.current.onPointerOut()}
    >
      {/* Transparent plane to increase pointer trigger area */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2, 2]}></planeGeometry>
        <meshBasicMaterial opacity={0} transparent side={DoubleSide} />
      </mesh>

      <mesh
        {...props}
        ref={localRef}
        geometry={getGeometry()!}
        position={[0, -0.1, 0]}
        material={getMaterial()!}
        scale={scale}
      />

      <PlaceAnimation ref={placeAnimationRef} targetRef={localRef} />
    </group>
  );
}