"use client"

import { useEffect } from "react"
import confetti from "canvas-confetti"

interface FullscreenConfettiProps {
  trigger: boolean
  onComplete?: () => void
}

export default function FullscreenConfetti({ trigger, onComplete }: FullscreenConfettiProps) {
  useEffect(() => {
    if (!trigger) return

    // Create multiple confetti bursts for fullscreen effect
    const duration = 3000
    const animationEnd = Date.now() + duration

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        clearInterval(interval)
        onComplete?.()
        return
      }

      // Create confetti from multiple positions
      const particleCount = 50
      
      // Left side burst
      confetti({
        particleCount,
        startVelocity: 30,
        spread: 70,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      })

      // Right side burst
      confetti({
        particleCount,
        startVelocity: 30,
        spread: 70,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      })

      // Center burst
      confetti({
        particleCount,
        startVelocity: 30,
        spread: 70,
        origin: { x: 0.5, y: Math.random() - 0.2 }
      })

      // Top bursts
      confetti({
        particleCount: 30,
        startVelocity: 25,
        spread: 60,
        origin: { x: randomInRange(0.2, 0.8), y: 0.1 }
      })

    }, 250)

    return () => clearInterval(interval)
  }, [trigger, onComplete])

  return null
}
