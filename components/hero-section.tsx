"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

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
                "The impediment to action advances action.
                <span className="block mt-1">What stands in the way becomes the way."</span>
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
              "What stands in the way becomes the way."
            </p>
            <p className="text-xs text-teal text-center mt-2 tracking-[0.2em] uppercase">— Marcus Aurelius</p>
          </div>
        </div>
      </div>

      {/* BOOSTED Energy particles - client-side only to avoid hydration mismatch */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Large glowing orbs */}
          {[...Array(8)].map((_, i) => (
            <div
              key={`orb-${i}`}
              className="absolute rounded-full bg-teal animate-pulse"
              style={{
                left: `${15 + (i * 10)}%`,
                top: `${40 + Math.sin(i) * 15}%`,
                width: `${4 + Math.random() * 4}px`,
                height: `${4 + Math.random() * 4}px`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
                opacity: 0.5 + Math.random() * 0.4,
                boxShadow: '0 0 10px rgba(0, 206, 209, 0.8), 0 0 20px rgba(0, 206, 209, 0.4)',
              }}
            />
          ))}
          
          {/* Smaller particles */}
          {[...Array(30)].map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute w-1 h-1 bg-teal rounded-full animate-pulse"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${35 + Math.random() * 45}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
                opacity: 0.4 + Math.random() * 0.5,
                boxShadow: '0 0 6px rgba(0, 206, 209, 0.6)',
              }}
            />
          ))}
          
          {/* Floating dust motes */}
          {[...Array(15)].map((_, i) => (
            <div
              key={`dust-${i}`}
              className="absolute w-0.5 h-0.5 bg-gold/60 rounded-full"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${30 + Math.random() * 50}%`,
                animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 3}s`,
                opacity: 0.4 + Math.random() * 0.4,
              }}
            />
          ))}
        </div>
      )}

      {/* Energy lines - BOOSTED */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Vertical beams */}
        <div className="absolute top-[35%] left-[12%] w-0.5 h-48 bg-gradient-to-b from-transparent via-teal/50 to-transparent animate-pulse" style={{ animationDuration: '2.5s', boxShadow: '0 0 15px rgba(0, 206, 209, 0.5)' }} />
        <div className="absolute top-[40%] left-[20%] w-px h-32 bg-gradient-to-b from-transparent via-teal/40 to-transparent animate-pulse" style={{ animationDuration: '3s', animationDelay: '0.5s' }} />
        <div className="absolute top-[38%] right-[12%] w-0.5 h-48 bg-gradient-to-b from-transparent via-teal/50 to-transparent animate-pulse" style={{ animationDuration: '2.5s', animationDelay: '0.3s', boxShadow: '0 0 15px rgba(0, 206, 209, 0.5)' }} />
        <div className="absolute top-[45%] right-[20%] w-px h-32 bg-gradient-to-b from-transparent via-teal/40 to-transparent animate-pulse" style={{ animationDuration: '3s', animationDelay: '0.8s' }} />
        
        {/* Horizontal beams */}
        <div className="absolute top-[50%] left-[15%] w-24 h-px bg-gradient-to-r from-transparent via-teal/40 to-transparent animate-pulse" style={{ animationDuration: '2s', animationDelay: '1s' }} />
        <div className="absolute top-[55%] right-[15%] w-24 h-px bg-gradient-to-r from-transparent via-teal/40 to-transparent animate-pulse" style={{ animationDuration: '2s', animationDelay: '1.2s' }} />
        <div className="absolute top-[60%] left-[25%] w-16 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent animate-pulse" style={{ animationDuration: '2.5s', animationDelay: '0.7s' }} />
        <div className="absolute top-[60%] right-[25%] w-16 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent animate-pulse" style={{ animationDuration: '2.5s', animationDelay: '0.9s' }} />
        
        {/* Corner accents */}
        <div className="absolute top-[35%] left-[10%] w-3 h-3 border-t border-l border-teal/50 animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute top-[35%] right-[10%] w-3 h-3 border-t border-r border-teal/50 animate-pulse" style={{ animationDuration: '4s', animationDelay: '0.5s' }} />
        <div className="absolute bottom-[25%] left-[10%] w-3 h-3 border-b border-l border-teal/50 animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }} />
        <div className="absolute bottom-[25%] right-[10%] w-3 h-3 border-b border-r border-teal/50 animate-pulse" style={{ animationDuration: '4s', animationDelay: '1.5s' }} />
      </div>

      {/* Main Title - Centered */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pt-28 md:pt-24">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extralight tracking-[0.2em] sm:tracking-[0.3em] text-gold text-center drop-shadow-[0_0_50px_rgba(212,175,55,0.5)] px-4">
          ASHES2ECHOES
        </h1>
        <p className="mt-3 text-sm sm:text-base md:text-lg lg:text-xl font-light tracking-[0.1em] sm:tracking-[0.15em] text-foreground/80 text-center">
          The Uriel Covenant AI Collective
        </p>
        
        {/* Tagline */}
        <div className="mt-8 flex items-center gap-4 text-xs sm:text-sm text-teal">
          <span className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent to-teal/60" />
          <span className="tracking-[0.15em] sm:tracking-[0.2em] uppercase font-light">Discipline Over Hype</span>
          <span className="w-8 sm:w-12 h-px bg-gradient-to-l from-transparent to-teal/60" />
        </div>
      </div>

      {/* Scan line effect */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,206,209,0.1)_2px,rgba(0,206,209,0.1)_4px)]" />
      
      {/* Ambient glow behind angel */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  )
}
