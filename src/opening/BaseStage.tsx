/* eslint-disable capitalized-comments */
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion"
import { BLOCK_SIZE, COLORS, TetriminoType, TETROMINOS } from "./tetris-settings"
import { CrystalTetrimino } from "./CrystalTetrimono"
import { RepeatX } from "./RepeatX"

const LINE_FILL_BLOCKS = [
  {
    color: "L",
    offsetX: 0,
    offsetY: 0,
    block: TETROMINOS.L.default
  },
  {
    color: "Z",
    offsetX: 1,
    offsetY: 0,
    block: TETROMINOS.Z.rotateL
  },
  {
    color: "T",
    offsetX: 2,
    offsetY: 0,
    block: TETROMINOS.T.inverse
  },
  {
    color: "S",
    offsetX: 3,
    offsetY: 1,
    block: TETROMINOS.S.default
  },
  {
    color: "I",
    offsetX: 5,
    offsetY: 2,
    block: TETROMINOS.I.rotateL
  },
  {
    color: "Z",
    offsetX: 5,
    offsetY: 0,
    block: TETROMINOS.Z.default
  },
  {
    color: "T",
    offsetX: 7,
    offsetY: 0,
    block: TETROMINOS.T.inverse
  },
  {
    color: "O",
    offsetX: 9,
    offsetY: 1,
    block: TETROMINOS.O.default
  },
  {
    color: "J",
    offsetX: 10,
    offsetY: 0,
    block: TETROMINOS.L.inverse
  }
]

const SPEED = 2

interface Props {
  appeared?: boolean
}

export const BaseStage: React.FC<Props> = ({ appeared = false }) => {
  const { height } = useVideoConfig()
  const frame = useCurrentFrame()
  return (
    <AbsoluteFill>
      {Array.from({ length: 2 }, (_, i) => i).map((line) => (
        <AbsoluteFill
          style={{
            transform: `translate(0, ${-BLOCK_SIZE * 3 * line}px) rotateY(${180 * line}deg)`
          }}
        >
          <AbsoluteFill style={{ mixBlendMode: "overlay", transform: `translate(0, ${height - BLOCK_SIZE * 3}px)` }}>
            {Array.from({ length: 4 }, (_, i) => i).map((j) => (
              <RepeatX key={j} repeat={4} blockCountX={12}>
                {LINE_FILL_BLOCKS.map((lineFillBlock, i) => {
                  return (
                    <AbsoluteFill
                      style={{
                        transform: `translate(0, ${BLOCK_SIZE * lineFillBlock.offsetY}px)`,
                        opacity: appeared
                          ? 1
                          : interpolate(frame, [i * SPEED, i * SPEED + SPEED * 2], [0, 1], {
                              extrapolateLeft: "clamp",
                              extrapolateRight: "clamp"
                            })
                      }}
                    >
                      <CrystalTetrimino
                        key={i}
                        blocks={lineFillBlock.block}
                        offsetX={lineFillBlock.offsetX}
                        color={COLORS[lineFillBlock.color as TetriminoType]}
                      />
                    </AbsoluteFill>
                  )
                })}
              </RepeatX>
            ))}
          </AbsoluteFill>
        </AbsoluteFill>
      ))}
    </AbsoluteFill>
  )
}
