"use client"

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, SoftShadows } from '@react-three/drei'
import { Suspense } from 'react'
import { KenteShader } from './KenteShader'
import { AdinkraSymbols } from './AdinkraSymbols'

export default function HeroCanvas() {
  return (
    <div className="w-full h-[600px] rounded-2xl overflow-hidden shadow-2xl">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        shadows
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize={[2048, 2048]}
          />
          <pointLight position={[-10, -10, -10]} color="#C9A24D" intensity={0.5} />
          
          <SoftShadows size={25} samples={25} />
          
          <KenteShader />
          <AdinkraSymbols />
          
          <Environment preset="sunset" />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}