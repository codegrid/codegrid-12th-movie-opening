import { interpolate, spring } from "remotion"
import { useCurrentFrame } from "remotion"
import { ThreeCanvas } from "@remotion/three"
import React from "react"
import { useVideoConfig } from "remotion"
import { z } from "zod"
import { zColor } from "@remotion/zod-types"
import { Tetrimino, Tetriminos } from "./Tetrimino"
import { Bounds } from "@react-three/drei"

export const myCompSchema = z.object({
  phoneColor: zColor(),
  deviceType: z.enum(["phone", "tablet"])
})

type MyCompSchemaType = z.infer<typeof myCompSchema>

export const Scene: React.FC<MyCompSchemaType> = () => {
  const frame = useCurrentFrame()

  const { width, height, fps } = useVideoConfig()

  const entranceAnimation = spring({
    frame,
    fps,
    config: {
      damping: 200,
      mass: 300
    }
  })

  return (
    <ThreeCanvas
      shadows
      width={width}
      height={height}
      camera={{
        position: [0, 0, 10],
        fov: 45
      }}
    >
      <ambientLight />
      <spotLight castShadow angle={0.25} penumbra={0.5} position={[10, 10, 5]} />

      <Bounds fit clip>
        {Object.keys(Tetriminos).map((type, index) => {
          const tetrimino = Tetriminos[type as keyof typeof Tetriminos]
          return (
            <Tetrimino
              key={index}
              type={type as keyof typeof Tetriminos}
              position={[index * 2 - 10, interpolate(entranceAnimation, [0, 1], [10, -10]), 0]}
              blocks={tetrimino.blocks}
            />
          )
        })}
      </Bounds>
    </ThreeCanvas>
  )
}
