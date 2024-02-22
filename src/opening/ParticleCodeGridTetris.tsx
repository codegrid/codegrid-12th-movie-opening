/* eslint-disable capitalized-comments */
import { ParticleTetrimino } from "./ParticleTetrimino"
import { COLORS, SCENARIO, TetriminoType } from "./tetris-settings"

export const ParticleCodeGridTetris: React.FC = () => {
  return (
    <>
      {SCENARIO.map((scene) => {
        return (
          <>
            {scene.map(({ color, list, startX, endY }) => {
              const tet = list[list.length - 1]
              return (
                <ParticleTetrimino
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
