import React from 'react';
import { DirectionalLight } from 'three';
import { useFrame, useThree } from '@react-three/fiber';

export function Light() {
  const light = React.useRef<DirectionalLight>(null!);
  const { camera } = useThree();

  useFrame(() => {
    light.current.position.set(
      camera.position.x * -1,
      light.current.position.y,
      camera.position.z * -1
    );
  });

  return (
    <>
      <directionalLight
        ref={light}
        intensity={2}
        position={[ 0, 20, -10 ]}
        color="#dee0f9"
      />

      <ambientLight intensity={0.5} />
    </>
  );
}
