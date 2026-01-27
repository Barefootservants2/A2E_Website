'use client'

import Link from "next/link"
import { useState } from "react"
import { Footer } from "@/components/footer"

// Tool data
const tools = [
  {
    id: 'etrade-oauth-debug',
    name: 'E*TRADE OAuth Debug',
    category: 'Trading',
    description: 'Diagnostic tool for E*TRADE API OAuth 1.0a authentication issues. Captures full HTTP request/response traffic for support tickets.',
    problem: 'Getting oauth_problem=parameter_absent and can\'t figure out why? E*TRADE support asking for HTTP headers you don\'t know how to capture?',
    features: [
      'Full HTTP request/response capture',
      'OAuth signature debugging',
      'Sandbox and production support',
      'Auto-generated support ticket reports',
      'Built-in troubleshooting guide'
    ],
    language: 'Node.js',
    license: 'MIT',
    github: 'https://github.com/Barefootservants2/etrade-oauth-debug',
    downloadUrl: '/tools/etrade-oauth-debug.zip',
    docsUrl: '/armory/etrade-oauth-debug',
    new: true,
  },
  {
    id: 'sync-repos',
    name: 'Multi-Repo Sync',
    category: 'DevOps',
    description: 'PowerShell script for synchronizing multiple Git repositories with a single command. Perfect for multi-agent AI systems.',
    problem: 'Managing 10+ repos and tired of cd-ing into each one to pull/push?',
    features: [
      'Sync all repos with one command',
      'Selective sync by category',
      'Automatic conflict detection',
      'Status dashboard',
      'Cross-platform (PowerShell Core)'
    ],
    language: 'PowerShell',
    license: 'MIT',
    github: 'https://github.com/Barefootservants2/sync-repos',
    downloadUrl: '/tools/sync-repos.zip',
    docsUrl: '/armory/sync-repos',
    new: false,
  },
  {
    id: 'email-archive-processor',
    name: 'Email Archive Processor',
    category: 'Automation',
    description: 'Python script that archives Gmail messages to structured markdown files with full-text search capability.',
    problem: 'Drowning in emails? Need to archive and search years of correspondence?',
    features: [
      'Gmail API integration',
      'Markdown export format',
      'Full-text search index',
      'Attachment handling',
      'Date range filtering'
    ],
    language: 'Python',
    license: 'MIT',
    github: 'https://github.com/Barefootservants2/email-archive-processor',
    downloadUrl: '/tools/email-archive-processor.zip',
    docsUrl: '/armory/email-archive-processor',
    new: false,
  },
]

const categories = ['All', 'Trading', 'DevOps', 'Automation']

export default function ArmoryPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  
  const filteredTools = activeCategory === 'All' 
    ? tools 
    : tools.filter(tool => tool.category === activeCategory)

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-teal/5 to-transparent" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Navigation breadcrumb */}
          <div className="mb-8">
            <Link href="/" className="text-muted-foreground hover:text-teal transition-colors">
              Home
            </Link>
            <span className="text-muted-foreground mx-2">/</span>
            <span className="text-teal">Armory</span>
          </div>

          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="text-teal">THE ARMORY</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Free tools forged in the fires of real-world development. 
              Take what you need. No signup. No strings.
            </p>
          </div>

          {/* Category filters */}
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  activeCategory === category
                    ? 'bg-teal text-background'
                    : 'bg-card border border-border text-foreground hover:border-teal'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map(tool => (
              <div
                key={tool.id}
                className="bg-card border border-border rounded-xl p-6 card-hover relative"
              >
                {/* New badge */}
                {tool.new && (
                  <div className="absolute -top-2 -right-2 bg-gold text-background text-xs font-bold px-2 py-1 rounded-full">
                    NEW
                  </div>
                )}

                {/* Category tag */}
                <div className="text-xs text-teal font-medium mb-2 uppercase tracking-wider">
                  {tool.category}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {tool.name}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm mb-4">
                  {tool.description}
                </p>

                {/* Problem statement */}
                <div className="bg-secondary/50 rounded-lg p-3 mb-4">
                  <p className="text-sm italic text-muted-foreground">
                    "{tool.problem}"
                  </p>
                </div>

                {/* Features */}
                <ul className="text-sm text-muted-foreground mb-4 space-y-1">
                  {tool.features.slice(0, 3).map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-teal mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <span className="bg-secondary px-2 py-1 rounded">{tool.language}</span>
                  <span>{tool.license} License</span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <a
                    href={tool.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-secondary hover:bg-secondary/80 text-foreground text-center py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    GitHub
                  </a>
                  <Link
                    href={tool.docsUrl}
                    className="flex-1 bg-teal hover:bg-teal/80 text-background text-center py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    View Docs
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {filteredTools.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">
                No tools in this category yet. Check back soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-card border border-border rounded-xl p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Got a Tool Idea?
            </h2>
            <p className="text-muted-foreground mb-6">
              We build tools when we hit walls. If you're stuck on something and think 
              others might benefit from a solution, let us know.
            </p>
            <a
              href="mailto:contact@ashes2echoes.com?subject=Tool%20Idea"
              className="inline-block bg-teal hover:bg-teal/80 text-background px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Submit an Idea
            </a>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-12 px-4 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
            Why Free?
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl mb-2">🔥</div>
              <h3 className="font-bold text-foreground mb-2">Forged in Battle</h3>
              <p className="text-sm text-muted-foreground">
                Every tool here solved a real problem we faced. They work because we needed them to work.
              </p>
            </div>
            <div>
              <div className="text-3xl mb-2">🤝</div>
              <h3 className="font-bold text-foreground mb-2">Pay It Forward</h3>
              <p className="text-sm text-muted-foreground">
                We've benefited from open source. This is our contribution back to the community.
              </p>
            </div>
            <div>
              <div className="text-3xl mb-2">📈</div>
              <h3 className="font-bold text-foreground mb-2">Build Trust</h3>
              <p className="text-sm text-muted-foreground">
                Free tools show we know what we're doing. When you need more, you know where to find us.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
