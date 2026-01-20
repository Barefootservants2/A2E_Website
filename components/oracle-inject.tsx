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
  const [showHistory, setShowHistory] = useState(false)
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

  const clearHistory = () => {
    setHistory([])
    localStorage.removeItem('oracle-inject-history')
  }

  const loadFromHistory = (entry: OracleEntry) => {
    setInput(entry.input)
    setStatus(entry.status)
    setShowHistory(false)
  }

  if (!mounted) return null

  return (
    <section className="w-full px-4 md:px-6 py-3 bg-[#0a0a0f] border-y border-gold/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <h2 className="text-xs font-mono text-gold tracking-[0.2em]">ORACLE INJECT</h2>
            <span className="text-[10px] text-muted-foreground">External Data Ingestion</span>
          </div>
          <div className="flex items-center gap-3">
            {history.length > 0 && (
              <>
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="text-[10px] text-teal/60 hover:text-teal transition-colors font-mono"
                >
                  HISTORY ({history.length})
                </button>
                <button
                  onClick={clearHistory}
                  className="text-[10px] text-red-400/60 hover:text-red-400 transition-colors font-mono"
                >
                  CLEAR
                </button>
              </>
            )}
          </div>
        </div>

        {/* History Dropdown */}
        {showHistory && history.length > 0 && (
          <div className="mb-2 bg-background/50 border border-teal/20 rounded p-2 max-h-32 overflow-y-auto">
            {history.slice(0, 10).map((entry) => (
              <button
                key={entry.id}
                onClick={() => loadFromHistory(entry)}
                className="w-full text-left px-2 py-1 hover:bg-teal/10 rounded transition-colors"
              >
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-foreground/70 truncate max-w-[70%]">
                    {entry.input.substring(0, 50)}...
                  </span>
                  <span className="text-[9px] text-muted-foreground font-mono">
                    {new Date(entry.timestamp).toLocaleDateString()}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Input Row */}
        <div className="flex gap-2 items-stretch">
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste news, 13F filings, analyst reports, SMS alerts..."
              className="w-full h-12 bg-background/30 border border-teal/30 rounded px-3 py-2 text-xs font-mono text-foreground/90 placeholder:text-muted-foreground/40 focus:border-gold/50 focus:outline-none resize-none"
            />
          </div>
          <button
            onClick={handleInject}
            disabled={isProcessing || !input.trim()}
            className="px-4 bg-gold/20 border border-gold/50 rounded text-xs font-mono text-gold hover:bg-gold/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all whitespace-nowrap"
          >
            {isProcessing ? 'INJECTING...' : 'INJECT'}
          </button>
        </div>

        {/* Status */}
        {status && (
          <div className="mt-2 text-[10px] font-mono text-teal/80">
            {status}
          </div>
        )}

        {/* Footer */}
        <div className="mt-1 text-[9px] text-muted-foreground/50">
          Use <code className="text-gold/60">ORACLE INJECT:</code> prefix in chat to auto-process | <code className="text-gold/60">MARKET WATCH</code> for full analysis
        </div>
      </div>
    </section>
  )
}
