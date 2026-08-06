import React from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Easing, Tween } from '@tweenjs/tween.js';

export function AnimatedCamera() {
  const { camera } = useThree();

  const initialPosition = { x: 0, y: 70, z: 70 };
  const targetPosition = { x: 0, y: 18, z: 15 };

  const tween = new Tween(initialPosition).to(targetPosition, 1000)
    .easing(Easing.Quadratic.Out)
    .onUpdate(() => camera.position.set(initialPosition.x, initialPosition.y, initialPosition.z));

  React.useEffect(() => {
    tween.start();
  }, []);

  useFrame(() => tween.update());
  return null;
}
