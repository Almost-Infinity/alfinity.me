import { useGLTF } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import { Color, DoubleSide, Group, Mesh, MeshBasicMaterial, MeshPhysicalMaterial, TextureLoader, Vector3 } from 'three';
import { useFrame, useLoader } from '@react-three/fiber';

// 1. GitHub +
// 2. Telegram +
// 3. Gmail +
// 4. LinkedIn +
// 5. TypeScript +
// 6. Angular +
// 7. React +
// 8. Node.js +
// 9. Nest.js +
// 10. Weather Project +
// 11. SCSS +
// 12. Ukraine
// 13. Avatar

export function Podium() {
  const { nodes: podiumNodes } = useGLTF('models/podium.glb');
  const { nodes: ngLogoNodes } = useGLTF('models/angular-logo.glb');
  const { nodes: reactLogoNodes } = useGLTF('models/react-logo.glb');
  const { nodes: nodeJSLogoNodes } = useGLTF('models/nodejs-logo.glb');
  const { nodes: nestJSLogoNodes } = useGLTF('models/nestjs-logo.glb');
  const { nodes: typescriptLogoNodes } = useGLTF('models/typescript-logo.glb');
  const { nodes: linkedinLogoNodes } = useGLTF('models/linkedin-logo.glb');
  const { nodes: gmailLogoNodes } = useGLTF('models/gmail-logo.glb');
  const { nodes: telegramLogoNodes } = useGLTF('models/telegram-logo.glb');
  const { nodes: githubLogoNodes } = useGLTF('models/github-logo.glb');
  const { nodes: weatherProjectLogoNodes } = useGLTF('models/weather-project-logo.glb');
  const { nodes: sassLogoNodes } = useGLTF('models/sass-logo.glb');
  const { nodes: ukraineNodes } = useGLTF('models/ukraine.glb');

  const podiumMeshes = useMemo(() => {
    return Object.values(podiumNodes).filter((node) => {
      return node.type === 'Mesh' && node.name.startsWith('Hexagon');
    });
  }, [ podiumNodes ]);

  // const angularGradient = useLoader(TextureLoader, 'textures/angular-gradient.jpg');
  // const angularLogoMaterial = new MeshBasicMaterial({ map: angularGradient });

  const podiumGroup = useRef<Group>(null!);
  // useFrame((_, delta) => (podiumGroup.current.rotation.y += delta / 2));

  const mat = new MeshPhysicalMaterial({
    color: new Color(0x000000)
  });

  const sc = new Vector3(0.5, 1, 0.5);

  return (
    <group ref={podiumGroup}>
      {podiumMeshes.map((node) => (
        <mesh
          key={node.name}
          material={mat}
          geometry={(node as Mesh).geometry}
        />
      ))}

      <mesh
        geometry={(ngLogoNodes['Logo'] as Mesh).geometry}
        position={podiumNodes['Hexagon013Place'].position}
        scale={sc}
      />

      <mesh
        geometry={(reactLogoNodes['Logo'] as Mesh).geometry}
        position={podiumNodes['Hexagon012Place'].position}
        scale={sc}
      />

      <mesh
        geometry={(nodeJSLogoNodes['Logo'] as Mesh).geometry}
        position={podiumNodes['Hexagon011Place'].position}
        scale={sc}
      />

      <mesh
        geometry={(nestJSLogoNodes['Logo'] as Mesh).geometry}
        position={podiumNodes['Hexagon010Place'].position}
        scale={sc}
      />

      <mesh
        geometry={(typescriptLogoNodes['Logo'] as Mesh).geometry}
        position={podiumNodes['Hexagon009Place'].position}
        scale={sc}
      />

      <mesh
        geometry={(linkedinLogoNodes['Logo'] as Mesh).geometry}
        position={podiumNodes['Hexagon008Place'].position}
        scale={sc}
      />

      <mesh
        geometry={(gmailLogoNodes['Logo'] as Mesh).geometry}
        position={podiumNodes['Hexagon007Place'].position}
        scale={sc}
      />

      <mesh
        geometry={(telegramLogoNodes['Logo'] as Mesh).geometry}
        position={podiumNodes['Hexagon006Place'].position}
        scale={sc}
      />

      <mesh
        geometry={(githubLogoNodes['Logo'] as Mesh).geometry}
        position={podiumNodes['Hexagon005Place'].position}
        scale={sc}
      />

      <mesh
        geometry={(weatherProjectLogoNodes['Logo'] as Mesh).geometry}
        position={podiumNodes['Hexagon004Place'].position}
        scale={sc}
      />

      <mesh
        geometry={(sassLogoNodes['Logo'] as Mesh).geometry}
        position={podiumNodes['Hexagon003Place'].position}
        scale={sc}
      />

      <mesh
        geometry={(ukraineNodes['Logo'] as Mesh).geometry}
        position={podiumNodes['Hexagon002Place'].position}
        scale={sc}
      />
    </group>
  );
}

useGLTF.preload('models/podium.glb');
useGLTF.preload('models/angular-logo.glb');
useGLTF.preload('models/react-logo.glb');
useGLTF.preload('models/nodejs-logo.glb');
useGLTF.preload('models/nestjs-logo.glb');
useGLTF.preload('models/typescript-logo.glb');
useGLTF.preload('models/linkedin-logo.glb');
useGLTF.preload('models/gmail-logo.glb');
useGLTF.preload('models/telegram-logo.glb');
useGLTF.preload('models/github-logo.glb');
useGLTF.preload('models/weather-project-logo.glb');
useGLTF.preload('models/sass-logo.glb');
useGLTF.preload('models/ukraine.glb');
