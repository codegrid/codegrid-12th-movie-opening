import { ThreeCanvas } from "@remotion/three"
import { AbsoluteFill, interpolate, Sequence, useVideoConfig } from "remotion"
import { Background } from "./Background"
import { MoveMesh } from "./MoveMesh"

export const MyComposition: React.FC = () => {
  const { width, height } = useVideoConfig()

  return (
    <AbsoluteFill>
      <Background />
      <ThreeCanvas width={width} height={height}>
        <ambientLight />
        <spotLight castShadow angle={0.25} penumbra={0.5} position={[10, 10, 5]} />
        {[...new Array(4)].map((_, i) => (
          <Sequence layout="none" from={i * 10}>
            <MoveMesh x={interpolate(i, [0, 3], [-3, 3])}>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color="orange" />
            </MoveMesh>
          </Sequence>
        ))}
      </ThreeCanvas>
    </AbsoluteFill>
  )
}
