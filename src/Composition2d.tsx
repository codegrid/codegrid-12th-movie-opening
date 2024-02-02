/* eslint-disable array-callback-return */
import { Rect } from "@remotion/shapes"
import { useEffect, useState } from "react"
import { AbsoluteFill, random, useVideoConfig } from "remotion"
import { Background } from "./Background"

const COLORS = ["#3fdcd5", "#af60ff", "#ffff4d", "#ff3d3d", "#ff9f1a", "#00ff00", "#00ffff"]

const TETROMINOS = [
  [
    // Z
    [0, 0, 0, 0],
    [1, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0]
  ],
  [
    // S
    [0, 0, 0, 0],
    [0, 0, 2, 2],
    [0, 2, 2, 0],
    [0, 0, 0, 0]
  ],
  [
    // I
    [0, 3, 0, 0],
    [0, 3, 0, 0],
    [0, 3, 0, 0],
    [0, 3, 0, 0]
  ],
  [
    // J
    [0, 4, 0, 0],
    [0, 4, 0, 0],
    [0, 4, 4, 0],
    [0, 0, 0, 0]
  ],
  [
    // L
    [0, 0, 5, 0],
    [0, 0, 5, 0],
    [0, 5, 5, 0],
    [0, 0, 0, 0]
  ],
  [
    // T
    [0, 0, 0, 0],
    [6, 6, 6, 0],
    [0, 6, 0, 0],
    [0, 0, 0, 0]
  ],
  [
    // O
    [0, 0, 0, 0],
    [0, 7, 7, 0],
    [0, 7, 7, 0],
    [0, 0, 0, 0]
  ]
]

const BLOCK_SIZE = 40

// テトリミノの1辺の最長
const TET_SIZE = 4

export const MyComposition2d: React.FC = () => {
  const { width, height } = useVideoConfig()

  const SCREEN_GRID_WIDTH = width / BLOCK_SIZE
  const SCREEN_GRID_HEIGHT = height / BLOCK_SIZE

  const SCREEN_GRID = Array.from({ length: SCREEN_GRID_HEIGHT }, () => Array(SCREEN_GRID_WIDTH).fill(0))

  const tetroTypesIndex = Math.floor(random("tetrimino") * 7)

  // テトロミノを取得する
  const tetroMino = TETROMINOS[tetroTypesIndex]

  // テトリミノの移動距離
  const [tetroMinoDistance, setTetroMinoDistance] = useState({ x: 0, y: 0 })

  const canMove = (moveX: number, moveY: number) => {
    for (let y = 0; y < TET_SIZE; y++) {
      for (let x = 0; x < TET_SIZE; x++) {
        if (tetroMino[y][x]) {
          // 現在のテトリミノの位置（tetroMinoDistanceX + x）に移動分を加える（＝移動後の座標）
          const nextX = tetroMinoDistance.x + x + moveX
          const nextY = tetroMinoDistance.y + y + moveY

          // 移動先にブロックがあるか判定
          if (
            nextY < 0 ||
            nextX < 0 ||
            nextY >= SCREEN_GRID_HEIGHT ||
            nextX >= SCREEN_GRID_WIDTH ||
            SCREEN_GRID[nextY][nextX]
          ) {
            return false
          }
        }
      }
    }
    return true
  }

  const onKeydown = (e: KeyboardEvent) => {
    switch (e.code) {
      case "ArrowLeft":
        if (canMove(-1, 0)) setTetroMinoDistance((prev) => ({ ...prev, x: prev.x - 1 }))
        break
      case "ArrowUp":
        if (canMove(0, -1)) setTetroMinoDistance((prev) => ({ ...prev, y: prev.y - 1 }))
        break
      case "ArrowRight":
        if (canMove(1, 0)) setTetroMinoDistance((prev) => ({ ...prev, x: prev.x + 1 }))
        break
      case "ArrowDown":
        if (canMove(0, 1)) setTetroMinoDistance((prev) => ({ ...prev, y: prev.y + 1 }))
        break
      default:
        break
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", onKeydown)
    return () => {
      window.removeEventListener("keydown", onKeydown)
    }
  })

  return (
    <AbsoluteFill>
      <>
        <Background />
        {/** 画面本体で動かせなくなったブロックを描画 */}
        {[...new Array(SCREEN_GRID_HEIGHT)].flatMap((_, i) => {
          ;[...new Array(SCREEN_GRID_WIDTH)].map((_, j) => {
            if (SCREEN_GRID[i][j] > 0) {
              return (
                <AbsoluteFill
                  style={{
                    left: j * BLOCK_SIZE,
                    top: i * BLOCK_SIZE
                  }}
                >
                  <Rect width={BLOCK_SIZE} height={BLOCK_SIZE} fill={COLORS[SCREEN_GRID[i][j] - 1]} />
                </AbsoluteFill>
              )
            }
          })
        })}
        {/** テトリミノを描画 */}
        {[...new Array(TET_SIZE)].flatMap((_, i) => {
          return [...new Array(TET_SIZE)].map((_, j) => {
            if (tetroMino[i][j] > 0) {
              return (
                <AbsoluteFill
                  style={{
                    left: (j + tetroMinoDistance.x) * BLOCK_SIZE,
                    top: (i + tetroMinoDistance.y) * BLOCK_SIZE
                  }}
                >
                  <Rect width={BLOCK_SIZE} height={BLOCK_SIZE} fill={COLORS[tetroTypesIndex]} />
                </AbsoluteFill>
              )
            }
          })
        })}
      </>
    </AbsoluteFill>
  )
}
