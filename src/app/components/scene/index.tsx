import React, { useRef } from 'react';
import { Podium } from './podium';
import { Canvas, useFrame } from '@react-three/fiber';
import { Color, DirectionalLight } from 'three';
import { OrbitControls } from '@react-three/drei';

function Light() {
  const spotLightColor = new Color(0xffffff);

  const lightRef = useRef<DirectionalLight>(null!);

  useFrame(({ camera }) => {
    lightRef.current.position.set(camera.position.x, camera.position.y, camera.position.z);
  });

  return <directionalLight
    ref={lightRef}
    intensity={20}
    position={[ 15, 7, 0 ]}
    color={spotLightColor}
  />;
}

export function Scene() {
  const backgroundColor = new Color(0x222538);

  return (
    <Canvas camera={{ position: [ 15, 0, 0 ] }}>

      <OrbitControls
        target={[ 0, 7, 0 ]}
      />

      <color attach="background" args={[ backgroundColor.r, backgroundColor.g, backgroundColor.b ]}></color>

      <Podium />
      <Light />
    </Canvas>
  );
}
