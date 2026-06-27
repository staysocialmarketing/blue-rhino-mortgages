import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface RevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
  variant?: 'stagger-up' | 'fade' | 'scale'
}

export function Reveal({ children, delay = 0, className, variant = 'stagger-up' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const fromVars: gsap.TweenVars =
      variant === 'stagger-up' ? { y: 24, opacity: 0 }
      : variant === 'scale' ? { scale: 0.97, opacity: 0 }
      : { opacity: 0 }

    gsap.fromTo(el, fromVars, {
      y: 0, scale: 1, opacity: 1,
      duration: 0.7,
      delay: delay / 1000,
      ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    })
  }, [delay, variant])

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  )
}
