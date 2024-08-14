import React from 'react';
import { DoubleSide, Group, Material, Mesh, Vector3 } from 'three';
import { useGLTF } from '@react-three/drei';
import { PodiumContext } from './context';
import { PlaceAnimation } from './PlaceAnimation';

export type PlaceProps = Omit<JSX.IntrinsicElements['mesh'], 'material'> & {
  place: number;
  gltfPath: string;
  material?: JSX.IntrinsicElements['mesh']['material'] | ((materials: {
    [p: string]: Material
  }) => JSX.IntrinsicElements['mesh']['material']);
};

export const Place = React.forwardRef<Mesh, PlaceProps>(function Place({ gltfPath, place, material, ...props }, ref) {
  const gltf = useGLTF(gltfPath);
  const { places } = React.useContext(PodiumContext);

  const localRef = React.useRef<Mesh>(null!);
  React.useImperativeHandle(ref, () => localRef.current, []);

  const placeAnimationRef = React.useRef<any>(null!);
  const groupRef = React.useRef<Group>(null!);

  const getPosition = React.useCallback<() => Vector3>(() => {
    const index = place.toString().padStart(3, '0');
    return places[`Place${index}`].position;
  }, [ places, place ]);

  const getMaterial = React.useCallback(() => {
    return typeof material === 'function' ? material(gltf.materials) : material;
  }, [ material, gltf ]);

  const scale = new Vector3(0.5, 1.5, 0.5);

  return (
    <group
      ref={groupRef}
      position={getPosition()}
      onPointerOver={() => placeAnimationRef.current.onPointerOver()}
      onPointerOut={() => placeAnimationRef.current.onPointerOut()}
    >
      {/* Transparent plane to increase pointer trigger area */}
      <mesh rotation={[ -Math.PI / 2, 0, 0 ]}>
        <planeGeometry args={[ 2, 2 ]}></planeGeometry>
        <meshBasicMaterial opacity={0} transparent side={DoubleSide} />
      </mesh>

      <mesh
        {...props}
        ref={localRef}
        geometry={(gltf.nodes['Logo'] as Mesh).geometry}
        position={[ 0, -0.1, 0 ]}
        material={getMaterial()}
        scale={scale}
      ></mesh>

      <PlaceAnimation ref={placeAnimationRef} targetRef={localRef} />
    </group>
  );
});