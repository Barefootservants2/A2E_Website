import Image from "next/image"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative w-full h-[85vh] min-h-[650px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/angel-hero.jpg"
          alt="Angelic figure with crystalline teal wings"
          fill
          className="object-cover object-[center_60%] scale-110"
          priority
        />
        <div className="absolute top-0 left-0 right-0 h-[200px] bg-[#0a0a0f]" />
        <div className="absolute top-[180px] left-0 right-0 h-[120px] bg-gradient-to-b from-[#0a0a0f] via-[#0a0a0f]/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/90 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(10,10,15,0.8)_100%)]" />
      </div>

      {/* TOP HEADER BAR */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-[#0a0a0f] border-b border-teal/20 px-4 md:px-8 py-5">
        <div className="max-w-7xl mx-auto">
          <div className="hidden md:flex items-center justify-between">
            <Link href="/about" className="group flex-shrink-0" title="My Story">
              <div className="relative w-14 h-14 lg:w-16 lg:h-16 transition-transform duration-300 group-hover:scale-110">
                <Image src="/images/metatron-logo.png" alt="Metatron Cube" fill className="object-contain drop-shadow-[0_0_15px_rgba(0,206,209,0.7)]" />
                <div className="absolute inset-[-4px] rounded-full border border-teal/40 animate-pulse" style={{ animationDuration: '3s' }} />
              </div>
            </Link>
            <div className="text-center flex-1 px-8 lg:px-16">
              <p className="text-base lg:text-lg font-light italic text-foreground tracking-wide leading-relaxed">
                &quot;The impediment to action advances action.
                <span className="block mt-1">What stands in the way becomes the way.&quot;</span>
              </p>
              <p className="text-sm text-teal mt-3 tracking-[0.3em] uppercase font-medium">— Marcus Aurelius</p>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="flex items-center gap-2 justify-end">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-mono text-teal tracking-wider">METATRON v7.4</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1 tracking-wider">14 GATES - 36 MODES</p>
              <p className="text-xs text-gold mt-1 tracking-wider font-mono">SYSTEMS ONLINE</p>
            </div>
          </div>
          <div className="md:hidden">
            <div className="flex items-center justify-between mb-3">
              <Link href="/about" className="group">
                <div className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-110">
                  <Image src="/images/metatron-logo.png" alt="Metatron Cube" fill className="object-contain drop-shadow-[0_0_12px_rgba(0,206,209,0.6)]" />
                </div>
              </Link>
              <div className="text-right">
                <div className="flex items-center gap-1.5 justify-end">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-mono text-teal">v7.4 ONLINE</span>
                </div>
              </div>
            </div>
            <p className="text-sm font-light italic text-foreground/90 text-center leading-relaxed">&quot;What stands in the way becomes the way.&quot;</p>
            <p className="text-xs text-teal text-center mt-2 tracking-[0.2em] uppercase">— Marcus Aurelius</p>
          </div>
        </div>
      </div>

      {/* Main Title */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pt-28 md:pt-24">
        {/* ASHES2ECHOES - Original extralight font with wide tracking */}
        <h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extralight tracking-[0.2em] sm:tracking-[0.3em] text-center px-4"
          style={{ 
            color: '#FFD700',
            textShadow: '0 0 30px rgba(212,175,55,0.5), 0 2px 4px rgba(0,0,0,0.8)'
          }}
        >
          ASHES2ECHOES
        </h1>
        
        {/* Subtitle - TEAL with white outline */}
        <p 
          className="mt-4 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-[0.15em] text-center uppercase"
          style={{ 
            color: '#00CED1',
            textShadow: '-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff, 0 0 10px rgba(0,206,209,0.5), 0 2px 4px rgba(0,0,0,0.8)'
          }}
        >
          The Uriel Covenant AI Collective
        </p>
        
        {/* Tagline - TEAL with white outline */}
        <div className="mt-6 flex items-center justify-center gap-4 text-base sm:text-lg">
          <span className="w-12 sm:w-20 h-px bg-teal" />
          <span 
            className="tracking-[0.2em] uppercase font-bold"
            style={{ 
              color: '#00CED1',
              textShadow: '-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff, 0 0 10px rgba(0,206,209,0.5), 0 2px 4px rgba(0,0,0,0.8)'
            }}
          >
            Discipline Over Hype
          </span>
          <span className="w-12 sm:w-20 h-px bg-teal" />
        </div>
      </div>

      {/* Scan line effect */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.015] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,206,209,0.1)_2px,rgba(0,206,209,0.1)_4px)]" />
    </section>
  )
}
