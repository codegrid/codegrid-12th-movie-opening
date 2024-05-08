/* eslint-disable capitalized-comments */
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion"
import { BLOCK_SIZE } from "../tetris-settings"

interface Props {
  children: React.ReactNode
}

const LINE_HEIGHT = BLOCK_SIZE * 3

export const Blinking: React.FC<Props> = ({ children }) => {
  const frame = useCurrentFrame()

  // 点滅
  const opacity = interpolate(frame, [0, 5, 10, 15, 20], [1, 0, 1, 0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  })

  // 点滅と同時に1段ずつ消えていく
  const translateY = interpolate(frame, [0, 5, 10, 15, 20], [0, 0, LINE_HEIGHT, LINE_HEIGHT, LINE_HEIGHT * 2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  })

  return (
    <AbsoluteFill
      style={{
        opacity,
        transform: `translate(0, ${translateY}px)`
      }}
    >
      {children}
    </AbsoluteFill>
  )
}
