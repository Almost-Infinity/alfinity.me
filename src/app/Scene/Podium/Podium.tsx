import { useGLTF } from "@react-three/drei";
import { createContext, useMemo, type PropsWithChildren } from "react";
import type { Mesh, Object3D } from "three";
import { Place } from "./Place";

export interface PodiumContextProps {
  places: { [p: string]: Object3D };
}

export const PodiumContext = createContext<PodiumContextProps>(null!);

export type Podium = typeof Podium & {
  Place: typeof Place;
};

export function Podium({ children }: PropsWithChildren) {
  const { nodes: podiumNodes } = useGLTF('models/podium.glb');

  const hexagons = useMemo(() => {
    return Object.values(podiumNodes).filter((node) => {
      return node.type === 'Mesh' && node.name.startsWith('Hexagon');
    });
  }, [ podiumNodes ]);

  const places = useMemo(() => {
    return Object.fromEntries(
      Object.values(podiumNodes).filter((node) => {
        return node.type === 'Object3D' && node.name.startsWith('Place');
      }).map((node) => ([ node.name, node ]))
    );
  }, [ podiumNodes ]);

  return (
    <group>
      {hexagons.map((node) => (
        <mesh key={node.name} geometry={(node as Mesh).geometry}>
          <meshStandardMaterial color="#3e4156" />
        </mesh>
      ))}

      <PodiumContext.Provider value={{ places }}>
        {children}
      </PodiumContext.Provider>
    </group>
  );
};

Podium.Place = Place;

useGLTF.preload('models/podium.glb');
