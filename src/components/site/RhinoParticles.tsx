import { useEffect, useRef } from 'react'

const PARTICLE_COUNT = 420
const CANVAS_W = 500
const CANVAS_H = 400

// Detailed rhino silhouette — sampled to generate particle home positions
const RHINO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400" width="500" height="400">
  <!-- Main body -->
  <ellipse cx="220" cy="230" rx="148" ry="95" fill="white"/>
  <!-- Neck -->
  <path d="M 310 180 Q 340 160 370 165 Q 390 175 388 205 Q 385 230 360 240 Q 335 248 308 240 Z" fill="white"/>
  <!-- Head -->
  <ellipse cx="390" cy="190" rx="80" ry="62" fill="white"/>
  <!-- Snout extension -->
  <path d="M 420 200 Q 460 205 478 215 Q 482 225 472 230 Q 455 235 420 228 Z" fill="white"/>
  <!-- Primary horn -->
  <path d="M 455 185 L 500 105 L 478 182 Z" fill="white"/>
  <!-- Secondary horn -->
  <path d="M 432 178 L 458 135 L 440 175 Z" fill="white"/>
  <!-- Ear -->
  <ellipse cx="360" cy="148" rx="18" ry="24" fill="white"/>
  <!-- Eye region -->
  <circle cx="412" cy="175" r="10" fill="white"/>
  <!-- Legs front-left -->
  <path d="M 155 305 Q 148 310 145 370 Q 148 380 165 380 Q 182 380 185 370 Q 182 310 175 305 Z" fill="white"/>
  <!-- Legs front-right -->
  <path d="M 200 308 Q 193 313 190 370 Q 193 380 210 380 Q 227 380 230 370 Q 227 313 220 308 Z" fill="white"/>
  <!-- Legs back-left -->
  <path d="M 258 302 Q 250 308 248 365 Q 251 377 268 377 Q 285 377 287 365 Q 284 308 277 302 Z" fill="white"/>
  <!-- Legs back-right -->
  <path d="M 295 298 Q 287 304 284 360 Q 287 373 305 373 Q 322 373 324 360 Q 321 304 312 298 Z" fill="white"/>
  <!-- Tail -->
  <path d="M 75 205 Q 50 195 40 175 Q 38 160 52 162 Q 62 165 70 185 Q 76 200 80 210 Z" fill="white"/>
  <!-- Tail tuft -->
  <path d="M 40 162 Q 28 148 30 138 Q 35 130 44 138 Q 50 148 52 162 Z" fill="white"/>
  <!-- Skin fold on neck -->
  <path d="M 308 195 Q 325 188 345 192 Q 342 205 325 210 Q 310 208 308 195 Z" fill="white" opacity="0.6"/>
  <!-- Shoulder hump -->
  <path d="M 300 165 Q 315 148 335 152 Q 345 158 340 170 Q 325 165 310 170 Z" fill="white" opacity="0.7"/>
