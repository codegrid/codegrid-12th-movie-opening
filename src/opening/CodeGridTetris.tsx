/* eslint-disable capitalized-comments */
import { AbsoluteFill, getRemotionEnvironment, interpolate, random, useCurrentFrame } from "remotion"
import { Tetrimino } from "./Tetrimino"
import { BLOCK_SIZE, COLORS, ONE_DURATION, SCENARIO, TetriminoType } from "./tetris-settings"
import { Fall } from "./Fall"
import { stepEasing } from "./easing"

export const CodeGridTetris: React.FC = () => {
  const { isStudio } = getRemotionEnvironment()
  const frame = useCurrentFrame()

  return (
    <AbsoluteFill>
      <>
        {SCENARIO.map((scene, i) => {
          const startT = i * ONE_DURATION
          return (
            <>
              {scene.map(({ color, list, startX, endY = 0 }, j) => {
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
                  <Fall
                    key={`tetris-${i}${j}`}
                    tetriminoBlocksY={tet.length}
                    lastTetriminoY={endY}
                    randomSeed={startX}
                    delay={startT}
                  >
                    <Tetrimino blocks={tet} offsetX={startX} color={COLORS[color as TetriminoType]} />
                    {/** デバッグ用 */}
                    {isStudio && <AbsoluteFill style={{ left: startX * BLOCK_SIZE }}>{startX}</AbsoluteFill>}
                  </Fall>
                )
              })}
            </>
          )
        })}
      </>
    </AbsoluteFill>
  )
}
