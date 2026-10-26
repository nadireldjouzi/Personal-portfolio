'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function ParticleNetwork() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches
    const isMobile = window.innerWidth < 768

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x0a0a1a, 0.045)

    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    )
    camera.position.z = 9

    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5))
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setClearColor(0x0a0a1a, 1)
    container.appendChild(renderer.domElement)

    const nodeCount = isMobile ? 70 : 150
    const spread = 7.2
    const positions = new Float32Array(nodeCount * 3)
    const colors = new Float32Array(nodeCount * 3)
    const velocities: Array<{ x: number; y: number; z: number }> = []

    const cyan = new THREE.Color('#22d3ee')
    const violet = new THREE.Color('#a78bfa')
    const blue = new THREE.Color('#38bdf8')
    const palette = [cyan, violet, blue]

    for (let i = 0; i < nodeCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = Math.pow(Math.random(), 1 / 3) * spread
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi) - 1.5

      const color = palette[Math.floor(Math.random() * palette.length)]
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b

      velocities.push({
        x: (Math.random() - 0.5) * 0.006,
        y: (Math.random() - 0.5) * 0.006,
        z: (Math.random() - 0.5) * 0.006,
      })
    }

    const pointGeometry = new THREE.BufferGeometry()
    pointGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    pointGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const pointMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.055 : 0.07,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    })

    const points = new THREE.Points(pointGeometry, pointMaterial)
    scene.add(points)

    const maxConnections = nodeCount * (nodeCount - 1)
    const linePositions = new Float32Array(maxConnections * 6)
    const lineGeometry = new THREE.BufferGeometry()
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial)
    scene.add(lines)

    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      wireframe: true,
      transparent: true,
      opacity: reducedMotion ? 0.06 : 0.13,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const globe = new THREE.Mesh(new THREE.IcosahedronGeometry(isMobile ? 1.6 : 2.1, 1), glowMat)
    scene.add(globe)

    const innerGlowMat = new THREE.MeshBasicMaterial({
      color: 0xa78bfa,
      wireframe: true,
      transparent: true,
      opacity: reducedMotion ? 0.04 : 0.09,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const innerGlobe = new THREE.Mesh(
      new THREE.IcosahedronGeometry(isMobile ? 1.1 : 1.45, 0),
      innerGlowMat
    )
    scene.add(innerGlobe)

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.tx = (e.clientX / window.innerWidth) * 2 - 1
      mouse.ty = (e.clientY / window.innerHeight) * 2 - 1
    }

    if (!isCoarsePointer && !reducedMotion) {
      window.addEventListener('mousemove', handleMouseMove)
    }

    let frame = 0
    const connectionDistance = 1.9

    const updateLines = () => {
      const pos = pointGeometry.attributes.position.array as Float32Array
      let index = 0
      let count = 0

      for (let i = 0; i < nodeCount && index + 6 <= linePositions.length; i++) {
        for (let j = i + 1; j < nodeCount && index + 6 <= linePositions.length; j++) {
          const dx = pos[i * 3] - pos[j * 3]
          const dy = pos[i * 3 + 1] - pos[j * 3 + 1]
          const dz = pos[i * 3 + 2] - pos[j * 3 + 2]
          const distSq = dx * dx + dy * dy + dz * dz

          if (distSq < connectionDistance * connectionDistance) {
            linePositions[index] = pos[i * 3]
            linePositions[index + 1] = pos[i * 3 + 1]
            linePositions[index + 2] = pos[i * 3 + 2]
            linePositions[index + 3] = pos[j * 3]
            linePositions[index + 4] = pos[j * 3 + 1]
            linePositions[index + 5] = pos[j * 3 + 2]
            index += 6
            count++
          }
        }
      }

      lineGeometry.setDrawRange(0, count * 2)
      lineGeometry.attributes.position.needsUpdate = true
    }

    const animate = () => {
      const pos = pointGeometry.attributes.position.array as Float32Array

      mouse.x += (mouse.tx - mouse.x) * 0.04
      mouse.y += (mouse.ty - mouse.y) * 0.04

      for (let i = 0; i < nodeCount; i++) {
        let x = pos[i * 3]
        let y = pos[i * 3 + 1]
        let z = pos[i * 3 + 2]

        if (!reducedMotion) {
          const v = velocities[i]
          x += v.x
          y += v.y
          z += v.z

          const radius = Math.sqrt(x * x + y * y + z * z)
          if (radius > spread) {
            const norm = spread / radius
            x *= norm
            y *= norm
            z *= norm
            velocities[i].x *= -1
            velocities[i].y *= -1
            velocities[i].z *= -1
          }
        }

        pos[i * 3] = x
        pos[i * 3 + 1] = y
        pos[i * 3 + 2] = z
      }

      pointGeometry.attributes.position.needsUpdate = true

      if (frame % 3 === 0) {
        updateLines()
      }

      const targetX = mouse.x * 0.9
      const targetY = -mouse.y * 0.6
      points.position.x += (targetX - points.position.x) * 0.05
      points.position.y += (targetY - points.position.y) * 0.05
      points.rotation.y += 0.0004

      globe.rotation.y += 0.0016
      globe.rotation.x += 0.0004
      globe.position.x += (mouse.x * 0.35 - globe.position.x) * 0.04
      globe.position.y += (-mouse.y * 0.25 - globe.position.y) * 0.04

      innerGlobe.rotation.y -= 0.0022
      innerGlobe.rotation.z += 0.0008

      camera.position.x += (mouse.x * 0.4 - camera.position.x) * 0.05
      camera.position.y += (-mouse.y * 0.3 - camera.position.y) * 0.05
      camera.lookAt(0, 0, 0)

      frame++
      renderer.render(scene, camera)
    }

    if (reducedMotion) {
      updateLines()
      renderer.render(scene, camera)
    } else {
      renderer.setAnimationLoop(animate)
    }

    const handleResize = () => {
      const width = container.clientWidth
      const height = container.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (!isCoarsePointer && !reducedMotion) {
        window.removeEventListener('mousemove', handleMouseMove)
      }
      renderer.setAnimationLoop(null)
      pointGeometry.dispose()
      lineGeometry.dispose()
      pointMaterial.dispose()
      lineMaterial.dispose()
      glowMat.dispose()
      innerGlowMat.dispose()
      globe.geometry.dispose()
      innerGlobe.geometry.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  )
}
