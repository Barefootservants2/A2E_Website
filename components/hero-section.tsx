import Image from "next/image"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative w-full h-[75vh] min-h-[550px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/angel-hero.jpg"
          alt="Angelic figure with crystalline teal wings"
          fill
          className="object-cover object-[center_45%]"
          priority
        />
        
        {/* SOLID TOP BAR - Completely covers the gibberish text */}
        <div className="absolute top-0 left-0 right-0 h-[120px] bg-background" />
        
        {/* Gradient fade from solid bar */}
        <div className="absolute top-[100px] left-0 right-0 h-[80px] bg-gradient-to-b from-background via-background/70 to-transparent" />
        
        {/* Bottom fade to cards */}
        <div className="absolute bottom-0 left-0 right-0 h-[150px] bg-gradient-to-t from-background via-background/80 to-transparent" />
        
        {/* Side vignettes */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(10,10,15,0.7)_100%)]" />
      </div>

      {/* TOP HEADER BAR - Mission & Quote */}
      <div className="absolute top-0 left-0 right-0 z-20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: Logo */}
          <Link href="/about" className="group" title="My Story">
            <div className="relative w-16 h-16 md:w-20 md:h-20 transition-transform duration-300 group-hover:scale-110">
              <Image
                src="/images/metatron-logo.png"
                alt="Metatron's Cube - Ashes2Echoes Logo"
                fill
                className="object-contain drop-shadow-[0_0_12px_rgba(0,206,209,0.6)]"
              />
              <div className="absolute inset-[-4px] rounded-full border border-teal/30 animate-pulse" style={{ animationDuration: '3s' }} />
            </div>
          </Link>

          {/* Center: Quote */}
          <div className="hidden md:block text-center flex-1 px-8">
            <p className="text-sm md:text-base font-light italic text-foreground/70 tracking-wide">
              "The impediment to action advances action.
            </p>
            <p className="text-sm md:text-base font-light italic text-foreground/70 tracking-wide">
              What stands in the way becomes the way."
            </p>
            <p className="text-xs text-teal/60 mt-1 tracking-widest">— MARCUS AURELIUS</p>
          </div>

          {/* Right: Protocol Status */}
          <div className="text-right">
            <div className="flex items-center gap-2 justify-end">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-mono text-teal tracking-wider">METATRON v7.4</span>
            </div>
            <p className="text-[10px] text-muted-foreground/60 mt-1 tracking-wider">14 GATES • 36 MODES</p>
            <p className="text-[10px] text-gold/70 mt-0.5 tracking-wider">SYSTEMS ONLINE</p>
          </div>
        </div>

        {/* Mobile Quote - Shows below header on small screens */}
        <div className="md:hidden text-center mt-4 px-4">
          <p className="text-xs font-light italic text-foreground/60">
            "What stands in the way becomes the way."
          </p>
          <p className="text-[10px] text-teal/50 mt-1">— MARCUS AURELIUS</p>
        </div>
      </div>

      {/* Energy particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-teal rounded-full animate-pulse"
            style={{
              left: `${5 + Math.random() * 90}%`,
              top: `${25 + Math.random() * 55}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              opacity: 0.15 + Math.random() * 0.35,
            }}
          />
        ))}
      </div>

      {/* Energy lines radiating from figure */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[35%] left-[18%] w-px h-48 bg-gradient-to-b from-transparent via-teal/25 to-transparent animate-pulse" style={{ animationDuration: '3s' }} />
        <div className="absolute top-[30%] left-[32%] w-px h-36 bg-gradient-to-b from-transparent via-teal/15 to-transparent animate-pulse" style={{ animationDuration: '4s', animationDelay: '0.5s' }} />
        <div className="absolute top-[35%] right-[18%] w-px h-48 bg-gradient-to-b from-transparent via-teal/25 to-transparent animate-pulse" style={{ animationDuration: '3s', animationDelay: '0.3s' }} />
        <div className="absolute top-[30%] right-[32%] w-px h-36 bg-gradient-to-b from-transparent via-teal/15 to-transparent animate-pulse" style={{ animationDuration: '4s', animationDelay: '0.8s' }} />
        {/* Horizontal energy */}
        <div className="absolute top-[50%] left-[10%] w-20 h-px bg-gradient-to-r from-transparent via-teal/20 to-transparent animate-pulse" style={{ animationDuration: '2.5s', animationDelay: '1s' }} />
        <div className="absolute top-[50%] right-[10%] w-20 h-px bg-gradient-to-r from-transparent via-teal/20 to-transparent animate-pulse" style={{ animationDuration: '2.5s', animationDelay: '1.3s' }} />
      </div>

      {/* Main Title - Centered */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pt-16">
        <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-extralight tracking-[0.25em] md:tracking-[0.35em] text-gold text-center drop-shadow-[0_0_40px_rgba(212,175,55,0.4)] px-4">
          ASHES2ECHOES
        </h1>
        <p className="mt-3 text-base md:text-lg lg:text-xl font-light tracking-[0.15em] text-foreground/70 text-center">
          The Uriel Covenant AI Collective
        </p>
        
        {/* Tagline */}
        <div className="mt-6 flex items-center gap-3 text-xs md:text-sm text-teal/60">
          <span className="w-8 h-px bg-teal/40" />
          <span className="tracking-[0.2em] uppercase">Discipline Over Hype</span>
          <span className="w-8 h-px bg-teal/40" />
        </div>
      </div>

      {/* Scan line effect */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.012] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,206,209,0.15)_2px,rgba(0,206,209,0.15)_4px)]" />
    </section>
  )
}
