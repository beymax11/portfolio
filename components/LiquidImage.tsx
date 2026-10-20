'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'

interface LiquidImageProps {
  src: string
  alt: string
  aspectRatio?: string
  isBare?: boolean
  poster?: string
  isVideo?: boolean
  className?: string
  priority?: boolean
  sizes?: string
  maxTilt?: number
}

export default function LiquidImage({
  src,
  alt,
  aspectRatio,
  isBare = false,
  poster,
  isVideo = false,
  className = '',
  priority = false,
  sizes = '(max-width: 768px) 100vw, 50vw',
  maxTilt = 8,
}: LiquidImageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)

  const isHoveredRef = useRef(false)
  const rafIdRef = useRef<number | null>(null)

  // 3D physics refs (interpolated with lerp for organic smoothness)
  const rotX = useRef({ current: 0, target: 0 })
  const rotY = useRef({ current: 0, target: 0 })
  const scale = useRef({ current: 1, target: 1 })
  const glare = useRef({ x: 50, y: 50, currentOpacity: 0, targetOpacity: 0 })

  useEffect(() => {
    // Check reduced motion preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    let isRunning = false

    const updateTilt = () => {
      const ease = 0.12

      rotX.current.current += (rotX.current.target - rotX.current.current) * ease
      rotY.current.current += (rotY.current.target - rotY.current.current) * ease
      scale.current.current += (scale.current.target - scale.current.current) * ease
      glare.current.currentOpacity +=
        (glare.current.targetOpacity - glare.current.currentOpacity) * ease

      if (cardRef.current) {
        cardRef.current.style.transform = `perspective(1000px) rotateX(${rotX.current.current.toFixed(
          2
        )}deg) rotateY(${rotY.current.current.toFixed(2)}deg) scale3d(${scale.current.current.toFixed(
          3
        )}, ${scale.current.current.toFixed(3)}, 1)`
      }

      if (glareRef.current && !isBare) {
        glareRef.current.style.opacity = glare.current.currentOpacity.toFixed(3)
        glareRef.current.style.background = `radial-gradient(circle 320px at ${glare.current.x}% ${glare.current.y}%, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.1) 35%, transparent 75%)`
      }

      const isSettled =
        Math.abs(rotX.current.target - rotX.current.current) < 0.02 &&
        Math.abs(rotY.current.target - rotY.current.current) < 0.02 &&
        Math.abs(scale.current.target - scale.current.current) < 0.001 &&
        Math.abs(glare.current.targetOpacity - glare.current.currentOpacity) < 0.01

      if (!isSettled || isHoveredRef.current) {
        rafIdRef.current = requestAnimationFrame(updateTilt)
      } else {
        rotX.current.current = rotX.current.target
        rotY.current.current = rotY.current.target
        scale.current.current = scale.current.target
        glare.current.currentOpacity = glare.current.targetOpacity
        if (cardRef.current) {
          cardRef.current.style.transform = `perspective(1000px) rotateX(${rotX.current.target}deg) rotateY(${rotY.current.target}deg) scale3d(${scale.current.target}, ${scale.current.target}, 1)`
        }
        if (glareRef.current && !isBare) {
          glareRef.current.style.opacity = glare.current.targetOpacity.toString()
        }
        isRunning = false
      }
    }

    const startLoop = () => {
      if (!isRunning) {
        isRunning = true
        rafIdRef.current = requestAnimationFrame(updateTilt)
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current
      if (!container) return

      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const w = rect.width
      const h = rect.height

      if (w === 0 || h === 0) return

      // Normalized coordinates (-1 to 1)
      const normX = (x / w - 0.5) * 2
      const normY = (y / h - 0.5) * 2

      // Subtle & premium tilt (invert Y for natural perspective)
      rotX.current.target = -normY * maxTilt
      rotY.current.target = normX * maxTilt
      scale.current.target = isBare ? 1.02 : 1.03

      glare.current.x = (x / w) * 100
      glare.current.y = (y / h) * 100
      glare.current.targetOpacity = 1

      startLoop()
    }

    const handleMouseEnter = () => {
      isHoveredRef.current = true
      glare.current.targetOpacity = 1
      startLoop()
    }

    const handleMouseLeave = () => {
      isHoveredRef.current = false
      rotX.current.target = 0
      rotY.current.target = 0
      scale.current.target = 1
      glare.current.targetOpacity = 0
      startLoop()
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('mousemove', handleMouseMove)
      container.addEventListener('mouseenter', handleMouseEnter)
      container.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove)
        container.removeEventListener('mouseenter', handleMouseEnter)
        container.removeEventListener('mouseleave', handleMouseLeave)
      }
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current)
      }
    }
  }, [maxTilt, isBare])

  return (
    <div
      ref={containerRef}
      className={`relative select-none ${className}`}
      style={{
        perspective: '1000px',
        ...(aspectRatio ? { aspectRatio } : {}),
      }}
    >
      {/* 3D Transform Card */}
      <div
        ref={cardRef}
        className="relative w-full h-full will-change-transform transition-shadow duration-500"
        style={{
          transformStyle: 'preserve-3d',
          transformOrigin: 'center center',
        }}
      >
        {isVideo ? (
          <video
            src={src}
            poster={poster}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center pointer-events-none"
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className={`pointer-events-none ${
              isBare ? 'object-contain object-bottom' : 'object-cover object-center'
            }`}
          />
        )}

        {/* Dynamic Light Glare Reflection (for non-bare cards) */}
        {!isBare && (
          <div
            ref={glareRef}
            className="absolute inset-0 pointer-events-none mix-blend-overlay z-10 transition-opacity duration-300"
            style={{ opacity: 0 }}
            aria-hidden="true"
          />
        )}

        {/* Non-bare Overlays */}
        {!isBare && (
          <>
            {/* Subtle border highlight for depth */}
            <div
              className="absolute inset-0 border border-white/[0.08] pointer-events-none z-10"
              aria-hidden="true"
            />

            {/* Grayscale Color-veil (fades out on hover) */}
            <div
              className="absolute inset-0 bg-[#16161a] mix-blend-color opacity-75 transition-opacity duration-700 ease-out group-hover:opacity-0 pointer-events-none"
              aria-hidden="true"
            />

            {/* Accent glow sweep */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[linear-gradient(120deg,transparent_30%,color-mix(in_srgb,var(--accent)_35%,transparent)_50%,transparent_70%)] mix-blend-screen"
              aria-hidden="true"
            />

            {/* Radial vignette overlay */}
            <div
              className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_40%,rgba(8,8,10,0.65)_100%)]"
              aria-hidden="true"
            />
          </>
        )}
      </div>
    </div>
  )
}
