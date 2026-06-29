import { useRef, useEffect } from 'react'

/**
 * Plays a video forward/backward based on scroll position.
 * The video scrubs from 0 → duration as the container scrolls
 * from entering the viewport to leaving it.
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

    // Ensure the video is loaded enough to scrub
    video.pause()

    const onScroll = () => {
      if (!video.duration || !isFinite(video.duration)) return

      const rect = container.getBoundingClientRect()
      const windowH = window.innerHeight

      // Progress: 0 when top of container hits bottom of viewport,
      //           1 when bottom of container hits top of viewport
      const totalTravel = windowH + rect.height
      const traveled = windowH - rect.top
      const progress = Math.max(0, Math.min(1, traveled / totalTravel))

      video.currentTime = progress * video.duration
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    // Set initial position
    onScroll()

    return () => window.removeEventListener('scroll', onScroll)
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
