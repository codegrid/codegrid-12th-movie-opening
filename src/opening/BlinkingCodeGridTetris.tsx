/* eslint-disable capitalized-comments */
import { BlinkingTetrimino } from "./BlinkingTetrimino"
import { COLORS, SCENARIO, TetriminoType } from "./tetris-settings"

export const BlinkingCodeGridTetris: React.FC = () => {
  return (
    <>
      {SCENARIO.map((scene) => {
        return (
          <>
            {scene.map(({ color, list, startX, endY }) => {
              const tet = list[list.length - 1]
              return (
                <BlinkingTetrimino
                  blocks={tet}
                  offsetX={startX}
                  endY={endY ?? 0}
                  color={COLORS[color as TetriminoType]}
                />
              )
            })}
          </>
        )
      })}
    </>
  )
}
