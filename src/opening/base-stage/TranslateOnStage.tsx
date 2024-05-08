import { AbsoluteFill } from "remotion"
import { BLOCK_SIZE } from "../tetris-settings"

interface Props {
  children: React.ReactNode
}

export const TranslateOnStage: React.FC<Props> = ({ children }) => {
  return <AbsoluteFill style={{ transform: `translate(0, ${-BLOCK_SIZE * 2 * 3}px)` }}>{children}</AbsoluteFill>
}
