/* eslint-disable capitalized-comments */
import { ExplosionBlock } from "./ExplosionBlock"
import { COLORS, SCENARIO, TetriminoType } from "./tetris-settings"

export const ExplosionCodeGridTetris: React.FC = () => {
  return (
    <>
      {SCENARIO.map((scene) => {
        return (
          <>
            {scene.map(({ color, list, startX, endY }) => {
              const tet = list[list.length - 1]
              return (
                <ExplosionBlock blocks={tet} offsetX={startX} endY={endY ?? 0} color={COLORS[color as TetriminoType]} />
              )
            })}
          </>
        )
      })}
    </>
  )
}
