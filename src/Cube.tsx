export type Block = { x: number; y: number; z: number }

export const Cube: React.FC<{ position: Block; color: string }> = ({ position, color }) => {
  return (
    <mesh castShadow position={[position.x, position.y, position.z]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}
