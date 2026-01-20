"use client"

import { useState, useEffect } from "react"

interface OracleEntry {
  id: string
  timestamp: string
  input: string
  label: string
}

export function OracleInject() {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<OracleEntry[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [saveEnabled, setSaveEnabled] = useState(true)
  const [saveLocation, setSaveLocation] = useState("local")
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
    if (!saveEnabled) return
    const updated = [entry, ...history].slice(0, 50)
    setHistory(updated)
    localStorage.setItem('oracle-inject-history', JSON.stringify(updated))
  }

  const handleInject = () => {
    if (!input.trim()) return
    
    setIsProcessing(true)
    
    setTimeout(() => {
      const timestamp = new Date().toISOString()
      
      saveToHistory({
        id: Date.now().toString(),
        timestamp,
        input,
        label: input.substring(0, 30) + (input.length > 30 ? '...' : '')
      })
      
      setInput("")
      setIsProcessing(false)
    }, 300)
  }

  const loadFromHistory = (entry: OracleEntry) => {
    setInput(entry.input)
    setShowHistory(false)
  }

  if (!mounted) return null

  return (
    <section className="w-full bg-[#0a0a0f] border-t border-teal/20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
        {/* ORACLE Header */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
          <h2 className="text-sm font-mono text-gold tracking-[0.3em]">ORACLE</h2>
        </div>
        
        {/* Main Container */}
        <div className="border border-teal/30 rounded-lg p-4 bg-[#0a0a0f]/80">
          {/* INPUT Label */}
          <div className="text-xs font-mono text-teal/70 mb-2 tracking-wider">INPUT</div>
          
          {/* Input Field */}
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste news, 13F filings, analyst reports, SMS alerts..."
            className="w-full h-20 bg-[#0d1117] border border-teal/20 rounded px-3 py-2 text-sm font-mono text-foreground/90 placeholder:text-muted-foreground/40 focus:border-teal/50 focus:outline-none resize-none"
          />
          
          {/* Bottom Row: Save options + Inject button */}
          <div className="mt-3 flex items-center justify-between">
            {/* Left: Save checkbox + location dropdown */}
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={saveEnabled}
                  onChange={(e) => setSaveEnabled(e.target.checked)}
                  className="w-3 h-3 accent-teal"
                />
                <span className="text-[10px] font-mono text-foreground/60">SAVE</span>
              </label>
              
              {saveEnabled && (
                <select
                  value={saveLocation}
                  onChange={(e) => setSaveLocation(e.target.value)}
                  className="text-[10px] font-mono bg-[#0d1117] border border-teal/30 rounded px-2 py-1 text-foreground/70 focus:outline-none focus:border-teal/50"
                >
                  <option value="local">Local Storage</option>
                  <option value="session">Session Only</option>
                  <option value="library">Library</option>
                </select>
              )}
            </div>
            
            {/* Right: History dropdown + Inject button */}
            <div className="flex items-center gap-2">
              {/* History Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  disabled={history.length === 0}
                  className="px-3 py-1.5 text-[10px] font-mono text-teal border border-teal/30 rounded hover:bg-teal/10 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1"
                >
                  <span>HISTORY</span>
                  <span className="text-teal/50">({history.length})</span>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Dropdown Menu */}
                {showHistory && history.length > 0 && (
                  <div className="absolute bottom-full right-0 mb-1 w-64 bg-[#0d1117] border border-teal/30 rounded shadow-lg z-50 max-h-48 overflow-y-auto">
                    {history.slice(0, 5).map((entry, idx) => (
                      <button
                        key={entry.id}
                        onClick={() => loadFromHistory(entry)}
                        className="w-full text-left px-3 py-2 hover:bg-teal/10 border-b border-teal/10 last:border-b-0 transition-colors"
                      >
                        <div className="text-[10px] font-mono text-foreground/80 truncate">
                          {entry.label}
                        </div>
                        <div className="text-[9px] text-muted-foreground mt-0.5">
                          {new Date(entry.timestamp).toLocaleString()}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Inject Button */}
              <button
                onClick={handleInject}
                disabled={isProcessing || !input.trim()}
                className="px-4 py-1.5 bg-gold/20 border border-gold/50 rounded text-xs font-mono text-gold hover:bg-gold/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                {isProcessing ? 'INJECTING...' : 'INJECT'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
