/* eslint-disable capitalized-comments */
import { Series, AbsoluteFill } from "remotion"
import { CodeGridWave } from "../background/CodeGridWave"
import { CodeGridTetris } from "./CodeGridTetris"
import { FollenCodeGridTetris } from "./FollenCodeGridTetris"
import { ParticleCodeGridTetris } from "./ParticleCodeGridTetris"
import { BaseStage } from "./BaseStage"
import { Blinking } from "./Blinking"
import { TranslateOnStage } from "./TranslateOnStage"

export const OpeningScene: React.FC = () => {
  return (
    <AbsoluteFill>
      <CodeGridWave />
      <Series>
        <Series.Sequence durationInFrames={120}>
          <BaseStage />
          <CodeGridTetris />
        </Series.Sequence>
        <Series.Sequence durationInFrames={30}>
          <Blinking>
            <TranslateOnStage>
              <FollenCodeGridTetris />
            </TranslateOnStage>
            <BaseStage appeared />
          </Blinking>
        </Series.Sequence>
        <Series.Sequence durationInFrames={50}>
          <ParticleCodeGridTetris />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  )
}
