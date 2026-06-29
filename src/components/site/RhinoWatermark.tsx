/**
 * Subtle 3D rhino mascot watermark for background brand accents.
 * Uses transparent PNGs — no background bleed.
 * Place inside a `relative overflow-hidden` container.
 *
 * - Light sections (white/grey/#e6f0f8): blue faded rhino (light=false)
 * - Dark sections (blue gradient): white faded rhino (light=true)
 */
export function RhinoWatermark({
  position = 'bottom-right',
  opacity = 0.06,
  size = '500px',
  light = false,
}: {
  position?: 'bottom-right' | 'top-right' | 'bottom-left' | 'top-left' | 'center-right'
  opacity?: number
  size?: string
  light?: boolean
}) {
  const posStyles: Record<string, React.CSSProperties> = {
    'bottom-right': { bottom: '-10%', right: '-5%' },
    'top-right': { top: '-10%', right: '-5%' },
    'bottom-left': { bottom: '-10%', left: '-5%' },
    'top-left': { top: '-10%', left: '-5%' },
    'center-right': { top: '50%', right: '-5%', transform: 'translateY(-50%)' },
  }

  return (
    <img
      src={light ? '/rhino-mascot-white.png' : '/rhino-mascot.png'}
      alt=""
      aria-hidden="true"
      className="absolute pointer-events-none select-none"
      style={{
        width: size,
        height: 'auto',
        opacity,
        ...posStyles[position],
      }}
    />
  )
}