</svg>`

interface Particle {
  x: number
  y: number
  homeX: number
  homeY: number
  vx: number
  vy: number
  size: number
  opacity: number
  hue: number // 0=sky, 1=white, 2=accent
}

export function RhinoParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stateRef = useRef<{
    particles: Particle[]
    mouseX: number
    mouseY: number
    raf: number
    ready: boolean
    startTime: number
  }>({ particles: [], mouseX: -9999, mouseY: -9999, raf: 0, ready: false, startTime: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = CANVAS_W * dpr
    canvas.height = CANVAS_H * dpr
    const ctx = canvas.getContext('2d')!
    ctx.scale(dpr, dpr)

    const state = stateRef.current

    // Sample rhino silhouette from offscreen canvas
    const offscreen = document.createElement('canvas')
    offscreen.width = CANVAS_W
    offscreen.height = CANVAS_H
    const offCtx = offscreen.getContext('2d')!

    const blob = new Blob([RHINO_SVG], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const img = new Image()

    img.onload = () => {
      URL.revokeObjectURL(url)
      offCtx.drawImage(img, 0, 0, CANVAS_W, CANVAS_H)
      const imageData = offCtx.getImageData(0, 0, CANVAS_W, CANVAS_H)

      // Collect all filled pixel positions
      const positions: [number, number][] = []
      const step = 4
      for (let y = 0; y < CANVAS_H; y += step) {
        for (let x = 0; x < CANVAS_W; x += step) {
          const idx = (y * CANVAS_W + x) * 4
          if (imageData.data[idx + 3] > 100) {
            positions.push([x, y])
          }
        }
      }

      // Fisher-Yates shuffle
      for (let i = positions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[positions[i], positions[j]] = [positions[j], positions[i]]
      }

      const cx = CANVAS_W / 2
      const cy = CANVAS_H / 2

      state.particles = positions.slice(0, PARTICLE_COUNT).map(([homeX, homeY]) => {
        const r = Math.random() * 220 + 30
        const angle = Math.random() * Math.PI * 2
        return {
          x: cx + Math.cos(angle) * r,
          y: cy + Math.sin(angle) * r,
          homeX,
          homeY,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          size: Math.random() * 1.6 + 0.6,
          opacity: Math.random() * 0.35 + 0.55,
          hue: Math.random() < 0.55 ? 0 : Math.random() < 0.7 ? 1 : 2,
        }
      })

      state.ready = true
      state.startTime = performance.now()
      animate()
    }

    img.src = url

    function animate() {
      state.raf = requestAnimationFrame(animate)
      if (!state.ready) return

      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H)

      const elapsed = (performance.now() - state.startTime) / 1000
      const { mouseX, mouseY } = state

      for (const p of state.particles) {
        // Spring toward home
        const stiffness = 0.05
        const damping = 0.76

        let fx = (p.homeX - p.x) * stiffness
        let fy = (p.homeY - p.y) * stiffness

        // Mouse repulsion
        const dx = p.x - mouseX
        const dy = p.y - mouseY
        const distSq = dx * dx + dy * dy
        const repelRadius = 85
        if (distSq < repelRadius * repelRadius) {
          const dist = Math.sqrt(distSq)
          const force = ((repelRadius - dist) / repelRadius) * 4.5
          fx += (dx / dist) * force
          fy += (dy / dist) * force
        }

        p.vx = (p.vx + fx) * damping
        p.vy = (p.vy + fy) * damping
        p.x += p.vx
        p.y += p.vy

        // Subtle organic float
        const floatOffset = Math.sin(elapsed * 0.7 + p.homeX * 0.015 + p.homeY * 0.01) * 0.5

        const color =
          p.hue === 0 ? '#7fb8e0'
          : p.hue === 1 ? '#ffffff'
          : '#a8d4f0'

        ctx.globalAlpha = p.opacity
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(p.x, p.y + floatOffset, p.size, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalAlpha = 1
    }

    // Mouse tracking via hero section
    const hero = document.getElementById('hero-section')
    if (hero) {
      const onMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect()
        state.mouseX = (e.clientX - rect.left) * (CANVAS_W / rect.width)
        state.mouseY = (e.clientY - rect.top) * (CANVAS_H / rect.height)
      }
      const onLeave = () => {
        state.mouseX = -9999
        state.mouseY = -9999
      }
      hero.addEventListener('mousemove', onMove)
      hero.addEventListener('mouseleave', onLeave)
      return () => {
        cancelAnimationFrame(state.raf)
        state.ready = false
        hero.removeEventListener('mousemove', onMove)
        hero.removeEventListener('mouseleave', onLeave)
      }
    }

    return () => {
      cancelAnimationFrame(state.raf)
      state.ready = false
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute right-[4%] top-1/2 -translate-y-1/2 hidden lg:block pointer-events-none select-none"
      style={{ width: CANVAS_W, height: CANVAS_H }}
      aria-hidden="true"
    />
  )
}
