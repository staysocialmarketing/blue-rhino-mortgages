/**
 * Subtle 3D rhino mascot watermark for background brand accents.
 * Place inside a `relative overflow-hidden` container.
 *
 * - Light sections (white/grey/#e6f0f8): blue faded rhino (light=false)
 * - Dark sections (blue gradient): white faded rhino (light=true)
 */
export function RhinoWatermark({
  position = 'bottom-right',
  opacity = 0.06,
  size = '320px',
  light = false,
}: {
  position?: 'bottom-right' | 'top-right' | 'bottom-left' | 'top-left' | 'center-right'
  opacity?: number
  size?: string
  light?: boolean
}) {
  const posStyles: Record<string, React.CSSProperties> = {
    'bottom-right': { bottom: '-8%', right: '-3%' },
    'top-right': { top: '-8%', right: '-3%' },
    'bottom-left': { bottom: '-8%', left: '-3%' },
    'top-left': { top: '-8%', left: '-3%' },
    'center-right': { top: '50%', right: '-3%', transform: 'translateY(-50%)' },
  }

  return (
    <img
      src="/rhino-mascot.jpg"
      alt=""
      aria-hidden="true"
      className="absolute pointer-events-none select-none"
      style={{
        width: size,
        height: 'auto',
        opacity,
        // White-bg mascot: on dark sections, invert to white; on light sections, keep blue
        filter: light ? 'brightness(0) invert(1)' : undefined,
        ...posStyles[position],
      }}
    />
  )
}
