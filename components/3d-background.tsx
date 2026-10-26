'use client'

import { useEffect, useRef } from 'react'

export function Background3D() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const shapes = container.querySelectorAll('.floating-shape')
    
    // Mouse tracking for parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX / window.innerWidth
      const mouseY = e.clientY / window.innerHeight

      shapes.forEach((shape, index) => {
        const depth = (index + 1) * 20
        const x = mouseX * depth - depth / 2
        const y = mouseY * depth - depth / 2

        ;(shape as HTMLElement).style.transform = `translate(${x}px, ${y}px)`
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-black via-gray-950 to-black">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,255,255,0.05),rgba(200,200,200,0.03))]" />
      
      {/* Floating shapes */}
      <div className="floating-shape absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float-3d" />
      <div className="floating-shape absolute top-40 right-10 w-80 h-80 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float-3d" style={{ animationDelay: '2s' }} />
      <div className="floating-shape absolute -bottom-8 left-1/2 w-80 h-80 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float-3d" style={{ animationDelay: '4s' }} />
      
      {/* Grid overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-5 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  )
}
