import Image from "next/image"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative w-full h-[70vh] min-h-[500px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/angel-hero.jpg"
          alt="Angelic figure with crystalline teal wings"
          fill
          className="object-cover object-[center_40%]"
          priority
        />
        
        {/* TOP MASK - Covers the "ASFREAL CLIOV" gibberish */}
        <div className="absolute top-0 left-0 right-0 h-[15%] bg-gradient-to-b from-background via-background/95 to-transparent" />
        
        {/* Main overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/90" />
        
        {/* Side vignettes */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(10,10,15,0.8)_100%)]" />
      </div>

      {/* Energy particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-teal rounded-full animate-pulse"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${20 + Math.random() * 60}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              opacity: 0.2 + Math.random() * 0.4,
            }}
          />
        ))}
      </div>

      {/* Energy lines radiating from wings */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[30%] left-[20%] w-px h-40 bg-gradient-to-b from-transparent via-teal/30 to-transparent animate-pulse" style={{ animationDuration: '2.5s' }} />
        <div className="absolute top-[25%] left-[35%] w-px h-32 bg-gradient-to-b from-transparent via-teal/20 to-transparent animate-pulse" style={{ animationDuration: '3s', animationDelay: '0.5s' }} />
        <div className="absolute top-[30%] right-[20%] w-px h-40 bg-gradient-to-b from-transparent via-teal/30 to-transparent animate-pulse" style={{ animationDuration: '2.5s', animationDelay: '0.3s' }} />
        <div className="absolute top-[25%] right-[35%] w-px h-32 bg-gradient-to-b from-transparent via-teal/20 to-transparent animate-pulse" style={{ animationDuration: '3s', animationDelay: '0.8s' }} />
        {/* Horizontal energy */}
        <div className="absolute top-[45%] left-[15%] w-24 h-px bg-gradient-to-r from-transparent via-teal/25 to-transparent animate-pulse" style={{ animationDuration: '2s', animationDelay: '1s' }} />
        <div className="absolute top-[45%] right-[15%] w-24 h-px bg-gradient-to-r from-transparent via-teal/25 to-transparent animate-pulse" style={{ animationDuration: '2s', animationDelay: '1.3s' }} />
      </div>

      {/* Logo - LARGE with link to About/My Story */}
      <Link href="/about" className="absolute top-8 left-8 z-20 group" title="My Story">
        <div className="relative w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 transition-transform duration-300 group-hover:scale-110">
          <Image
            src="/images/metatron-logo.png"
            alt="Metatron's Cube - Ashes2Echoes Logo"
            fill
            className="object-contain drop-shadow-[0_0_15px_rgba(0,206,209,0.7)]"
          />
          {/* Pulsing glow ring */}
          <div className="absolute inset-[-8px] rounded-full border border-teal/30 animate-pulse" style={{ animationDuration: '3s' }} />
          <div className="absolute inset-[-16px] rounded-full border border-teal/10 animate-pulse" style={{ animationDuration: '4s', animationDelay: '0.5s' }} />
        </div>
      </Link>

      {/* Title Overlay - Positioned to cover any remaining artifact text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pt-8">
        <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-extralight tracking-[0.3em] md:tracking-[0.4em] text-gold text-center drop-shadow-[0_0_40px_rgba(212,175,55,0.4)] px-4">
          ASHES2ECHOES
        </h1>
        <p className="mt-4 text-lg md:text-xl lg:text-2xl font-light tracking-[0.2em] text-foreground/80 text-center">
          The Uriel Covenant AI Collective
        </p>
      </div>

      {/* Scan line effect */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.015] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,206,209,0.15)_2px,rgba(0,206,209,0.15)_4px)]" />
    </section>
  )
}
