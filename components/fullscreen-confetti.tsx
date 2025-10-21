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
    const duration = 500 // 0.5 seconds
    const animationEnd = Date.now() + duration

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        clearInterval(interval)
        onComplete?.()
        return
      }

      // Create confetti from multiple positions across the entire screen
      const particleCount = 100
      
      // Full screen coverage - multiple bursts across entire width
      for (let i = 0; i < 8; i++) {
        const x = (i + 1) / 9 // Distribute across screen width
        const y = Math.random() * 0.3 - 0.1 // Random height near top
        
        confetti({
          particleCount,
          startVelocity: 50,
          spread: 90,
          origin: { x, y },
          colors: ['#37322F', '#605A57', '#E0DEDB', '#D0CECC', '#F7F5F3']
        })
      }

      // Additional bursts from edges
      confetti({
        particleCount: 80,
        startVelocity: 40,
        spread: 120,
        origin: { x: 0, y: 0.1 }
      })

      confetti({
        particleCount: 80,
        startVelocity: 40,
        spread: 120,
        origin: { x: 1, y: 0.1 }
      })

    }, 50) // Faster bursts for more intense effect

    return () => clearInterval(interval)
  }, [trigger, onComplete])

  return null
}
