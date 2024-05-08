/* eslint-disable capitalized-comments */
import { useMemo } from "react"
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, random } from "remotion"
import { BLOCK_SIZE, ONE_DURATION } from "../tetris-settings"
import { stepEasing } from "../easing"

const STAGE_HEIGHT = BLOCK_SIZE * 3 * 2

interface Props {
  tetriminoBlocksY: number
  lastTetriminoY: number
  randomSeed: number
  delay: number
  children: React.ReactNode
}

export const Fall: React.FC<Props> = ({ tetriminoBlocksY, lastTetriminoY, randomSeed, children, delay }) => {
  const { height } = useVideoConfig()
  const frame = useCurrentFrame()

  // テトリミノは画面外から落ちてくる
  const topStart = useMemo(() => {
    return -BLOCK_SIZE * tetriminoBlocksY - STAGE_HEIGHT
  }, [tetriminoBlocksY])

  // テトリミノはlastTetriminoYの位置で止まる
  const topEnd = useMemo(() => {
    return height - BLOCK_SIZE * (lastTetriminoY + tetriminoBlocksY) - STAGE_HEIGHT
  }, [height, lastTetriminoY, tetriminoBlocksY])

  const y = interpolate(
    frame - delay,
    [random(randomSeed) * ONE_DURATION, random(randomSeed) * ONE_DURATION + ONE_DURATION],
    [topStart, topEnd],
    {
      easing: (t) => stepEasing(t, 4),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp"
    }
  )

  return (
    <AbsoluteFill
      style={{
        width: BLOCK_SIZE,
        height: BLOCK_SIZE * tetriminoBlocksY,
        translate: `0 ${y}px`
      }}
    >
      {children}
    </AbsoluteFill>
  )
}
