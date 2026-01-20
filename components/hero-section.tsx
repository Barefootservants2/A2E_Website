import Image from "next/image"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative w-full h-[85vh] min-h-[650px] overflow-hidden">
      {/* Background Image - positioned to crop out top gibberish */}
      <div className="absolute inset-0">
        <Image
          src="/images/angel-hero.jpg"
          alt="Angelic figure with crystalline teal wings"
          fill
          className="object-cover object-[center_60%] scale-110"
          priority
        />
        
        {/* SOLID TOP BAR - 200px tall, completely covers gibberish */}
        <div className="absolute top-0 left-0 right-0 h-[200px] bg-[#0a0a0f]" />
        
        {/* Gradient fade from solid bar into image */}
        <div className="absolute top-[180px] left-0 right-0 h-[120px] bg-gradient-to-b from-[#0a0a0f] via-[#0a0a0f]/70 to-transparent" />
        
        {/* Bottom fade to cards */}
        <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/90 to-transparent" />
        
        {/* Side vignettes */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(10,10,15,0.8)_100%)]" />
      </div>

      {/* TOP HEADER BAR - Mission & Quote */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-[#0a0a0f] border-b border-teal/20 px-4 md:px-8 py-5">
        <div className="max-w-7xl mx-auto">
          {/* Desktop Layout */}
          <div className="hidden md:flex items-center justify-between">
            {/* Left: Logo */}
            <Link href="/about" className="group flex-shrink-0" title="My Story">
              <div className="relative w-14 h-14 lg:w-16 lg:h-16 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src="/images/metatron-logo.png"
                  alt="Metatron's Cube"
                  fill
                  className="object-contain drop-shadow-[0_0_15px_rgba(0,206,209,0.7)]"
                />
                <div className="absolute inset-[-4px] rounded-full border border-teal/40 animate-pulse" style={{ animationDuration: '3s' }} />
              </div>
            </Link>

            {/* Center: Quote */}
            <div className="text-center flex-1 px-8 lg:px-16">
              <p className="text-base lg:text-lg font-light italic text-foreground tracking-wide leading-relaxed">
                &quot;The impediment to action advances action.
                <span className="block mt-1">What stands in the way becomes the way.&quot;</span>
              </p>
              <p className="text-sm text-teal mt-3 tracking-[0.3em] uppercase font-medium">— Marcus Aurelius</p>
            </div>

            {/* Right: Protocol Status */}
            <div className="text-right flex-shrink-0">
              <div className="flex items-center gap-2 justify-end">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-mono text-teal tracking-wider">METATRON v7.4</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1 tracking-wider">14 GATES • 36 MODES</p>
              <p className="text-xs text-gold mt-1 tracking-wider font-mono">SYSTEMS ONLINE</p>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden">
            <div className="flex items-center justify-between mb-3">
              <Link href="/about" className="group">
                <div className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-110">
                  <Image
                    src="/images/metatron-logo.png"
                    alt="Metatron's Cube"
                    fill
                    className="object-contain drop-shadow-[0_0_12px_rgba(0,206,209,0.6)]"
                  />
                </div>
              </Link>
              <div className="text-right">
                <div className="flex items-center gap-1.5 justify-end">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-mono text-teal">v7.4 ONLINE</span>
                </div>
              </div>
            </div>
            <p className="text-sm font-light italic text-foreground/90 text-center leading-relaxed">
              &quot;What stands in the way becomes the way.&quot;
            </p>
            <p className="text-xs text-teal text-center mt-2 tracking-[0.2em] uppercase">— Marcus Aurelius</p>
          </div>
        </div>
      </div>

      {/* Energy particles - STATIC positions */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-1.5 h-1.5 bg-teal rounded-full animate-pulse" style={{ left: '15%', top: '45%', animationDelay: '0s', opacity: 0.6 }} />
        <div className="absolute w-1 h-1 bg-teal rounded-full animate-pulse" style={{ left: '25%', top: '50%', animationDelay: '0.5s', opacity: 0.5 }} />
        <div className="absolute w-1.5 h-1.5 bg-teal rounded-full animate-pulse" style={{ left: '35%', top: '42%', animationDelay: '1s', opacity: 0.7 }} />
        <div className="absolute w-1 h-1 bg-teal rounded-full animate-pulse" style={{ left: '45%', top: '55%', animationDelay: '1.5s', opacity: 0.5 }} />
        <div className="absolute w-1.5 h-1.5 bg-teal rounded-full animate-pulse" style={{ left: '55%', top: '48%', animationDelay: '2s', opacity: 0.6 }} />
        <div className="absolute w-1 h-1 bg-teal rounded-full animate-pulse" style={{ left: '65%', top: '52%', animationDelay: '0.3s', opacity: 0.5 }} />
        <div className="absolute w-1.5 h-1.5 bg-teal rounded-full animate-pulse" style={{ left: '75%', top: '44%', animationDelay: '0.8s', opacity: 0.7 }} />
        <div className="absolute w-1 h-1 bg-teal rounded-full animate-pulse" style={{ left: '85%', top: '50%', animationDelay: '1.3s', opacity: 0.5 }} />
        <div className="absolute w-2 h-2 bg-teal rounded-full animate-pulse" style={{ left: '20%', top: '60%', animationDelay: '0.2s', opacity: 0.4, boxShadow: '0 0 10px rgba(0,206,209,0.6)' }} />
        <div className="absolute w-2 h-2 bg-teal rounded-full animate-pulse" style={{ left: '80%', top: '40%', animationDelay: '1.8s', opacity: 0.4, boxShadow: '0 0 10px rgba(0,206,209,0.6)' }} />
      </div>

      {/* Energy lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[40%] left-[15%] w-px h-40 bg-gradient-to-b from-transparent via-teal/30 to-transparent animate-pulse" style={{ animationDuration: '3s' }} />
        <div className="absolute top-[45%] right-[15%] w-px h-40 bg-gradient-to-b from-transparent via-teal/30 to-transparent animate-pulse" style={{ animationDuration: '3s', animationDelay: '0.5s' }} />
        <div className="absolute top-[55%] left-[25%] w-16 h-px bg-gradient-to-r from-transparent via-teal/25 to-transparent animate-pulse" style={{ animationDuration: '2.5s', animationDelay: '1s' }} />
        <div className="absolute top-[55%] right-[25%] w-16 h-px bg-gradient-to-r from-transparent via-teal/25 to-transparent animate-pulse" style={{ animationDuration: '2.5s', animationDelay: '1.2s' }} />
      </div>

      {/* Main Title - Centered - HEAVY BOLD WITH STRONG GLOW */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pt-28 md:pt-24">
        {/* Title - font-black with intense multi-layer glow */}
        <h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-[0.15em] sm:tracking-[0.2em] text-[#FFD700] text-center px-4"
          style={{ 
            textShadow: '0 0 10px #FFD700, 0 0 20px #FFD700, 0 0 40px rgba(255,215,0,0.8), 0 0 80px rgba(255,215,0,0.5), 0 4px 8px rgba(0,0,0,0.9), 0 8px 16px rgba(0,0,0,0.7)' 
          }}
        >
          ASHES2ECHOES
        </h1>
        
        {/* Subtitle - bright white, bold */}
        <p 
          className="mt-4 text-base sm:text-lg md:text-xl lg:text-2xl font-bold tracking-[0.1em] sm:tracking-[0.15em] text-white text-center"
          style={{ 
            textShadow: '0 0 10px rgba(255,255,255,0.9), 0 0 30px rgba(0,206,209,0.7), 0 0 50px rgba(0,206,209,0.5), 0 3px 6px rgba(0,0,0,0.9)' 
          }}
        >
          The Uriel Covenant AI Collective
        </p>
        
        {/* Tagline - bright teal with glow */}
        <div className="mt-8 flex items-center gap-4 text-sm sm:text-base">
          <span className="w-10 sm:w-16 h-0.5 bg-gradient-to-r from-transparent to-teal rounded" />
          <span 
            className="tracking-[0.2em] sm:tracking-[0.25em] uppercase font-bold text-[#00FFFF]"
            style={{ 
              textShadow: '0 0 10px #00FFFF, 0 0 20px rgba(0,255,255,0.8), 0 0 40px rgba(0,255,255,0.5), 0 2px 4px rgba(0,0,0,0.9)' 
            }}
          >
            Discipline Over Hype
          </span>
          <span className="w-10 sm:w-16 h-0.5 bg-gradient-to-l from-transparent to-teal rounded" />
        </div>
      </div>

      {/* Scan line effect */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.015] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,206,209,0.1)_2px,rgba(0,206,209,0.1)_4px)]" />
    </section>
  )
}
