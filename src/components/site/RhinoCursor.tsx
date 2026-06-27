import { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'

export function RhinoCursor() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springX = useSpring(mouseX, { stiffness: 120, damping: 18 })
  const springY = useSpring(mouseY, { stiffness: 120, damping: 18 })

  const rotateY = useTransform(springX, [-60, 60], [-8, 8])
  const rotateX = useTransform(springY, [-60, 60], [5, -5])

  useEffect(() => {
    const hero = document.getElementById('hero-section')
    if (!hero) return

    const handleMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect()
      const cx = rect.left + rect.width * 0.75
      const cy = rect.top + rect.height * 0.45
      mouseX.set(Math.max(-60, Math.min(60, e.clientX - cx)))
      mouseY.set(Math.max(-60, Math.min(60, e.clientY - cy)))
    }

    const handleLeave = () => { mouseX.set(0); mouseY.set(0) }

    hero.addEventListener('mousemove', handleMove)
    hero.addEventListener('mouseleave', handleLeave)
    return () => {
      hero.removeEventListener('mousemove', handleMove)
      hero.removeEventListener('mouseleave', handleLeave)
    }
  }, [mouseX, mouseY])

  return (
    <motion.div
      className="absolute right-[8%] top-1/2 -translate-y-1/2 hidden lg:block pointer-events-none select-none"
      style={{ x: springX, y: springY, rotateY, rotateX }}
    >
      <motion.div
        className="w-72 h-72 xl:w-96 xl:h-96 rounded-full flex items-center justify-center"
        style={{
          background: 'radial-gradient(circle, rgba(127,184,224,0.12) 0%, rgba(26,95,180,0.06) 60%, transparent 100%)',
        }}
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <img
          src="/rhino-mark.svg"
          alt=""
          className="w-4/5 h-4/5 drop-shadow-2xl"
          style={{ filter: 'brightness(0) invert(1)' }}
        />
      </motion.div>
    </motion.div>
  )
}
