import { ThreeCanvas } from "@remotion/three"
import { AbsoluteFill, Sequence, useVideoConfig } from "remotion"
import { Background } from "./Background"
import { MoveGroup } from "./MoveGroup"
import { TetriminoInner, Tetriminos } from "./Tetrimino"

const tetriminos = Object.keys(Tetriminos)

const tetriminoX = (i: number) => {
  return tetriminos.slice(0, i).reduce((acc, tetriType) => {
    const { width } = Tetriminos[tetriType]
    return acc + width
  }, 0)
}

export const MyComposition: React.FC = () => {
  const { width, height } = useVideoConfig()

  return (
    <AbsoluteFill>
      <Background />
      <ThreeCanvas width={width} height={height}>
        <ambientLight />
        <spotLight castShadow angle={0.25} penumbra={0.5} position={[10, 10, 5]} />
        {Object.keys(Tetriminos).map((tetriType, i) => (
          <Sequence layout="none" from={i * 10}>
            <MoveGroup x={tetriminoX(i)}>
              <TetriminoInner type={tetriType} />
            </MoveGroup>
          </Sequence>
        ))}
      </ThreeCanvas>
    </AbsoluteFill>
  )
}
