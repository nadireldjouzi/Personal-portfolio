'use client'

import { useRef, useEffect } from 'react'

interface Card3DProps {
  children: React.ReactNode
  className?: string
  intensity?: number
}

export function Card3D({ children, className = '', intensity = 20 }: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    let rect = card.getBoundingClientRect()
    const refreshRect = () => {
      rect = card.getBoundingClientRect()
    }

    const reset = () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)'
    }

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)
      const y = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
      card.style.transform = `perspective(1000px) rotateX(${x * intensity}deg) rotateY(${-y * intensity}deg) translateZ(20px)`
    }

    const handleMouseLeave = reset

    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseleave', handleMouseLeave)
    card.addEventListener('mouseenter', refreshRect)
    window.addEventListener('scroll', refreshRect, { passive: true })
    window.addEventListener('resize', refreshRect)

    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
      card.removeEventListener('mouseenter', refreshRect)
      window.removeEventListener('scroll', refreshRect)
      window.removeEventListener('resize', refreshRect)
      reset()
    }
  }, [intensity])

  return (
    <div
      ref={cardRef}
      className={`perspective-container transition-transform duration-300 ${className}`}
    >
      {children}
    </div>
  )
}
