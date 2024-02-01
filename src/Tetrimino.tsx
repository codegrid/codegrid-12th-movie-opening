import { Block, Cube } from "./Cube"

interface TetriminoDefinition {
  blocks: Block[]
  width: number
  color: string
}

export type TetriminoType = keyof typeof Tetriminos

export const Tetriminos: { [key: string]: TetriminoDefinition } = {
  OrangeRicky: {
    blocks: [
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 0, z: 0 },
      { x: -1, y: 0, z: 0 },
      { x: 1, y: 1, z: 0 }
    ],
    width: 3,
    color: "#ff9562"
  },
  BlueRicky: {
    blocks: [
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 0, z: 0 },
      { x: -1, y: 0, z: 0 },
      { x: -1, y: 1, z: 0 }
    ],
    width: 3,
    color: "#5eaeff"
  },
  ClevelandZ: {
    blocks: [
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 0, z: 0 },
      { x: 0, y: -1, z: 0 },
      { x: -1, y: -1, z: 0 }
    ],
    width: 3,
    color: "#de5f75"
  },
  RhodeIslandZ: {
    blocks: [
      { x: 0, y: 0, z: 0 },
      { x: -1, y: 0, z: 0 },
      { x: 0, y: -1, z: 0 },
      { x: 1, y: -1, z: 0 }
    ],
    width: 3,

    color: "#79dd53"
  },
  Hero: {
    blocks: [
      { x: 0, y: 0, z: 0 },
      { x: -1, y: 0, z: 0 },
      { x: 1, y: 0, z: 0 },
      { x: 2, y: 0, z: 0 }
    ],
    width: 4,
    color: "#3fdcd5"
  },
  Teewee: {
    blocks: [
      { x: 0, y: 0, z: 0 },
      { x: -1, y: 0, z: 0 },
      { x: 1, y: 0, z: 0 },
      { x: 0, y: 1, z: 0 }
    ],
    width: 3,
    color: "#af60ff"
  },
  Smashboy: {
    blocks: [
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 0, z: 0 },
      { x: 0, y: -1, z: 0 },
      { x: 1, y: -1, z: 0 }
    ],
    width: 2,
    color: "#ffff4d"
  }
}

interface TetriminoProps {
  type: TetriminoType
  position: [number, number, number]
  blocks: Block[]
  scale?: number
  rotation?: [number, number, number]
}

export const Tetrimino: React.FC<TetriminoProps> = ({ type, position, blocks, scale = 1, rotation = [0, 0, 0] }) => {
  const tetriminoColor = Tetriminos[type].color

  return (
    <group position={position} scale={[scale, scale, scale]} rotation={rotation}>
      {blocks.map((block, index) => (
        <Cube key={index} position={[block.x, block.y, block.z]} color={tetriminoColor} />
      ))}
    </group>
  )
}

interface TetriminoInnerProps {
  type: TetriminoType
}

export const TetriminoInner: React.FC<TetriminoInnerProps> = ({ type }) => {
  const { color, blocks } = Tetriminos[type]

  return (
    <>
      {blocks.map((block, index) => (
        <Cube key={index} position={[block.x, block.y, block.z]} color={color} />
      ))}
    </>
  )
}
