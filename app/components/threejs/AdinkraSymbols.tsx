"use client"

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Text } from '@react-three/drei'
import * as THREE from 'three'

const ADINKRA_SYMBOLS = [
  "Gye Nyame", "Sankofa", "Adinkrahene", 
  "Dwennimmen", "Akoma", "Nyame Nwu Na Mawu"
]

export function AdinkraSymbols() {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
  })

  return (
    <group ref={groupRef}>
      {ADINKRA_SYMBOLS.map((symbol, i) => {
        const angle = (i / ADINKRA_SYMBOLS.length) * Math.PI * 2
        const radius = 3
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        const y = Math.sin(angle * 2) * 0.5

        return (
          <Float
            key={symbol}
            speed={2}
            rotationIntensity={0.5}
            floatIntensity={0.5}
          >
            <mesh position={[x, y, z]} castShadow receiveShadow>
              <torusKnotGeometry args={[0.3, 0.1, 100, 16]} />
              <meshStandardMaterial
                color="#C9A24D"
                metalness={0.8}
                roughness={0.2}
                emissive="#C9A24D"
                emissiveIntensity={0.2}
              />
              <Text
                position={[0, 0.6, 0]}
                fontSize={0.2}
                color="#3B2F2F"
                anchorX="center"
                anchorY="middle"
                font="/fonts/PlayfairDisplay-Regular.ttf"
              >
                {symbol}
              </Text>
            </mesh>
          </Float>
        )
      })}
    </group>
  )
}