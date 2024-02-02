/* eslint-disable no-case-declarations */
/* eslint-disable array-callback-return */
import { Rect } from "@remotion/shapes"
import { useCallback, useEffect, useState } from "react"
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

export const AutoTetris2d: React.FC = () => {
  const { width, height, fps } = useVideoConfig()

  const SCREEN_GRID_WIDTH = width / BLOCK_SIZE
  const SCREEN_GRID_HEIGHT = height / BLOCK_SIZE

  // ScreenGrid[y][x]: 画面上のブロックの状態（0: 空、1: ブロックあり）
  const [screenGrid, setScreenGrid] = useState(
    [...Array(SCREEN_GRID_HEIGHT)].map(() => Array(SCREEN_GRID_WIDTH).fill(0))
  )

  // テトロミノを取得する
  const [tetroTypesIndex, setTetroTypesIndex] = useState(Math.floor(random(null) * 7))
  const [tetroMino, setTetroMino] = useState(() => TETROMINOS[tetroTypesIndex])

  // テトリミノの移動距離
  const [tetroMinoDistance, setTetroMinoDistance] = useState({ x: SCREEN_GRID_WIDTH / 2 - TET_SIZE / 2, y: 0 })

  const canMove = useCallback(
    (moveX: number, moveY: number, newTet = tetroMino) => {
      for (let y = 0; y < TET_SIZE; y++) {
        for (let x = 0; x < TET_SIZE; x++) {
          if (newTet[y][x]) {
            // 現在のテトリミノの位置（tetroMinoDistanceX + x）に移動分を加える（＝移動後の座標）
            const nextX = tetroMinoDistance.x + x + moveX
            const nextY = tetroMinoDistance.y + y + moveY

            // 移動先にブロックがあるか判定
            if (
              nextY < 0 ||
              nextX < 0 ||
              nextY >= SCREEN_GRID_HEIGHT ||
              nextX >= SCREEN_GRID_WIDTH ||
              screenGrid[nextY]?.[nextX]
            ) {
              return false
            }
          }
        }
      }
      return true
    },
    [screenGrid, tetroMino, tetroMinoDistance.x, tetroMinoDistance.y, SCREEN_GRID_HEIGHT, SCREEN_GRID_WIDTH]
  )

  // 右回転
  const createRightRotateTet = () => {
    // 回転後の新しいテトリミノ用配列
    const newTet: number[][] = []
    for (let y = 0; y < TET_SIZE; y++) {
      newTet[y] = []
      for (let x = 0; x < TET_SIZE; x++) {
        newTet[y][x] = tetroMino[TET_SIZE - 1 - x][y]
      }
    }
    return newTet
  }

  // 左回転
  const createLeftRotateTet = () => {
    // 回転後の新しいテトリミノ用配列
    const newTet: number[][] = []
    for (let y = 0; y < TET_SIZE; y++) {
      newTet[y] = []
      for (let x = 0; x < TET_SIZE; x++) {
        newTet[y][x] = tetroMino[x][TET_SIZE - 1 - y]
      }
    }
    return newTet
  }

  const fixTet = useCallback(() => {
    const grid = [...screenGrid]
    for (let y = 0; y < TET_SIZE; y++) {
      for (let x = 0; x < TET_SIZE; x++) {
        if (tetroMino[y][x]) {
          grid[tetroMinoDistance.y + y][tetroMinoDistance.x + x] = tetroMino[y][x]
        }
      }
    }
    setScreenGrid(grid)
  }, [tetroMino, tetroMinoDistance.x, tetroMinoDistance.y, setScreenGrid, screenGrid])

  const createTetPosition = useCallback(() => {
    setTetroMinoDistance({ x: SCREEN_GRID_WIDTH / 2 - TET_SIZE / 2, y: 0 })
  }, [SCREEN_GRID_WIDTH])

  // 落下処理
  const dropTet = useCallback(() => {
    if (canMove(0, 1)) {
      setTetroMinoDistance((prev) => ({ ...prev, y: prev.y + 1 }))
    } else {
      fixTet()
      setTetroTypesIndex(Math.floor(random(null) * 7))
      setTetroMino(TETROMINOS[tetroTypesIndex])
      createTetPosition()
    }
  }, [canMove, fixTet, createTetPosition, tetroTypesIndex])

  // 5秒間に1回落下処理を実行
  useEffect(() => {
    const interval = setInterval(() => {
      dropTet()
    }, 5000 / fps)
    return () => clearInterval(interval)
  }, [dropTet, fps])

  const onKeydown = (e: KeyboardEvent) => {
    switch (e.code) {
      case e.altKey && "ArrowRight":
        const newRTet = createRightRotateTet()
        if (canMove(0, 0, newRTet)) {
          setTetroMino(newRTet)
        }
        break
      case e.altKey && "ArrowLeft":
        const newLTet = createLeftRotateTet()
        if (canMove(0, 0, newLTet)) {
          setTetroMino(newLTet)
        }
        break
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

    e.preventDefault()
    e.stopPropagation()
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
        {/** すでに落ちたブロックを描画 */}
        {[...screenGrid].flatMap((row, y) => {
          return row.map((block, x) => {
            if (block > 0) {
              return (
                <AbsoluteFill
                  style={{
                    left: x * BLOCK_SIZE,
                    top: y * BLOCK_SIZE
                  }}
                >
                  <Rect width={BLOCK_SIZE} height={BLOCK_SIZE} fill={COLORS[block - 1]} />
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
                  <Rect width={BLOCK_SIZE} height={BLOCK_SIZE} fill={COLORS[tetroMino[i][j] - 1]} />
                </AbsoluteFill>
              )
            }
          })
        })}
      </>
    </AbsoluteFill>
  )
}
