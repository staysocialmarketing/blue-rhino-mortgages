/**
 * Subtle rhino silhouette watermark for background brand accents.
 * Place inside a `relative overflow-hidden` container.
 */
export function RhinoWatermark({
  position = 'bottom-right',
  opacity = 0.04,
  size = '320px',
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
    'center-right': { top: '50%', right: '-3%', transform: 'translateY(-50%)' },
  }

  return (
    <img
      src="/rhino-mark.svg"
      alt=""
      aria-hidden="true"
      className="absolute pointer-events-none select-none"
      style={{
        width: size,
        height: 'auto',
        opacity,
        filter: light ? 'brightness(0) invert(1)' : undefined,
        ...posStyles[position],
      }}
    />
  )
}
