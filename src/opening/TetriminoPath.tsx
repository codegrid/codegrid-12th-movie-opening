/* eslint-disable capitalized-comments */
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion"
import { BLOCK_SIZE } from "./tetris-settings"
import { Rect } from "@remotion/shapes"
import { useMemo } from "react"

interface Props {
  blocks: number[][]
  offsetX: number
  endY: number
  color: string
}

export const TetriminoPath: React.FC<Props> = ({ blocks, offsetX, color, endY }) => {
  const { height } = useVideoConfig()
  const frame = useCurrentFrame()

  // テトリミノはlastTetriminoYの位置で止まる
  const topEnd = useMemo(() => {
    return height - BLOCK_SIZE * (endY + blocks.length)
  }, [height, endY, blocks.length])

  // 点滅
  const opacity = interpolate(frame, [0, 5, 10, 15, 20], [1, 0, 1, 0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  })

  return (
    <>
      {blocks.map((row, y) => {
        return row.map((cell, x) => {
          return (
            <AbsoluteFill
              key={`${y}-${x}`}
              style={{
                left: (x + offsetX) * BLOCK_SIZE,
                top: topEnd + y * BLOCK_SIZE,
                width: BLOCK_SIZE,
                height: BLOCK_SIZE,
                opacity
              }}
            >
              <Rect width={BLOCK_SIZE} height={BLOCK_SIZE} fill={cell === 0 ? "none" : color} />
            </AbsoluteFill>
          )
        })
      })}
    </>
  )
}
