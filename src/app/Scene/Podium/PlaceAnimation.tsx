import React from 'react';
import { Vector3 } from 'three';
import { useFrame } from '@react-three/fiber';
import { Easing, Tween } from '@tweenjs/tween.js';

export interface PlaceAnimationProps {
  targetRef: React.RefObject<any>;
}

export const PlaceAnimation = React.forwardRef<any, PlaceAnimationProps>(function PlaceAnimation({ targetRef }: PlaceAnimationProps, fref) {
  const isAnimating = React.useRef(false);

  let t1: Tween<Vector3> | null = null;
  let t2: Tween<Vector3> | null = null;

  useFrame(() => {
    t1?.update();
    t2?.update();
  });

  const onPointerOver = () => {
    if (isAnimating.current && t2) {
      t2.stop();
      t2 = null;
      isAnimating.current = false;
    }

    if (!isAnimating.current) {
      isAnimating.current = true;

      t1 = new Tween(targetRef.current.position)
        .to({ y: 0.05 }, 250)
        .easing(Easing.Quadratic.Out)
        .onComplete(() => { isAnimating.current = false; })
        .start();
    }
  };

  const onPointerOut = () => {
    if (isAnimating.current && t1) {
      t1.stop();
      t1 = null;
      isAnimating.current = false;
    }

    if (!isAnimating.current) {
      isAnimating.current = true;

      t2 = new Tween(targetRef.current.position)
        .to({ y: -0.1 }, 250)
        .easing(Easing.Quadratic.Out)
        .onComplete(() => { isAnimating.current = false; })
        .start();
    }
  };

  React.useImperativeHandle(fref, () => ({ onPointerOver, onPointerOut }), []);

  return null;
});
