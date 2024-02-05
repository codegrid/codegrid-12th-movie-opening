/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Rect } from "@remotion/shapes"
import { AbsoluteFill, interpolate, random, Sequence, useCurrentFrame, useVideoConfig } from "remotion"
import { BLOCK_SIZE } from "./const"

const TET_SIZE = 4

const COLORS = {
  I: "#9ADCFF",
  O: "#FFF89A",
  T: "#B1AFFF",
  S: "#C9F4AA",
  Z: "#FF8AAE",
  J: "#00A9FF",
  L: "#FFCF96"
}

const TETROMINOS = {
  I: {
    default: [[3], [3], [3], [3]],
    rotateR: [[3, 3, 3, 3]],
    rotateL: [[3, 3, 3, 3]]
  },
  O: {
    default: [
      [7, 7],
      [7, 7]
    ],
    rotateR: [
      [7, 7],
      [7, 7]
    ],
    rotateL: [
      [7, 7],
      [7, 7]
    ]
  },
  T: {
    default: [
      [0, 6, 0],
      [6, 6, 6]
    ],
    rotateR: [
      [6, 0],
      [6, 6],
      [6, 0]
    ],
    rotateL: [
      [0, 6],
      [6, 6],
      [0, 6]
    ]
  },
  S: {
    default: [
      [0, 2, 2],
      [2, 2, 0]
    ],
    rotateR: [
      [2, 0],
      [2, 2],
      [0, 2]
    ],
    rotateL: [
      [0, 2],
      [2, 2],
      [2, 0]
    ]
  },
  Z: {
    default: [
      [1, 1, 0],
      [0, 1, 1]
    ],
    rotateR: [
      [0, 1],
      [1, 1],
      [1, 0]
    ],
    rotateL: [
      [1, 0],
      [1, 1],
      [0, 1]
    ]
  },
  L: {
    default: [
      [1, 0],
      [1, 0],
      [1, 1]
    ],
    rotateR: [
      [1, 1, 1],
      [1, 0, 0]
    ],
    rotateL: [
      [0, 0, 1],
      [1, 1, 1]
    ]
  },
  J: {
    default: [
      [0, 5],
      [0, 5],
      [5, 5]
    ],
    rotateR: [
      [5, 0, 0],
      [5, 5, 5]
    ],
    rotateL: [
      [5, 5, 5],
      [0, 0, 5]
    ]
  }
}

// シナリオ
const SCENARIO = [
  // 1番下の行を埋めるまで
  [
    {
      type: "I",
      startX: 0,
      list: [TETROMINOS.I.default, TETROMINOS.I.rotateR]
    },
    {
      type: "I",
      startX: 5,
      list: [TETROMINOS.I.default, TETROMINOS.I.rotateR]
    }
  ],
  [
    {
      type: "L",
      startX: 4,
      list: [TETROMINOS.L.default, TETROMINOS.L.rotateR]
    },
    {
      type: "J",
      startX: 7,
      list: [TETROMINOS.J.default, TETROMINOS.J.rotateL]
    }
  ]
]

export const TetrisGridAnimation: React.FC = () => {
  const { height } = useVideoConfig()
  const frame = useCurrentFrame()

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "white"
      }}
    >
      <>
        {/** シナリオ通りのアニメーション */}
        {SCENARIO.map((scene, i) => {
          return (
            <Sequence from={i * 30}>
              {scene.map(({ type, list, startX }, j) => {
                // 30フレームで1行落とすが、その間にlist通りの切り替えを行う

                // list.length分だけ[0,30]区間を分割する
                const inputRange = Array.from({ length: list.length }, (_, i) => i * (30 / list.length))
                // 分割した区間のランダムな地点でlistの要素を切り替える
                const outputRange = list.map((_, i) => i + random(startX))

                const tet =
                  list[
                    Math.floor(
                      interpolate(frame, inputRange, outputRange, {
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
                        frame - i * 30,
                        [random(startX) * 30, (random(startX) + 1) * 30],
                        [-BLOCK_SIZE * tet.length, height - BLOCK_SIZE * tet.length],
                        {
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
                            <Rect
                              width={BLOCK_SIZE}
                              height={BLOCK_SIZE}
                              fill={cell === 0 ? "none" : COLORS[type as keyof typeof TETROMINOS]}
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
