import Link from "next/link"
import Image from "next/image"

export default function ApparelPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="bg-[#0a0a0f] border-b border-teal/20 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10">
              <Image src="/images/metatron-logo.png" alt="Logo" fill className="object-contain" />
            </div>
            <span className="text-teal group-hover:text-gold transition-colors">← Command Center</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
            <span className="text-xs font-mono text-yellow-500">COMING SOON</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-b from-[#0a0a0f] to-background px-6 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-extralight tracking-[0.2em] text-gold mb-4">STATE'S FINEST™</h1>
        <p className="text-lg md:text-xl text-foreground/70 tracking-wider">Satirical Apparel Collection</p>
        <p className="mt-4 text-sm text-teal/70">Speaking Truth Through Thread</p>
      </div>

      {/* Coming Soon */}
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <div className="text-8xl mb-8 opacity-20">👕</div>
        <h2 className="text-3xl font-light text-gold mb-6">Store Opening Spring 2026</h2>
        <p className="text-foreground/70 max-w-2xl mx-auto leading-relaxed mb-8">
          State's Finest™ is a satirical apparel line that speaks uncomfortable truths through wearable art. 
          Sharp commentary. Zero apologies. Premium quality.
        </p>

        {/* Progress */}
        <div className="max-w-md mx-auto mb-12">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Store Setup Progress</span>
            <span className="text-teal font-mono">65%</span>
          </div>
          <div className="h-2 bg-background/50 rounded-full overflow-hidden border border-teal/20">
            <div className="h-full w-[65%] bg-gradient-to-r from-teal/60 to-teal rounded-full" />
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 text-left max-w-3xl mx-auto">
          <div className="bg-card/30 border border-teal/20 rounded p-5">
            <h3 className="text-teal font-medium mb-2">Premium Quality</h3>
            <p className="text-sm text-foreground/60">High-grade materials. Comfortable fits. Built to last.</p>
          </div>
          <div className="bg-card/30 border border-teal/20 rounded p-5">
            <h3 className="text-teal font-medium mb-2">Sharp Commentary</h3>
            <p className="text-sm text-foreground/60">Designs that make people think. Conversation starters.</p>
          </div>
          <div className="bg-card/30 border border-teal/20 rounded p-5">
            <h3 className="text-teal font-medium mb-2">Limited Runs</h3>
            <p className="text-sm text-foreground/60">Small batches. When they're gone, they're gone.</p>
          </div>
        </div>
      </div>

      {/* Preview Categories */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-light tracking-wider text-teal mb-8 text-center">Coming Categories</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            ["T-Shirts", "Core collection"],
            ["Hoodies", "Premium heavyweight"],
            ["Hats", "Structured & unstructured"],
            ["Accessories", "Stickers, patches, more"],
          ].map(([name, desc], i) => (
            <div key={i} className="bg-card/50 border border-teal/20 rounded p-4 text-center">
              <p className="text-foreground/90 font-medium">{name}</p>
              <p className="text-xs text-muted-foreground mt-1">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mailing List */}
      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl font-light text-gold mb-4">Get Notified at Launch</h2>
        <p className="text-foreground/60 mb-6">
          Drop your email to be first in line when the store opens.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="your@email.com"
            className="flex-1 bg-background border border-teal/30 rounded px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-teal focus:outline-none"
          />
          <button className="bg-teal/20 border border-teal/40 text-teal px-6 py-3 rounded hover:bg-teal/30 transition-colors font-medium">
            Notify Me
          </button>
        </div>
        <p className="text-xs text-muted-foreground mt-4">No spam. Just launch notification.</p>
      </div>

      {/* Philosophy */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="bg-card/30 border border-gold/20 rounded p-8 text-center">
          <h3 className="text-gold font-light text-xl mb-4">The State's Finest Philosophy</h3>
          <p className="text-foreground/70 leading-relaxed mb-4">
            In a world of careful corporate messaging and sanitized opinions, 
            State's Finest exists to say what others won't. Our designs are 
            conversation pieces — meant to provoke thought, challenge assumptions, 
            and remind people that dissent is patriotic.
          </p>
          <p className="text-teal italic">
            "If you're not pissing someone off, you're not saying anything worth hearing."
          </p>
        </div>
      </div>

      {/* Social Proof Placeholder */}
      <div className="max-w-4xl mx-auto px-6 py-12 text-center">
        <p className="text-muted-foreground text-sm">
          Follow the journey: <span className="text-teal">@statesfinest</span> (coming soon)
        </p>
      </div>

      {/* Footer */}
      <footer className="border-t border-teal/20 py-6 text-center text-sm text-muted-foreground">
        <p>© 2026 Ashes2Echoes LLC. State's Finest™ is a trademark of Ashes2Echoes LLC.</p>
      </footer>
    </main>
  )
}
