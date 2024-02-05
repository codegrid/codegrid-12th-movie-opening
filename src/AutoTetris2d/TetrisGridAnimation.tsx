/* eslint-disable capitalized-comments */
import { Rect } from "@remotion/shapes"
import { AbsoluteFill, Easing, interpolate, random, Sequence, useCurrentFrame, useVideoConfig } from "remotion"
import { Background } from "../Background"
import { BLOCK_SIZE, COLORS, ONE_DURATION, SCENARIO, TETROMINOS } from "./const"

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

export const TetrisGridAnimation: React.FC = () => {
  const { height } = useVideoConfig()
  const frame = useCurrentFrame()

  return (
    <AbsoluteFill>
      <Background />
      <>
        {/** シナリオ通りのアニメーション */}
        {SCENARIO.map((scene, i) => {
          const startT = 0.5 * i * ONE_DURATION
          return (
            <Sequence from={startT}>
              {scene.map(({ color, list, startX, endY = 0 }, j) => {
                // 30フレームで1行落とすが、その間にlist通りの切り替えを行う

                // list.length分だけ[0,ONE_DURATION]区間を分割する
                const inputRange = Array.from({ length: list.length }, (_, i) => i * (ONE_DURATION / (list.length - 1)))
                // 分割した区間のランダムな地点でlistの要素を切り替える
                const outputRange = list.map((_, i) => i + random(startX))

                const tet =
                  list[
                    Math.floor(
                      interpolate(frame - startT, inputRange, outputRange, {
                        easing: (t) => stepEasing(t, list.length),
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp"
                      })
                    )
                  ]

                return (
                  <AbsoluteFill
                    key={`${i}-${j}`}
                    style={{
                      width: BLOCK_SIZE,
                      height: BLOCK_SIZE * tet.length,
                      top: interpolate(
                        frame - startT,
                        [random(startX) * ONE_DURATION, (random(startX) + 1) * ONE_DURATION],
                        [-BLOCK_SIZE * tet.length, height - BLOCK_SIZE * (tet.length + endY)],
                        {
                          easing: Easing.in((t) => stepEasing(t, tet.length)),
                          // easing: Easing.bezier(0.83, 0, 0.17, 1),
                          extrapolateLeft: "clamp",
                          extrapolateRight: "clamp"
                        }
                      )
                    }}
                  >
                    {tet.map((row, y) => {
                      return row.map((cell, x) => {
                        return (
                          <AbsoluteFill
                            key={`${i}-${j}-${y}-${x}`}
                            style={{
                              left: (x + startX) * BLOCK_SIZE,
                              top: y * BLOCK_SIZE
                            }}
                          >
                            {x === 0 && y === 0 && <AbsoluteFill>{startX}</AbsoluteFill>}
                            <Rect
                              width={BLOCK_SIZE}
                              height={BLOCK_SIZE}
                              fill={cell === 0 ? "none" : COLORS[color as keyof typeof TETROMINOS]}
                            />
                          </AbsoluteFill>
                        )
                      })
                    })}
                  </AbsoluteFill>
                )
              })}
            </Sequence>
          )
        })}
      </>
    </AbsoluteFill>
  )
}
