'use client'
import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import { Suspense } from 'react'
import * as THREE from 'three'


const FloatingParticles = () => {
  const ref = useRef<THREE.Points>(null!)
  const [sphere] = useState(() => {
    const numParticles = 5000;
    const particles = new Float32Array(numParticles * 3);
    for (let i = 0; i < numParticles; i++) {
      const i3 = i * 3;
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const radius = 1.5 * Math.cbrt(Math.random()); // cube root for uniform distribution
      particles[i3] = radius * Math.sin(phi) * Math.cos(theta);
      particles[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particles[i3 + 2] = radius * Math.cos(phi);
    }
    return particles;
  });

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 25
    ref.current.rotation.y -= delta / 30
    if (state.mouse) {
      ref.current.rotation.y += state.mouse.x * 0.001
      ref.current.rotation.x += state.mouse.y * 0.001
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#f272c8"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  )
}

const FloatingParticlesCanvas = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <FloatingParticles />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default FloatingParticlesCanvas