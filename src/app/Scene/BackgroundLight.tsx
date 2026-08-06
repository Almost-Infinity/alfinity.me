import React, { useEffect } from 'react';
import { Group, Mesh, SpotLight, Vector3 } from 'three';
import { useFrame, useThree } from '@react-three/fiber';

export function BackgroundLight() {
  const groupRef = React.useRef<Group>(null!);
  const planeRef = React.useRef<Mesh>(null!);
  const lightRef = React.useRef<SpotLight>(null!);
  const { camera } = useThree();

  useFrame(() => {
    groupRef.current.position.copy(camera.position).add(camera.getWorldDirection(new Vector3()).multiplyScalar(50)).sub(new Vector3(0, 5, 0));
    groupRef.current.lookAt(camera.position);
  });

  useEffect(() => {
    if (lightRef.current && planeRef.current) {
      lightRef.current.target = planeRef.current;
    }
  }, []);

  return (
    <group ref={groupRef}>
      <mesh ref={planeRef} position={[ 0, 0, -20 ]}>
        <planeGeometry args={[ 500, 500 ]}></planeGeometry>
        <meshStandardMaterial color="#3e4156" />
      </mesh>

      <spotLight
        ref={lightRef}
        intensity={1000}
        position={[ 0, 0, -10 ]}
        color="#ffffff"
        target={planeRef.current}
        angle={Math.PI}
      />
    </group>
  );
}
