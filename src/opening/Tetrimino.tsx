/* eslint-disable capitalized-comments */
import { useMemo } from "react"
import { useVideoConfig } from "remotion"
import { BLOCK_SIZE } from "./tetris-settings"

interface Props {
  blocks: number[][]
  offsetX: number
  color: string
}

export const Tetrimino: React.FC<Props> = ({ blocks, offsetX, color }) => {
  const { width, height } = useVideoConfig()

  const svgPath = useMemo(() => {
    return blocks
      .map((row, y) => {
        return row
          .map((cell, x) => {
            if (cell === 0) return ""
            return `M${(x + offsetX) * BLOCK_SIZE} ${y * BLOCK_SIZE} h${BLOCK_SIZE} v${BLOCK_SIZE} h-${BLOCK_SIZE} Z`
          })
          .join("")
      })
      .join("")
  }, [blocks, offsetX])

  return (
    <svg width={width} height={height}>
      <path d={svgPath} fill={color} />
    </svg>
  )
}
