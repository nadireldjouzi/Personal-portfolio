'use client'

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'scale' | 'none'
  as?: 'div' | 'section' | 'li' | 'article'
}

export function Reveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  as: Tag = 'div',
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('reveal-visible')
          observer.unobserve(node)
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const directionClass =
    direction === 'left'
      ? 'reveal-left'
      : direction === 'right'
        ? 'reveal-right'
        : direction === 'scale'
          ? 'reveal-scale'
          : direction === 'none'
            ? ''
            : ''

  const style: CSSProperties = delay ? { transitionDelay: `${delay}ms` } : {}

  return (
    <Tag
      ref={ref as never}
      className={`reveal ${directionClass} ${className}`}
      style={style}
    >
      {children}
    </Tag>
  )
}
