/* eslint-disable capitalized-comments */
import { Series, AbsoluteFill } from "remotion"
import { CodeGridWave } from "../background/CodeGridWave"
import { CodeGridTetris } from "./CodeGridTetris"
import { StaticCodeGridTetris } from "./StaticCodeGridTetris"

export const OpeningScene: React.FC = () => {
  return (
    <AbsoluteFill>
      <CodeGridWave />
      <Series>
        <Series.Sequence durationInFrames={100}>
          <CodeGridTetris />
        </Series.Sequence>
        <Series.Sequence durationInFrames={120}>
          <StaticCodeGridTetris />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  )
}
