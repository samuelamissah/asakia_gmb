"use client"

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function KenteShader() {
  const meshRef = useRef<THREE.Mesh>(null!)
  const shaderRef = useRef<THREE.ShaderMaterial>(null!)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    }),
    []
  )

  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

  const fragmentShader = `
    uniform float uTime;
    uniform vec2 uResolution;
    varying vec2 vUv;
    varying vec3 vPosition;
    
    // Kente color palette
    vec3 yellow = vec3(0.79, 0.64, 0.30);
    vec3 dark = vec3(0.12, 0.08, 0.05);
    vec3 red = vec3(0.70, 0.11, 0.11);
    vec3 green = vec3(0.20, 0.42, 0.20);
    
    // Simple hash function for random values
    float hash(vec2 p) {
      p = fract(p * vec2(123.34, 345.45));
      p += dot(p, p + 34.345);
      return fract(p.x * p.y);
    }
    
    // Draw a Gye Nyame symbol (simplified)
    float gyeNyame(vec2 uv, float size) {
      uv = (uv - 0.5) * 2.0;
      float r = length(uv);
      float angle = atan(uv.y, uv.x);
      float petal = sin(angle * 4.0) * 0.2 + 0.8;
      return step(r, size * petal) - step(r, size * 0.5);
    }
    
    void main() {
      vec2 uv = vUv;
      
      // Create Kente grid pattern
      float gridSize = 8.0;
      vec2 grid = fract(uv * gridSize);
      vec2 cell = floor(uv * gridSize);
      
      // Animate grid with time
      float time = uTime * 0.5;
      
      // Create alternating pattern
      float pattern = mod(cell.x + cell.y, 2.0);
      
      // Base color selection
      vec3 baseColor;
      if (pattern < 0.5) {
        baseColor = yellow;
      } else {
        baseColor = dark;
      }
      
      // Add subtle animation
      float pulse = sin(uTime + cell.x * 0.5 + cell.y * 0.3) * 0.1;
      baseColor += pulse * 0.1;
      
      // Add Gye Nyame symbols randomly
      float symbol = gyeNyame(grid - 0.5, 0.3);
      if (symbol > 0.0 && hash(cell) > 0.7) {
        baseColor = mix(baseColor, red, symbol * 0.5);
      }
      
      // Add border lines
      float border = 0.05;
      float lines = step(1.0 - border, grid.x) + step(1.0 - border, grid.y);
      if (lines > 0.0) {
        baseColor = mix(baseColor, green, 0.3);
      }
      
      // Add depth with noise
      float noise = hash(grid + time * 0.1) * 0.05;
      baseColor += noise;
      
      // Soft edges
      float edge = smoothstep(0.0, 0.1, uv.x) * smoothstep(1.0, 0.9, uv.x) *
                   smoothstep(0.0, 0.1, uv.y) * smoothstep(1.0, 0.9, uv.y);
      
      gl_FragColor = vec4(baseColor * edge, 1.0);
    }
  `

  useFrame((state) => {
    shaderRef.current.uniforms.uTime.value = state.clock.elapsedTime
  })

  return (
    <mesh ref={meshRef} rotation={[0, 0, 0]}>
      <planeGeometry args={[10, 10, 64, 64]} />
      <shaderMaterial
        ref={shaderRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        opacity={0.8}
      />
    </mesh>
  )
}