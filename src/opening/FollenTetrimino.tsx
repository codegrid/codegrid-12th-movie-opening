/* eslint-disable capitalized-comments */
import { AbsoluteFill, useVideoConfig } from "remotion"
import { BLOCK_SIZE } from "./tetris-settings"
import { Rect } from "@remotion/shapes"
import { useMemo } from "react"

interface Props {
  blocks: number[][]
  offsetX: number
  endY: number
  color: string
}

export const FollenTetrimino: React.FC<Props> = ({ blocks, offsetX, color, endY }) => {
  const { height } = useVideoConfig()

  // テトリミノはlastTetriminoYの位置で止まる
  const topEnd = useMemo(() => {
    return height - BLOCK_SIZE * (endY + blocks.length)
  }, [height, endY, blocks.length])

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
                height: BLOCK_SIZE
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
