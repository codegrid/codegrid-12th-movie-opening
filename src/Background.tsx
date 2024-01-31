import React from "react"
import { AbsoluteFill, Img, staticFile } from "remotion"

export const Background: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#fff"
      }}
    >
      <Img src={staticFile("codegrid-wave.svg")} />
    </AbsoluteFill>
  )
}
