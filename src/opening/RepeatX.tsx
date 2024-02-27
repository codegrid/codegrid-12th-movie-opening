import { AbsoluteFill } from "remotion"
import { BLOCK_SIZE } from "./tetris-settings"

interface Props {
  children: React.ReactNode
  repeat: number
  blockCountX: number
}

export const RepeatX: React.FC<Props> = ({ children, repeat, blockCountX }) => {
  return (
    <>
      {Array.from({ length: repeat }, (_, i) => i).map((j) => (
        <AbsoluteFill
          style={{
            transform: `translate(${BLOCK_SIZE * blockCountX * j}px, 0)`
          }}
        >
          {children}
        </AbsoluteFill>
      ))}
    </>
  )
}
