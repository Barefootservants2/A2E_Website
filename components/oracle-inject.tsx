"use client"

import { useState, useEffect } from "react"

interface OracleEntry {
  id: string
  timestamp: string
  input: string
  status: string
}

export function OracleInject() {
  const [input, setInput] = useState("")
  const [status, setStatus] = useState("")
  const [history, setHistory] = useState<OracleEntry[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('oracle-inject-history')
    if (saved) {
      try {
        setHistory(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to load Oracle history:', e)
      }
    }
  }, [])

  const saveToHistory = (entry: OracleEntry) => {
    const updated = [entry, ...history].slice(0, 50)
    setHistory(updated)
    localStorage.setItem('oracle-inject-history', JSON.stringify(updated))
  }

  const handleInject = () => {
    if (!input.trim()) return
    
    setIsProcessing(true)
    
    setTimeout(() => {
      const timestamp = new Date().toISOString()
      const statusMsg = `INJECTED @ ${new Date().toLocaleTimeString()} | ${input.length} chars | Ready for MARKET WATCH`
      
      setStatus(statusMsg)
      setIsProcessing(false)
      
      saveToHistory({
        id: Date.now().toString(),
        timestamp,
        input,
        status: statusMsg
      })
      
      setInput("")
    }, 500)
  }

  if (!mounted) return null

  return (
    <section className="w-full px-4 md:px-6 py-2 bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto">
        {/* Single row: label + input + button */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-[10px] font-mono text-gold tracking-wider">ORACLE INJECT</span>
          </div>
          
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleInject()}
            placeholder="Paste news, 13F filings, analyst reports, SMS alerts..."
            className="flex-1 h-8 bg-transparent border-b border-gold/30 px-2 text-xs font-mono text-foreground/90 placeholder:text-muted-foreground/40 focus:border-gold/60 focus:outline-none"
          />
          
          <button
            onClick={handleInject}
            disabled={isProcessing || !input.trim()}
            className="px-3 py-1 text-[10px] font-mono text-gold border border-gold/40 rounded hover:bg-gold/10 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            {isProcessing ? '...' : 'INJECT'}
          </button>
        </div>
        
        {/* Status line - only show if status exists */}
        {status && (
          <div className="mt-1 text-[9px] font-mono text-teal/70 pl-6">
            {status}
          </div>
        )}
      </div>
    </section>
  )
}
