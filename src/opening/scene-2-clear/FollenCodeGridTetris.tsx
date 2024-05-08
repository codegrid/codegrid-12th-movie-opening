/* eslint-disable capitalized-comments */
import { FollenTetrimino } from "./FollenTetrimino"
import { COLORS, SCENARIO, TetriminoType } from "../tetris-settings"

export const FollenCodeGridTetris: React.FC = () => {
  return (
    <>
      {SCENARIO.map((scene) => {
        return (
          <>
            {scene.map(({ color, list, startX, endY }) => {
              const tet = list[list.length - 1]
              return (
                <FollenTetrimino
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
