import Image from "next/image"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* TOP HEADER BAR */}
      <div className="relative z-20 bg-[#0a0a0f] border-b border-teal/20 px-4 md:px-8 py-5">
        <div className="max-w-7xl mx-auto">
          <div className="hidden md:flex items-center justify-between">
            <Link href="/about" className="group flex-shrink-0" title="My Story">
              <div className="relative w-20 h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 transition-transform duration-300 group-hover:scale-110">
                <Image 
                  src="/images/metatron-logo.png" 
                  alt="Metatron Cube" 
                  fill 
                  className="object-contain"
                  style={{ filter: 'brightness(1.3) saturate(1.4) drop-shadow(0 0 30px rgba(0,206,209,1)) drop-shadow(0 0 60px rgba(0,206,209,0.6))' }}
                  quality={100}
                />
                <div className="absolute inset-[-8px] rounded-full border-2 border-teal/60 animate-pulse" style={{ animationDuration: '2s' }} />
                <div className="absolute inset-[-16px] rounded-full border border-teal/30 animate-pulse" style={{ animationDuration: '3s', animationDelay: '0.5s' }} />
              </div>
            </Link>
            <div className="text-center flex-1 px-8 lg:px-16">
              <p className="text-base lg:text-lg font-light italic text-white tracking-wide leading-relaxed">
                &quot;The impediment to action advances action.
                <span className="block mt-1">What stands in the way becomes the way.&quot;</span>
              </p>
              <p className="text-sm text-teal mt-3 tracking-[0.3em] uppercase font-medium">-- Marcus Aurelius</p>
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
                <div className="relative w-14 h-14 transition-transform duration-300 group-hover:scale-110">
                  <Image 
                    src="/images/metatron-logo.png" 
                    alt="Metatron Cube" 
                    fill 
                    className="object-contain"
                    style={{ filter: 'brightness(1.3) saturate(1.4) drop-shadow(0 0 20px rgba(0,206,209,1))' }}
                    quality={100}
                  />
                  <div className="absolute inset-[-4px] rounded-full border border-teal/50 animate-pulse" style={{ animationDuration: '2s' }} />
                </div>
              </Link>
              <div className="text-right">
                <div className="flex items-center gap-1.5 justify-end">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-mono text-teal">v7.4 ONLINE</span>
                </div>
              </div>
            </div>
            <p className="text-sm font-light italic text-white/90 text-center leading-relaxed">&quot;What stands in the way becomes the way.&quot;</p>
            <p className="text-xs text-teal text-center mt-2 tracking-[0.2em] uppercase">-- Marcus Aurelius</p>
          </div>
        </div>
      </div>

      {/* MAIN TITLE SECTION - ABOVE IMAGE */}
      <div className="relative z-10 bg-[#0a0a0f] py-8 md:py-12 text-center">
        {/* ASHES2ECHOES - CINZEL font - ancient Roman inscription style */}
        <h1 
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-[0.3em] sm:tracking-[0.4em] text-[#FFD700] px-4"
          style={{ fontFamily: 'var(--font-cinzel), serif', fontWeight: 400 }}
        >
          ASHES2ECHOES
        </h1>
        {/* Subtitle - Cinzel lighter */}
        <p 
          className="mt-4 text-sm sm:text-base md:text-lg lg:text-xl tracking-[0.2em] sm:tracking-[0.25em] uppercase text-[#00FFFF]"
          style={{ fontFamily: 'var(--font-cinzel), serif', fontWeight: 400 }}
        >
          The Uriel Covenant AI Collective
        </p>
        {/* Tagline */}
        <div className="mt-4 flex items-center justify-center gap-4 text-xs sm:text-sm">
          <span className="w-10 sm:w-16 h-px bg-teal/60" />
          <span 
            className="tracking-[0.25em] uppercase text-[#00FFFF]"
            style={{ fontFamily: 'var(--font-cinzel), serif', fontWeight: 400 }}
          >
            Discipline Over Hype
          </span>
          <span className="w-10 sm:w-16 h-px bg-teal/60" />
        </div>
      </div>

      {/* ANGEL IMAGE SECTION - 8K CRISP */}
      <div className="relative h-[50vh] min-h-[400px] max-h-[600px]">
        <Image
          src="/images/angel-hero.jpg"
          alt="Angelic figure with crystalline teal wings"
          fill
          className="object-cover object-[center_45%]"
          style={{ filter: 'contrast(1.1) saturate(1.2)' }}
          quality={100}
          priority
          unoptimized
        />
        <div className="absolute top-0 left-0 right-0 h-[100px] bg-gradient-to-b from-[#0a0a0f] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[150px] bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/80 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(10,10,15,0.7)_100%)]" />
        
        {/* ENERGY EFFECTS */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(0,206,209,0.15)_0%,transparent_70%)] animate-pulse" style={{ animationDuration: '2s' }} />
          <div className="absolute top-[5%] left-[48%] w-0.5 h-20 bg-gradient-to-b from-teal via-cyan-300 to-transparent animate-pulse opacity-80" style={{ animationDuration: '0.8s' }} />
          <div className="absolute top-[8%] left-[52%] w-0.5 h-16 bg-gradient-to-b from-cyan-300 via-teal to-transparent animate-pulse opacity-70" style={{ animationDuration: '1.2s', animationDelay: '0.3s' }} />
          <div className="absolute top-[3%] left-[45%] w-px h-24 bg-gradient-to-b from-white via-teal to-transparent animate-pulse opacity-60" style={{ animationDuration: '1s', animationDelay: '0.5s' }} />
          <div className="absolute top-[6%] left-[55%] w-px h-20 bg-gradient-to-b from-white via-cyan-400 to-transparent animate-pulse opacity-60" style={{ animationDuration: '0.9s', animationDelay: '0.2s' }} />
          <div className="absolute top-[10%] left-[40%] w-16 h-0.5 bg-gradient-to-r from-transparent via-teal to-transparent animate-pulse rotate-[-30deg] opacity-70" style={{ animationDuration: '1.5s' }} />
          <div className="absolute top-[10%] right-[40%] w-16 h-0.5 bg-gradient-to-r from-transparent via-teal to-transparent animate-pulse rotate-[30deg] opacity-70" style={{ animationDuration: '1.5s', animationDelay: '0.4s' }} />
          <div className="absolute top-[12%] left-[46%] w-1.5 h-1.5 bg-white rounded-full animate-ping opacity-80" style={{ animationDuration: '2s' }} />
          <div className="absolute top-[8%] left-[50%] w-1 h-1 bg-cyan-300 rounded-full animate-ping opacity-70" style={{ animationDuration: '1.5s', animationDelay: '0.5s' }} />
          <div className="absolute top-[14%] left-[54%] w-1.5 h-1.5 bg-teal rounded-full animate-ping opacity-80" style={{ animationDuration: '2.5s', animationDelay: '0.8s' }} />
          <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[400px] h-[200px] border border-teal/20 rounded-full animate-pulse opacity-40" style={{ animationDuration: '3s' }} />
        </div>
        
        <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,206,209,0.1)_2px,rgba(0,206,209,0.1)_4px)]" />
      </div>
    </section>
  )
}
