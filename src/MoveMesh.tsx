import React from "react"
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion"

export const MoveMesh: React.FC<{
  children: React.ReactElement[]
  x?: number
}> = ({ children, x = 0 }) => {
  const { fps } = useVideoConfig()
  const frame = useCurrentFrame()
  const down = spring({
    fps,
    frame,
    config: {
      damping: 200
    },
    durationInFrames: 120
  })
  const y = interpolate(down, [0, 1], [10, -10])

  return (
    <mesh castShadow position={[x, y, 0]}>
      {children}
    </mesh>
  )
}
