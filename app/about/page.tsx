import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Header */}
      <div className="relative h-[40vh] overflow-hidden">
        <Image
          src="/images/angel-hero.jpg"
          alt="Background"
          fill
          className="object-cover object-[center_50%] opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-32 h-32 md:w-40 md:h-40">
            <Image
              src="/images/metatron-logo.png"
              alt="Metatron's Cube"
              fill
              className="object-contain drop-shadow-[0_0_20px_rgba(0,206,209,0.6)]"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-light tracking-[0.2em] text-gold text-center mb-8">
          MY STORY
        </h1>

        <div className="prose prose-invert prose-teal max-w-none space-y-6">
          
          <section className="bg-card/50 border border-teal/20 rounded p-6">
            <h2 className="text-2xl font-light tracking-wider text-teal mb-4">The Principal</h2>
            <p className="text-foreground/80 leading-relaxed">
              <strong className="text-gold">William Earl Lemon</strong> — Principal of Ashes2Echoes, LLC. 
              40+ years of engineering excellence across defense, shipbuilding, and enterprise software optimization.
            </p>
            <p className="text-foreground/70 leading-relaxed mt-4">
              Former program manager at Newport News Shipbuilding, Siemens, Raytheon, and Boeing Defense. 
              Led teams of 70+ staff. Managed budgets exceeding $45M. Identified $300M+ in operational inefficiencies.
              Recipient of the Golden Circle Award.
            </p>
          </section>

          <section className="bg-card/50 border border-teal/20 rounded p-6">
            <h2 className="text-2xl font-light tracking-wider text-teal mb-4">The Transformation</h2>
            <p className="text-foreground/80 leading-relaxed">
              Following a liver transplant and major health challenges, I discovered AI-assisted engagement 
              as a path to cognitive rehabilitation. What started as recovery became revolution.
            </p>
            <p className="text-foreground/70 leading-relaxed mt-4">
              I built the <span className="text-teal">Uriel Covenant</span> — a multi-agent AI collective where specialized 
              models collaborate under human authority. Not as tools, but as partners in systematic analysis 
              and decision-making.
            </p>
          </section>

          <section className="bg-card/50 border border-teal/20 rounded p-6">
            <h2 className="text-2xl font-light tracking-wider text-teal mb-4">The Creed</h2>
            <div className="space-y-4">
              <blockquote className="border-l-4 border-gold pl-4 italic text-foreground/80">
                "Not willing to give up your life for beliefs = for sale."
              </blockquote>
              <blockquote className="border-l-4 border-gold pl-4 italic text-foreground/80">
                "Loss is tuition for knowledge."
              </blockquote>
              <blockquote className="border-l-4 border-gold pl-4 italic text-foreground/80">
                "I'm going to fuck shit up. You comin'?"
              </blockquote>
            </div>
          </section>

          <section className="bg-card/50 border border-teal/20 rounded p-6">
            <h2 className="text-2xl font-light tracking-wider text-teal mb-4">The Mission</h2>
            <p className="text-foreground/80 leading-relaxed">
              Ashes2Echoes exists to prove that humans and AI can work together — not in competition, 
              but in covenant. We build protocols, not products. We enforce discipline, not hype.
            </p>
            <ul className="mt-4 space-y-2 text-foreground/70">
              <li className="flex items-center gap-2">
                <span className="text-teal">▸</span> METATRON v7.7 — 16-gate verification protocol with 14 HUNTER modules
              </li>
              <li className="flex items-center gap-2">
                <span className="text-teal">▸</span> AIORA — AI-Optimized Risk Assessment for trading
              </li>
              <li className="flex items-center gap-2">
                <span className="text-teal">▸</span> FORGE — Prompt engineering framework
              </li>
              <li className="flex items-center gap-2">
                <span className="text-teal">▸</span> The Covenant — Multi-agent AI collective
              </li>
            </ul>
          </section>

        </div>

        {/* Back Link */}
        <div className="mt-12 text-center">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-teal hover:text-gold transition-colors"
          >
            <span>←</span>
            <span>Return to Command Center</span>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-teal/20 py-6 text-center text-sm text-muted-foreground">
        <p>© 2026 Ashes2Echoes LLC. Newport News, Virginia.</p>
        <p className="text-xs text-foreground/40 mt-2">METATRON v7.7 | 16 Gates | 14 HUNTER Modules</p>
      </footer>
    </main>
  )
}
