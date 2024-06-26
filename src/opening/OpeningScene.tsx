/* eslint-disable capitalized-comments */
import { interpolate, useCurrentFrame } from "remotion"
import { Series, AbsoluteFill, Audio, staticFile } from "remotion"
import { CodeGridWave } from "./background/CodeGridWave"
import { BaseStage } from "./base-stage/BaseStage"
import { TranslateOnStage } from "./base-stage/TranslateOnStage"
import { CodeGridTetris } from "./scene-1-tetris/CodeGridTetris"
import { FollenCodeGridTetris } from "./scene-2-clear/FollenCodeGridTetris"
import { BlinkDown } from "./scene-2-clear/BlinkDown"
import { ParticleCodeGridTetris } from "./scene-3-particle/ParticleCodeGridTetris"

export const OpeningScene: React.FC = () => {
  const frame = useCurrentFrame()
  return (
    <AbsoluteFill>
      <CodeGridWave />
      <Series>
        <Series.Sequence durationInFrames={120}>
          <BaseStage />
          <CodeGridTetris />
          <Audio loop src={staticFile("sound/0-fall.wav")} muted={frame < 13 || frame > 95} playbackRate={1.5} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={30}>
          <BlinkDown>
            <TranslateOnStage>
              <FollenCodeGridTetris />
            </TranslateOnStage>
            <BaseStage appeared />
          </BlinkDown>
          <Audio loop src={staticFile("sound/1-splash1.wav")} toneFrequency={0.5} playbackRate={1.6} volume={0.8} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={50}>
          <ParticleCodeGridTetris />
          <Audio
            src={staticFile("sound/2-splash2.wav")}
            startFrom={15}
            playbackRate={0.8}
            volume={(f) => interpolate(f, [0, 50], [0, 1], { extrapolateLeft: "clamp" })}
          />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  )
}
