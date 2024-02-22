/* eslint-disable capitalized-comments */
import { TetriminoPath } from "./TetriminoPath"
import { COLORS, SCENARIO, TetriminoType } from "./tetris-settings"

export const StaticCodeGridTetris: React.FC = () => {
  return (
    <>
      {SCENARIO.map((scene) => {
        return (
          <>
            {scene.map(({ color, list, startX, endY }) => {
              const tet = list[list.length - 1]
              return (
                <TetriminoPath blocks={tet} offsetX={startX} endY={endY ?? 0} color={COLORS[color as TetriminoType]} />
              )
            })}
          </>
        )
      })}
    </>
  )
}
