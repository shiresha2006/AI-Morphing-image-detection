import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as random from 'maath/random/dist/maath-random.esm'

function Particles() {
  const ref = useRef<any>()
  const sphere = random.inSphere(new Float32Array(5000), { radius: 1.5 })
  
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10
      ref.current.rotation.y -= delta / 15
    }
  })
  
  return (
    <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#0ea5e9"
        size={0.002}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  )
}

export default function FloatingParticles() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Particles />
      </Canvas>
    </div>
  )
}
