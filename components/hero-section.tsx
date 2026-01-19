import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative w-full h-[70vh] min-h-[500px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/angel-hero.jpg"
          alt="Angelic figure with crystalline teal wings"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background" />
      </div>

      {/* Logo */}
      <div className="absolute top-6 left-6 z-10">
        <div className="relative w-16 h-16 md:w-20 md:h-20 drop-shadow-[0_0_15px_rgba(0,206,209,0.6)]">
          <Image
            src="/images/metatron-logo.png"
            alt="Metatron's Cube - Ashes2Echoes Logo"
            fill
            className="object-contain brightness-110 contrast-110 [filter:drop-shadow(0_0_8px_rgba(0,206,209,0.5))_hue-rotate(160deg)_saturate(1.5)]"
          />
        </div>
      </div>

      {/* Title Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-start pt-16 md:pt-20 z-10">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extralight tracking-[0.4em] text-gold text-center">
          ASHES2ECHOES
        </h1>
        <p className="mt-4 text-lg md:text-xl lg:text-2xl font-light tracking-widest text-foreground/80 text-center">
          The Uriel Covenant AI Collective
        </p>
      </div>
    </section>
  )
}
