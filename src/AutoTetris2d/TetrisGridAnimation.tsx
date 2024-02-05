import { Rect } from "@remotion/shapes"
import { AbsoluteFill, Easing, interpolate, random, Sequence, useCurrentFrame, useVideoConfig } from "remotion"
import { Background } from "../Background"
import { BLOCK_SIZE } from "./const"

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
    ],
    inverse: [
      [6, 6, 6],
      [0, 6, 0]
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
    ],
    inverse: [
      [2, 2, 0],
      [0, 2, 2]
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
    ],
    inverse: [
      [1, 1],
      [0, 1],
      [0, 1]
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
    ],
    inverse: [
      [5, 5],
      [5, 0],
      [5, 0]
    ]
  }
}

// シナリオ
const SCENARIO = [
  // 下から1段目
  [
    {
      color: "I",
      startX: 0,
      list: [TETROMINOS.I.default, TETROMINOS.I.rotateR]
    },
    {
      color: "I",
      startX: 5,
      list: [TETROMINOS.I.default, TETROMINOS.I.rotateR]
    },
    {
      color: "O",
      startX: 10,
      list: [TETROMINOS.O.default, TETROMINOS.O.rotateR]
    },
    {
      color: "J",
      startX: 12,
      list: [TETROMINOS.J.default, TETROMINOS.J.rotateR]
    },
    {
      color: "T",
      startX: 15,
      list: [TETROMINOS.T.default, TETROMINOS.T.default]
    },
    {
      color: "L",
      startX: 21,
      list: [TETROMINOS.J.default, TETROMINOS.J.rotateR]
    },
    {
      color: "I",
      startX: 25,
      list: [TETROMINOS.I.default, TETROMINOS.I.rotateR]
    },
    {
      color: "O",
      startX: 32,
      list: [TETROMINOS.O.default, TETROMINOS.O.default]
    },
    {
      color: "J",
      startX: 34,
      list: [TETROMINOS.L.default, TETROMINOS.L.rotateL]
    },
    {
      color: "O",
      startX: 37,
      list: [TETROMINOS.O.default, TETROMINOS.O.default]
    },
    {
      color: "I",
      startX: 40,
      list: [TETROMINOS.I.default, TETROMINOS.I.rotateR]
    },
    {
      color: "J",
      startX: 45,
      list: [TETROMINOS.L.default, TETROMINOS.L.default]
    },
    {
      color: "I",
      startX: 47,
      list: [TETROMINOS.I.default, TETROMINOS.I.default]
    }
  ],
  [
    {
      color: "J",
      startX: 4,
      list: [TETROMINOS.L.default, TETROMINOS.L.rotateR]
    },
    {
      color: "L",
      startX: 7,
      list: [TETROMINOS.J.default, TETROMINOS.J.rotateL]
    },
    {
      color: "S",
      startX: 17,
      list: [TETROMINOS.S.default, TETROMINOS.S.rotateL, TETROMINOS.S.inverse]
    },
    {
      color: "J",
      startX: 22,
      list: [TETROMINOS.J.default, TETROMINOS.J.rotateL]
    },
    {
      color: "Z",
      startX: 28,
      list: [TETROMINOS.Z.default, TETROMINOS.Z.default]
    },
    {
      color: "L",
      startX: 39,
      list: [TETROMINOS.L.default, TETROMINOS.L.rotateR]
    },
    {
      color: "L",
      startX: 13,
      endY: 1,
      list: [TETROMINOS.L.default, TETROMINOS.L.rotateL]
    },
    {
      color: "T",
      startX: 9,
      endY: 2,
      list: [TETROMINOS.T.default, TETROMINOS.T.rotateL]
    },
    {
      color: "L",
      startX: 25,
      endY: 1,
      list: [TETROMINOS.J.default, TETROMINOS.J.rotateR]
    }
  ],
  [
    {
      color: "T",
      startX: 19,
      list: [TETROMINOS.T.default, TETROMINOS.T.rotateL]
    },
    {
      color: "S",
      startX: 30,
      list: [TETROMINOS.S.default, TETROMINOS.S.rotateR]
    },
    {
      color: "I",
      startX: 15,
      endY: 3,
      list: [TETROMINOS.I.default, TETROMINOS.I.default]
    },
    {
      color: "S",
      startX: 7,
      endY: 3,
      list: [TETROMINOS.S.default, TETROMINOS.S.default]
    },
    {
      color: "I",
      startX: 22,
      endY: 3,
      list: [TETROMINOS.I.default, TETROMINOS.I.rotateR]
    }
  ],
  // 下から2段目
  [
    {
      color: "L",
      startX: 0,
      endY: 1,
      list: [TETROMINOS.J.default, TETROMINOS.J.rotateR]
    },
    {
      color: "T",
      startX: 2,
      endY: 1,
      list: [TETROMINOS.T.default, TETROMINOS.T.rotateL, TETROMINOS.T.inverse]
    },
    {
      color: "T",
      startX: 7,
      endY: 4,
      list: [TETROMINOS.T.default, TETROMINOS.T.rotateR]
    },
    {
      color: "I",
      startX: 20,
      endY: 3,
      list: [TETROMINOS.I.default, TETROMINOS.I.default]
    },
    {
      color: "I",
      startX: 25,
      endY: 4,
      list: [TETROMINOS.I.default, TETROMINOS.I.default]
    }
  ],
  // 下から3段目
  [
    {
      color: "Z",
      startX: 0,
      endY: 2,
      list: [TETROMINOS.Z.default, TETROMINOS.Z.rotateL]
    },
    {
      color: "J",
      startX: 2,
      endY: 3,
      list: [TETROMINOS.J.default, TETROMINOS.J.rotateR]
    },
    {
      color: "Z",
      startX: 8,
      endY: 5,
      list: [TETROMINOS.Z.default, TETROMINOS.Z.default]
    },
    {
      color: "T",
      startX: 20,
      endY: 7,
      list: [TETROMINOS.T.default, TETROMINOS.T.default]
    },
    {
      color: "L",
      startX: 24,
      endY: 8,
      list: [TETROMINOS.J.default, TETROMINOS.J.default]
    }
  ],
  [
    {
      color: "T",
      startX: 0,
      endY: 4,
      list: [TETROMINOS.T.default, TETROMINOS.T.rotateL, TETROMINOS.T.inverse]
    },
    {
      color: "L",
      startX: 4,
      endY: 2,
      list: [TETROMINOS.L.default, TETROMINOS.L.rotateR, TETROMINOS.L.inverse]
    },
    {
      color: "O",
      startX: 7,
      endY: 7,
      list: [TETROMINOS.O.default, TETROMINOS.O.default]
    },
    {
      color: "S",
      startX: 9,
      endY: 6,
      list: [TETROMINOS.S.default, TETROMINOS.S.rotateL, TETROMINOS.S.inverse]
    },
    {
      color: "Z",
      startX: 22,
      endY: 7,
      list: [TETROMINOS.Z.default, TETROMINOS.Z.default]
    },
    {
      color: "I",
      startX: 21,
      endY: 9,
      list: [TETROMINOS.I.default, TETROMINOS.I.rotateR]
    },
    {
      color: "S",
      startX: 25,
      endY: 10,
      list: [TETROMINOS.S.default, TETROMINOS.S.rotateR]
    }
  ],
  [
    {
      color: "J",
      startX: 0,
      endY: 6,
      list: [TETROMINOS.J.default, TETROMINOS.J.default]
    },
    {
      color: "Z",
      startX: 3,
      endY: 4,
      list: [TETROMINOS.Z.default, TETROMINOS.Z.rotateR]
    },
    {
      color: "I",
      startX: 5,
      endY: 5,
      list: [TETROMINOS.I.default, TETROMINOS.I.default]
    },
    {
      color: "Z",
      startX: 11,
      endY: 6,
      list: [TETROMINOS.Z.default, TETROMINOS.Z.default]
    },
    {
      color: "J",
      startX: 20,
      endY: 8,
      list: [TETROMINOS.J.default, TETROMINOS.J.rotateR, TETROMINOS.J.inverse]
    }
  ],
  [
    {
      color: "O",
      startX: 2,
      endY: 6,
      list: [TETROMINOS.O.default, TETROMINOS.O.default]
    },
    {
      color: "T",
      startX: 9,
      endY: 8,
      list: [TETROMINOS.T.default, TETROMINOS.T.default]
    },
    {
      color: "T",
      startX: 13,
      endY: 6,
      list: [TETROMINOS.T.default, TETROMINOS.T.rotateL]
    }
  ],
  [
    {
      color: "L",
      startX: 2,
      endY: 7,
      list: [TETROMINOS.J.default, TETROMINOS.J.rotateL]
    },
    {
      color: "I",
      startX: 7,
      endY: 10,
      list: [TETROMINOS.I.default, TETROMINOS.I.rotateR]
    },
    {
      color: "S",
      startX: 11,
      endY: 8,
      list: [TETROMINOS.S.default, TETROMINOS.S.rotateR]
    },
    {
      color: "Z",
      startX: 15,
      endY: 6,
      list: [TETROMINOS.Z.default, TETROMINOS.Z.default]
    }
  ],
  [
    {
      color: "T",
      startX: 3,
      endY: 9,
      list: [TETROMINOS.T.default, TETROMINOS.T.default]
    },
    {
      color: "T",
      startX: 17,
      endY: 6,
      list: [TETROMINOS.T.default, TETROMINOS.T.rotateL]
    }
  ],
  [
    {
      color: "S",
      startX: 4,
      endY: 10,
      list: [TETROMINOS.S.default, TETROMINOS.S.rotateL, TETROMINOS.S.inverse]
    },
    {
      color: "S",
      startX: 18,
      endY: 9,
      list: [TETROMINOS.S.default, TETROMINOS.S.rotateL]
    }
  ]
]

const ONE_DURATION = 10

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
          return (
            <Sequence from={i * ONE_DURATION}>
              {scene.map(({ color, list, startX, endY = 0 }, j) => {
                // 30フレームで1行落とすが、その間にlist通りの切り替えを行う

                // list.length分だけ[0,ONE_DURATION]区間を分割する
                const inputRange = Array.from({ length: list.length }, (_, i) => i * (ONE_DURATION / (list.length - 1)))
                // 分割した区間のランダムな地点でlistの要素を切り替える
                const outputRange = list.map((_, i) => i + random(startX))

                const tet =
                  list[
                    Math.floor(
                      interpolate(frame - i * ONE_DURATION, inputRange, outputRange, {
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
                        frame - i * ONE_DURATION,
                        [random(startX) * ONE_DURATION, (random(startX) + 1) * ONE_DURATION],
                        [-BLOCK_SIZE * tet.length, height - BLOCK_SIZE * (tet.length + endY)],
                        {
                          easing: Easing.in((t) => stepEasing(t, tet.length)),
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
