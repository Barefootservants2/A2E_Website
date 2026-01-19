import Image from "next/image"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative w-full h-[70vh] min-h-[500px] overflow-hidden">
      {/* Background Image - cropped to hide "ASFREAL CLIOV" text */}
      <div className="absolute inset-0">
        <Image
          src="/images/angel-hero.jpg"
          alt="Angelic figure with crystalline teal wings"
          fill
          className="object-cover object-[center_35%]"
          priority
        />
        {/* Overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-transparent to-background" />
      </div>

      {/* Energy particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-teal rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              opacity: 0.3 + Math.random() * 0.5,
            }}
          />
        ))}
      </div>

      {/* Lightning/energy lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-px h-32 bg-gradient-to-b from-transparent via-teal/40 to-transparent animate-pulse" style={{ animationDuration: '2s' }} />
        <div className="absolute top-1/3 right-1/3 w-px h-24 bg-gradient-to-b from-transparent via-teal/30 to-transparent animate-pulse" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
        <div className="absolute bottom-1/3 left-1/3 w-32 h-px bg-gradient-to-r from-transparent via-teal/30 to-transparent animate-pulse" style={{ animationDuration: '3s', animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/4 w-24 h-px bg-gradient-to-r from-transparent via-teal/40 to-transparent animate-pulse" style={{ animationDuration: '2.2s', animationDelay: '0.7s' }} />
      </div>

      {/* Logo - LARGER with link */}
      <Link href="/about" className="absolute top-6 left-6 z-10 group">
        <div className="relative w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 drop-shadow-[0_0_20px_rgba(0,206,209,0.7)] transition-transform duration-300 group-hover:scale-110">
          <Image
            src="/images/metatron-logo.png"
            alt="Metatron's Cube - Ashes2Echoes Logo"
            fill
            className="object-contain [filter:drop-shadow(0_0_12px_rgba(0,206,209,0.6))_brightness(1.1)]"
          />
          {/* Glow ring on hover */}
          <div className="absolute inset-0 rounded-full border-2 border-teal/0 group-hover:border-teal/50 transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(0,206,209,0.4)]" />
        </div>
      </Link>

      {/* Title Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extralight tracking-[0.4em] text-gold text-center drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]">
          ASHES2ECHOES
        </h1>
        <p className="mt-4 text-lg md:text-xl lg:text-2xl font-light tracking-widest text-foreground/80 text-center">
          The Uriel Covenant AI Collective
        </p>
      </div>

      {/* Scan line effect */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,206,209,0.1)_2px,rgba(0,206,209,0.1)_4px)]" />
    </section>
  )
}
