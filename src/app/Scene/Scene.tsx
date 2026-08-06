import { OrbitControls } from '@react-three/drei';
import { AnimatedCamera } from "./AnimatedCamera";
import { BackgroundLight } from "./BackgroundLight";
import { Light } from "./Light";
import { Podium } from './Podium';
import { placesConfig } from './places.config';

export function Scene() {
  return (
    <>
      <Light />
      <BackgroundLight />
      <AnimatedCamera />

      <OrbitControls
        target={[ 0, 5, 0 ]}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 3}
        minDistance={10}
        maxDistance={20}
        enablePan={false}
      />

      <Podium>
        {placesConfig.map((place, idx) => (
          <Podium.Place key={idx} {...place} />
        ))}
      </Podium>
    </>
  );
}