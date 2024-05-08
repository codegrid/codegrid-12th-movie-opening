/* eslint-disable capitalized-comments */
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion"
import { BLOCK_SIZE } from "../tetris-settings"
import { Rect } from "@remotion/shapes"
import { noise3D } from "@remotion/noise"
import { useMemo } from "react"

interface Props {
  blocks: number[][]
  offsetX: number
  endY: number
  color: string
}

export const ParticleTetrimino: React.FC<Props> = ({ blocks, offsetX, color, endY }) => {
  const { height, fps } = useVideoConfig()
  const frame = useCurrentFrame()

  // テトリミノはlastTetriminoYの位置で止まる
  const startY = useMemo(() => {
    return height - BLOCK_SIZE * (endY + blocks.length)
  }, [height, endY, blocks.length])

  const down = spring({
    fps,
    frame,
    config: {
      damping: 100,
      stiffness: 200,
      mass: 3
    },
    durationInFrames: 120
  })

  const translateY = interpolate(down, [0, 1], [0, height + startY], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp"
  })

  const radius = interpolate(frame, [0, 5], [0, BLOCK_SIZE * 0.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  })

  const opacity = interpolate(frame, [0, 20], [1, 0.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  })

  const scale = interpolate(frame, [0, 30], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  })

  return (
    <AbsoluteFill
      style={{
        transform: `translate(0px, ${-translateY}px)`
      }}
    >
      {blocks.map((row, y) => {
        return row.map((cell, x) => {
          const baseX = (x + offsetX) * BLOCK_SIZE
          const baseY = startY + y * BLOCK_SIZE

          const dx = noise3D(baseX, x, y, frame * 0.01) * BLOCK_SIZE * BLOCK_SIZE

          return (
            <AbsoluteFill
              key={`${y}-${x}`}
              style={{
                left: baseX,
                top: baseY,
                width: BLOCK_SIZE,
                height: BLOCK_SIZE,
                transform: `translate(${dx}px, ${-dx}px) scale(${scale})`,
                opacity,
                mixBlendMode: "screen"
              }}
            >
              <Rect width={BLOCK_SIZE} height={BLOCK_SIZE} cornerRadius={radius} fill={cell === 0 ? "none" : color} />
            </AbsoluteFill>
          )
        })
      })}
    </AbsoluteFill>
  )
}
