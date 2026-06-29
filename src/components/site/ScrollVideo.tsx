import { useRef, useEffect } from 'react'

/**
 * Plays a video forward/backward based on scroll position.
 * Uses requestAnimationFrame + lerping for buttery-smooth scrubbing.
 */
export function ScrollVideo({
  src,
  className = '',
}: {
  src: string
  className?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const video = videoRef.current
    if (!container || !video) return

    video.pause()

    let targetTime = 0
    let currentTime = 0
    let rafId: number

    const updateScroll = () => {
      if (!video.duration || !isFinite(video.duration)) {
        rafId = requestAnimationFrame(updateScroll)
        return
      }

      const rect = container.getBoundingClientRect()
      const windowH = window.innerHeight
      const totalTravel = windowH + rect.height
      const traveled = windowH - rect.top
      const progress = Math.max(0, Math.min(1, traveled / totalTravel))

      targetTime = progress * video.duration

      // Lerp toward target for smooth motion (0.08 = smoothing factor)
      currentTime += (targetTime - currentTime) * 0.08

      // Only update if the difference is meaningful
      if (Math.abs(currentTime - video.currentTime) > 0.01) {
        video.currentTime = currentTime
      }

      rafId = requestAnimationFrame(updateScroll)
    }

    rafId = requestAnimationFrame(updateScroll)

    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <div ref={containerRef} className={className}>
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-contain pointer-events-none"
        style={{ mixBlendMode: 'screen' }}
      />
    </div>
  )
}
