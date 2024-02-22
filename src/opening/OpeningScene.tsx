/* eslint-disable capitalized-comments */
import { Series, AbsoluteFill } from "remotion"
import { CodeGridWave } from "../background/CodeGridWave"
import { CodeGridTetris } from "./CodeGridTetris"
import { BlinkingCodeGridTetris } from "./BlinkingCodeGridTetris"
import { ExplosionCodeGridTetris } from "./ExplosionCodeGridTetris"

export const OpeningScene: React.FC = () => {
  return (
    <AbsoluteFill>
      <CodeGridWave />
      <Series>
        <Series.Sequence durationInFrames={100}>
          <CodeGridTetris />
        </Series.Sequence>
        <Series.Sequence durationInFrames={30}>
          <BlinkingCodeGridTetris />
        </Series.Sequence>
        <Series.Sequence durationInFrames={50}>
          <ExplosionCodeGridTetris />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  )
}
