'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

export function Hero3DLogomark() {
  const [rotate, setRotate] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)

  useEffect(() => {
    let animationFrameId
    let targetRotateX = 0
    let targetRotateY = 0
    let currentRotateX = 0
    let currentRotateY = 0

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window
      // Normalize cursor relative to viewport center [-1, 1]
      const normX = (e.clientX / innerWidth - 0.5) * 2
      const normY = (e.clientY / innerHeight - 0.5) * 2

      // Maximum 3D tilt angles (degrees)
      targetRotateX = -normY * 18
      targetRotateY = normX * 22
    }

    const handleMouseLeave = () => {
      targetRotateX = 0
      targetRotateY = 0
    }

    // Smooth lerp (linear interpolation) loop for silky fluid motion
    const loop = () => {
      currentRotateX += (targetRotateX - currentRotateX) * 0.08
      currentRotateY += (targetRotateY - currentRotateY) * 0.08

      setRotate({
        x: currentRotateX,
        y: currentRotateY,
      })

      animationFrameId = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseleave', handleMouseLeave)
    animationFrameId = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="once-in select-none will-change-transform">
      {/* 3D Perspective Viewport */}
      <div
        ref={containerRef}
        style={{ perspective: 1400 }}
        className="relative flex items-center justify-center"
      >
        {/* Continuous 3D Ambient Float (Levitation) */}
        <div className="relative animate-float-3d">
          {/* Interactive 3D Mouse Parallax Object */}
          <div
            style={{
              transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateZ(40px)`,
              transformStyle: 'preserve-3d',
              willChange: 'transform',
            }}
            className="relative flex items-center justify-center transition-transform duration-75 ease-out"
          >
            {/* Deep Dynamic 3D Floor Shadow */}
            <div
              style={{
                transform: `translateZ(-50px) translateY(${35 + rotate.x * 0.9}px) translateX(${-rotate.y * 0.9}px) scale(0.88)`,
                filter: 'blur(36px)',
              }}
              className="absolute inset-0 rounded-full bg-neutral-950/25 pointer-events-none transition-transform duration-200"
            />

            {/* Main 3D Logomark Image - Наашаа товойсон бодит 3D сүлд */}
            <div className="relative w-[320px] sm:w-[440px] md:w-[520px] lg:w-[600px] xl:w-[680px] 2xl:w-[740px] aspect-square">
              <Image
                src="/logomark-3d.png"
                alt="Тэнгэрийн Илгээмж 3D Embossed Emblem"
                width={740}
                height={740}
                priority
                className="w-full h-full object-contain pointer-events-none drop-shadow-[0_25px_45px_rgba(0,0,0,0.2)] drop-shadow-[0_50px_90px_rgba(0,0,0,0.12)] transition-all duration-300"
              />

              {/* Dynamic 3D Light Sheen Overlay */}
              <div
                style={{
                  transform: 'translateZ(25px)',
                  background: `radial-gradient(circle at ${50 + rotate.y * 1.6}% ${50 + rotate.x * 1.6}%, rgba(255,255,255,0.25) 0%, transparent 65%)`,
                }}
                className="absolute inset-0 rounded-full pointer-events-none mix-blend-overlay"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
