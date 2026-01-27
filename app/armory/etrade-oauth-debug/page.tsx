'use client'

import Link from "next/link"
import { useState } from "react"
import { Footer } from "@/components/footer"

export default function ETradeOAuthDebugPage() {
  const [copied, setCopied] = useState(false)

  const copyInstall = () => {
    navigator.clipboard.writeText('npm install && node etrade_debug.js')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-16 px-4 overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-b from-teal/5 to-transparent" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link href="/" className="text-muted-foreground hover:text-teal transition-colors">
              Home
            </Link>
            <span className="text-muted-foreground mx-2">/</span>
            <Link href="/armory" className="text-muted-foreground hover:text-teal transition-colors">
              Armory
            </Link>
            <span className="text-muted-foreground mx-2">/</span>
            <span className="text-teal">E*TRADE OAuth Debug</span>
          </div>

          {/* Title */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-teal/20 text-teal text-xs px-2 py-1 rounded font-medium">
                  TRADING
                </span>
                <span className="bg-gold/20 text-gold text-xs px-2 py-1 rounded font-medium">
                  NEW
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                E*TRADE OAuth Debug
              </h1>
            </div>
          </div>

          <p className="text-xl text-muted-foreground mb-8">
            Diagnostic tool for E*TRADE API OAuth 1.0a authentication issues. 
            Captures full HTTP request/response traffic for support tickets.
          </p>

          {/* Quick actions */}
          <div className="flex flex-wrap gap-4">
            <a
              href="https://github.com/Barefootservants2/etrade-oauth-debug"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card border border-border hover:border-teal px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              View on GitHub
            </a>
            <a
              href="/tools/etrade-oauth-debug.zip"
              className="bg-teal hover:bg-teal/80 text-background px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Download ZIP
            </a>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* The Problem */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">The Problem</h2>
            <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-6">
              <p className="text-foreground mb-4">
                You're trying to authenticate with the E*TRADE API and you get:
              </p>
              <pre className="bg-background p-4 rounded-lg overflow-x-auto text-sm">
                <code className="text-destructive">
{`HTTP Status 401 — Unauthorized
oauth_problem=parameter_absent`}
                </code>
              </pre>
              <p className="text-muted-foreground mt-4">
                E*TRADE support asks for "request headers and response body" — 
                but how do you capture that from OAuth 1.0a?
              </p>
            </div>
          </div>

          {/* The Solution */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">The Solution</h2>
            <p className="text-muted-foreground mb-6">
              This tool runs the OAuth 1.0a flow and captures <strong className="text-foreground">everything</strong>:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'Full HTTP request headers (including OAuth signature)',
                'Full HTTP response headers and body',
                'Timestamps and elapsed time',
                'The exact authorization URL being generated',
                'Troubleshooting guide built into the report',
                'Text and JSON output formats'
              ].map((feature, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-teal mt-1">✓</span>
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Start */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">Quick Start</h2>
            
            {/* Step 1 */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                1. Download & Install
              </h3>
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Terminal</span>
                  <button
                    onClick={copyInstall}
                    className="text-xs text-teal hover:text-teal/80"
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <pre className="text-sm overflow-x-auto">
                  <code className="text-teal">
{`git clone https://github.com/Barefootservants2/etrade-oauth-debug.git
cd etrade-oauth-debug
npm install`}
                  </code>
                </pre>
              </div>
            </div>

            {/* Step 2 */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                2. Configure Credentials
              </h3>
              <p className="text-muted-foreground mb-2">
                Create a <code className="bg-card px-2 py-0.5 rounded">.env</code> file:
              </p>
              <div className="bg-card border border-border rounded-lg p-4">
                <pre className="text-sm overflow-x-auto">
                  <code className="text-foreground">
{`ETRADE_CONSUMER_KEY=your_consumer_key
ETRADE_CONSUMER_SECRET=your_consumer_secret`}
                  </code>
                </pre>
              </div>
            </div>

            {/* Step 3 */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                3. Run
              </h3>
              <div className="bg-card border border-border rounded-lg p-4">
                <pre className="text-sm overflow-x-auto">
                  <code className="text-teal">node etrade_debug.js</code>
                </pre>
              </div>
            </div>

            {/* Step 4 */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                4. Get Your Report
              </h3>
              <p className="text-muted-foreground">
                The tool creates a timestamped report file you can send directly to E*TRADE support.
              </p>
            </div>
          </div>

          {/* Command Options */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">Command Options</h2>
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="text-left p-4 text-foreground">Option</th>
                    <th className="text-left p-4 text-foreground">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="p-4"><code className="text-teal">--sandbox</code></td>
                    <td className="p-4 text-muted-foreground">Use E*TRADE sandbox environment</td>
                  </tr>
                  <tr>
                    <td className="p-4"><code className="text-teal">--verbose</code></td>
                    <td className="p-4 text-muted-foreground">Show all headers and full OAuth signatures</td>
                  </tr>
                  <tr>
                    <td className="p-4"><code className="text-teal">--json</code></td>
                    <td className="p-4 text-muted-foreground">Output as JSON instead of text</td>
                  </tr>
                  <tr>
                    <td className="p-4"><code className="text-teal">--help</code></td>
                    <td className="p-4 text-muted-foreground">Show help message</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Common Errors */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">Common Errors</h2>
            
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-2">
                  <code className="text-destructive">oauth_problem=parameter_absent</code>
                </h3>
                <p className="text-muted-foreground text-sm mb-2">
                  OAuth parameters aren't being passed correctly to the authorize endpoint.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Is your API key <strong className="text-foreground">active</strong>? (Keys can be issued but not activated)</li>
                  <li>• Is the key tied to <strong className="text-foreground">your</strong> account? (Individual keys only work with one account)</li>
                  <li>• Is callback configured as <code className="bg-secondary px-1 rounded">oob</code>?</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-2">
                  <code className="text-destructive">oauth_problem=signature_invalid</code>
                </h3>
                <p className="text-muted-foreground text-sm mb-2">
                  The OAuth signature doesn't match what E*TRADE computed.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Is your consumer secret correct? (No extra whitespace)</li>
                  <li>• Is your system clock accurate? (Must be within 5 minutes)</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-2">
                  <code className="text-destructive">oauth_problem=consumer_key_unknown</code>
                </h3>
                <p className="text-muted-foreground text-sm mb-2">
                  E*TRADE doesn't recognize your consumer key.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Is the key typed correctly?</li>
                  <li>• Has it been activated by E*TRADE?</li>
                  <li>• Are you using the right environment? (Sandbox vs production)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Support Contact */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">E*TRADE Support</h2>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Phone</h3>
                  <p className="text-teal text-lg">1-800-387-2331</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Secure Message</h3>
                  <p className="text-muted-foreground text-sm">
                    Log in to E*TRADE → Customer Service → Technical Issues → E*TRADE API
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">Requirements</h2>
            <ul className="text-muted-foreground space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-teal">•</span>
                Node.js 16.0.0 or higher
              </li>
              <li className="flex items-center gap-2">
                <span className="text-teal">•</span>
                E*TRADE account with API access
              </li>
              <li className="flex items-center gap-2">
                <span className="text-teal">•</span>
                API credentials (consumer key and secret)
              </li>
            </ul>
          </div>

          {/* License */}
          <div className="bg-secondary/30 rounded-lg p-6 text-center">
            <p className="text-muted-foreground text-sm">
              MIT License — Free to use, modify, and distribute.
            </p>
            <p className="text-muted-foreground text-sm mt-2">
              Built by <Link href="/" className="text-teal hover:underline">Ashes2Echoes LLC</Link>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
