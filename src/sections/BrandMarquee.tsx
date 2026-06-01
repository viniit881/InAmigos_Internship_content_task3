const words = [
  'STRENGTH',
  'DISCIPLINE',
  'TRANSFORMATION',
  'SUMMIT CORE',
  'PREMIUM',
  'PERFORMANCE',
  'ELITE',
  'AUSTIN',
]

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  const items = [...words, ...words]
  return (
    <div className="overflow-hidden py-4 border-y border-white/5 bg-bg-dark/80 group">
      <div
        className={`flex gap-12 whitespace-nowrap ${
          reverse ? 'animate-marquee-reverse' : 'animate-marquee'
        } group-hover:[animation-play-state:paused]`}
      >
        {items.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="font-oswald font-bold text-4xl md:text-5xl text-white/[0.12] uppercase tracking-wider shrink-0 hover:text-white/[0.22] transition-colors duration-300"
          >
            {word}
            <span className="text-accent-red/30 mx-12">◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function BrandMarquee() {
  return (
    <div className="relative gradient-edges" aria-hidden>
      <MarqueeRow />
      <MarqueeRow reverse />
    </div>
  )
}
