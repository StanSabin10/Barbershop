interface Props { src: string; alt: string; className?: string; width?: number; height?: number }

export function Photo({ src, alt, className = '', width = 900, height = 1100 }: Props) {
  return <div className={`photo ${className}`}><img src={src} alt={alt} width={width} height={height} loading="lazy" decoding="async" /></div>
}
