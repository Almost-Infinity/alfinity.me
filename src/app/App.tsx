import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Splash } from "../shared/ui/Splash";
import { Scene } from './Scene';

export default function App() {
  return (
    <>
      <React.Suspense fallback={<Splash />}>
        <Canvas camera={{ position: [ 0, 70, 70 ], fov: 50 }}>
          <Scene />
        </Canvas>
      </React.Suspense>
    </>
  );
}