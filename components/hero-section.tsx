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
              {/* METATRON LOGO - STANDARDIZED: 100px, BRIGHT */}
              <div className="relative w-[100px] h-[100px] transition-transform duration-300 group-hover:scale-110">
                <Image 
                  src="/images/metatron-logo.png" 
                  alt="Metatron Cube" 
                  fill 
                  className="object-contain"
                  style={{ filter: 'brightness(1.5) saturate(1.5) drop-shadow(0 0 25px rgba(0,206,209,1)) drop-shadow(0 0 50px rgba(0,206,209,0.7))' }}
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
                <span className="text-sm font-mono text-teal tracking-wider">METATRON v7.7</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1 tracking-wider">16 GATES • 14 HUNTER</p>
              <p className="text-xs text-gold mt-1 tracking-wider font-mono">SYSTEMS ONLINE</p>
            </div>
          </div>
          <div className="md:hidden">
            <div className="flex items-center justify-between mb-3">
              <Link href="/about" className="group">
                {/* METATRON LOGO MOBILE - STANDARDIZED: 70px, BRIGHT */}
                <div className="relative w-[70px] h-[70px] transition-transform duration-300 group-hover:scale-110">
                  <Image 
                    src="/images/metatron-logo.png" 
                    alt="Metatron Cube" 
                    fill 
                    className="object-contain"
                    style={{ filter: 'brightness(1.5) saturate(1.5) drop-shadow(0 0 20px rgba(0,206,209,1))' }}
                    quality={100}
                  />
                  <div className="absolute inset-[-4px] rounded-full border border-teal/50 animate-pulse" style={{ animationDuration: '2s' }} />
                </div>
              </Link>
              <div className="text-right">
                <div className="flex items-center gap-1.5 justify-end">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-mono text-teal">v7.7 ONLINE</span>
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
        <h1 
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-[0.3em] sm:tracking-[0.4em] text-[#FFD700] px-4"
          style={{ fontFamily: 'var(--font-cinzel), serif', fontWeight: 400 }}
        >
          ASHES2ECHOES
        </h1>
        <p 
          className="mt-4 text-sm sm:text-base md:text-lg lg:text-xl tracking-[0.2em] sm:tracking-[0.25em] uppercase text-[#00FFFF]"
          style={{ fontFamily: 'var(--font-cinzel), serif', fontWeight: 400 }}
        >
          The Uriel Covenant AI Collective
        </p>
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

      {/* ANGEL IMAGE SECTION - CONTAINED, NO BLEED */}
      <div className="relative h-[50vh] min-h-[400px] max-h-[600px] overflow-hidden border-0 outline-0">
        <div className="absolute inset-0 overflow-hidden border-0">
          <Image
            src="/images/angel-hero.jpg"
            alt="Angelic figure with crystalline teal wings"
            fill
            className="object-cover object-center border-0"
            style={{ filter: 'contrast(1.1) saturate(1.2)' }}
            quality={100}
            priority
            unoptimized
          />
        </div>
        
        {/* CRYPTIC TEXT OVERLAY - MOVED UP from pt-[15%] to pt-[5%] */}
        <div className="absolute inset-0 flex items-start justify-center pt-[5%] pointer-events-none z-10">
          <p 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[0.5em] text-white/[0.12] select-none"
            style={{ 
              fontFamily: 'var(--font-cinzel), serif', 
              fontWeight: 400,
              textShadow: '0 0 30px rgba(255,255,255,0.05)',
              letterSpacing: '0.5em'
            }}
          >
            EX CINERE SURGO
          </p>
        </div>
        
        {/* EXPANDING RADIANCE FROM HEAD - Life force burst */}
        <div className="absolute top-[25%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-5">
          {/* Core glow */}
          <div className="absolute w-[100px] h-[100px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.4)_0%,rgba(255,220,150,0.2)_30%,transparent_70%)] animate-radiance-core" />
          
          {/* Expanding rings */}
          <div className="absolute w-[150px] h-[150px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 animate-radiance-expand" style={{ animationDelay: '0s' }} />
          <div className="absolute w-[150px] h-[150px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15 animate-radiance-expand" style={{ animationDelay: '0.5s' }} />
          <div className="absolute w-[150px] h-[150px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-teal/20 animate-radiance-expand" style={{ animationDelay: '1s' }} />
          <div className="absolute w-[150px] h-[150px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-teal/15 animate-radiance-expand" style={{ animationDelay: '1.5s' }} />
          <div className="absolute w-[150px] h-[150px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/10 animate-radiance-expand" style={{ animationDelay: '2s' }} />
          
          {/* Radial rays */}
          <div className="absolute w-[300px] h-[300px] -translate-x-1/2 -translate-y-1/2 animate-radiance-rays" style={{
            background: 'conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.05) 5deg, transparent 10deg, transparent 30deg, rgba(255,220,150,0.03) 35deg, transparent 40deg, transparent 60deg, rgba(0,206,209,0.04) 65deg, transparent 70deg, transparent 90deg)'
          }} />
        </div>
        
        {/* EDGE GRADIENTS - Top, Bottom, Left (blackout), Right (blackout) */}
        <div className="absolute top-0 left-0 right-0 h-[100px] bg-gradient-to-b from-[#0a0a0f] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[150px] bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/80 to-transparent" />
        <div className="absolute top-0 left-0 bottom-0 w-[80px] bg-gradient-to-r from-[#0a0a0f] via-[#0a0a0f]/90 to-transparent" />
        <div className="absolute top-0 right-0 bottom-0 w-[80px] bg-gradient-to-l from-[#0a0a0f] via-[#0a0a0f]/90 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(10,10,15,0.7)_100%)]" />
        
        {/* ENERGY EFFECTS - Lightning bolts and particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
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
        </div>
        
        <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,206,209,0.1)_2px,rgba(0,206,209,0.1)_4px)]" />
      </div>
    </section>
  )
}
