/* eslint-disable capitalized-comments */
import { useMemo } from "react"
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, random } from "remotion"
import { BLOCK_SIZE, ONE_DURATION } from "./tetris-settings"

// コマ送りイージング関数
// 'steps' はアニメーションのステップ数を表す
// 't' は進行度を表し、0から1までの値を取ります
const stepEasing = (t: number, steps: number) => {
  // 進行度に応じてステップ数に変換
  const stepSize = 1 / steps
  // 進行度をステップ数で割った結果を切り捨てて、現在のステップ位置を計算
  const stepIndex = Math.floor(t / stepSize)
  // 現在のステップ位置に基づいて値を返す
  return stepIndex * stepSize
}

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
    return -BLOCK_SIZE * tetriminoBlocksY
  }, [tetriminoBlocksY])

  // テトリミノはlastTetriminoYの位置で止まる
  const topEnd = useMemo(() => {
    return height - BLOCK_SIZE * (lastTetriminoY + tetriminoBlocksY)
  }, [height, lastTetriminoY, tetriminoBlocksY])

  const y = interpolate(
    frame - delay,
    [random(randomSeed) * ONE_DURATION, (random(randomSeed) + 1) * ONE_DURATION],
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
