/* eslint-disable capitalized-comments */
import { noise2D } from "@remotion/noise"
import { useMemo } from "react"
import { useVideoConfig } from "remotion"
import { BLOCK_SIZE } from "../tetris-settings"

interface Props {
  blocks: number[][]
  offsetX: number
  color: string
}

export const CrystalTetrimino: React.FC<Props> = ({ blocks, offsetX, color }) => {
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

  const opacity = noise2D("opacity", offsetX, blocks.length) * 0.5 + 0.5

  return (
    <svg width={width} height={height}>
      <path d={svgPath} fill="#fff" />
      <path d={svgPath} stroke={color} fill={color} fill-opacity={opacity} />
    </svg>
  )
}
