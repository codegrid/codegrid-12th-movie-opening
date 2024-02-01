import React from "react"
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion"

export const MoveGroup: React.FC<{
  children: React.ReactElement
  x?: number
}> = ({ children, x = 0 }) => {
  const { height } = useVideoConfig()
  const frame = useCurrentFrame()

  const h = interpolate(height, [0, height], [0, 1], {
    extrapolateRight: "clamp"
  })

  const y = interpolate(frame, [0, 20], [10, -h], {
    extrapolateRight: "clamp"
  })

  return <group position={[x, y, 0]}>{children}</group>
}
