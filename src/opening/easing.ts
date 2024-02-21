// コマ送りイージング関数
// 'steps' はアニメーションのステップ数を表す
// 't' は進行度を表し、0から1までの値を取ります
export const stepEasing = (t: number, steps: number) => {
  // 進行度に応じてステップ数に変換
  const stepSize = 1 / steps
  // 進行度をステップ数で割った結果を切り捨てて、現在のステップ位置を計算
  const stepIndex = Math.floor(t / stepSize)
  // 現在のステップ位置に基づいて値を返す
  return stepIndex * stepSize
}
