import React from "react"
import { Easing, Freeze, interpolate, useCurrentFrame } from "remotion"

const remapSpeed = ({ frame, speed }: { frame: number; speed: (fr: number) => number }) => {
  let framesPassed = 0
  for (let i = 0; i <= frame; i++) {
    framesPassed += speed(i)
  }

  return framesPassed
}

export const Accelerate: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const frame = useCurrentFrame()
  const remappedFrame = remapSpeed({
    frame,
    speed: (f) => {
      return interpolate(f, [0, 30, 31, 100], [0.5, 0.5, 0.55, 1], {
        easing: Easing.bezier(0.33, 1, 0.68, 1),
        extrapolateRight: "clamp"
      })
    }
  })

  return <Freeze frame={remappedFrame}>{children}</Freeze>
}
