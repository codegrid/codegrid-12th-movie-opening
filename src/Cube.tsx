export type Block = { x: number; y: number; z: number }

export const Cube: React.FC<{ position: [number, number, number]; color: string }> = ({ position, color }) => {
  return (
    <mesh castShadow position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}
