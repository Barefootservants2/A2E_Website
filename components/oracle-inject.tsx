"use client"

import { useState, useEffect } from "react"

interface OracleEntry {
  id: string
  timestamp: string
  input: string
  label: string
}

type StorageLocation = "local" | "session" | "library"

export function OracleInject() {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<OracleEntry[]>([])
  const [libraryItems, setLibraryItems] = useState<OracleEntry[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [showResponse, setShowResponse] = useState(false)
  const [lastInjection, setLastInjection] = useState<OracleEntry | null>(null)
  const [saveEnabled, setSaveEnabled] = useState(true)
  const [saveLocation, setSaveLocation] = useState<StorageLocation>("local")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Load from localStorage (persistent history)
    const savedHistory = localStorage.getItem('oracle-inject-history')
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory))
      } catch (e) {
        console.error('Failed to load Oracle history:', e)
      }
    }
    // Load library items
    const savedLibrary = localStorage.getItem('oracle-inject-library')
    if (savedLibrary) {
      try {
        setLibraryItems(JSON.parse(savedLibrary))
      } catch (e) {
        console.error('Failed to load Oracle library:', e)
      }
    }
  }, [])

  const saveEntry = (entry: OracleEntry) => {
    if (!saveEnabled) return
    
    switch (saveLocation) {
      case "local":
        // Persistent localStorage - survives browser close
        const updatedHistory = [entry, ...history].slice(0, 50)
        setHistory(updatedHistory)
        localStorage.setItem('oracle-inject-history', JSON.stringify(updatedHistory))
        break
      case "session":
        // Session only - cleared on browser close
        const updatedSession = [entry, ...history].slice(0, 50)
        setHistory(updatedSession)
        sessionStorage.setItem('oracle-inject-session', JSON.stringify(updatedSession))
        break
      case "library":
        // Permanent library - named saves
        const updatedLibrary = [entry, ...libraryItems].slice(0, 100)
        setLibraryItems(updatedLibrary)
        localStorage.setItem('oracle-inject-library', JSON.stringify(updatedLibrary))
        // Also add to history for quick access
        const historyUpdate = [entry, ...history].slice(0, 50)
        setHistory(historyUpdate)
        localStorage.setItem('oracle-inject-history', JSON.stringify(historyUpdate))
        break
    }
  }

  const handleInject = () => {
    if (!input.trim()) return
    
    setIsProcessing(true)
    
    setTimeout(() => {
      const timestamp = new Date().toISOString()
      const entry: OracleEntry = {
        id: Date.now().toString(),
        timestamp,
        input,
        label: input.substring(0, 40) + (input.length > 40 ? '...' : '')
      }
      
      saveEntry(entry)
      setLastInjection(entry)
      setShowResponse(true)
      setInput("")
      setIsProcessing(false)
    }, 300)
  }

  const loadFromHistory = (entry: OracleEntry) => {
    setInput(entry.input)
    setShowHistory(false)
  }

  const copyToClipboard = () => {
    if (lastInjection) {
      navigator.clipboard.writeText(lastInjection.input)
    }
  }

  const openInCanvas = () => {
    // For now, expand the response area - future: open modal/canvas
    setShowResponse(true)
  }

  const clearHistory = () => {
    setHistory([])
    localStorage.removeItem('oracle-inject-history')
    sessionStorage.removeItem('oracle-inject-session')
  }

  const clearLibrary = () => {
    setLibraryItems([])
    localStorage.removeItem('oracle-inject-library')
  }

  if (!mounted) return null

  return (
    <section className="w-full bg-[#0a0a0f] border-t border-teal/20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
        {/* ORACLE Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <h2 className="text-sm font-mono text-gold tracking-[0.3em]">ORACLE</h2>
            <span className="text-[10px] text-muted-foreground ml-2">Data Injection Protocol</span>
          </div>
          {libraryItems.length > 0 && (
            <button
              onClick={() => clearLibrary()}
              className="text-[9px] font-mono text-red-400/50 hover:text-red-400 transition-colors"
            >
              CLEAR LIBRARY ({libraryItems.length})
            </button>
          )}
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
            className="w-full h-24 bg-[#0d1117] border border-teal/20 rounded px-3 py-2 text-sm font-mono text-foreground/90 placeholder:text-muted-foreground/40 focus:border-teal/50 focus:outline-none resize-none"
          />
          
          {/* Bottom Row: Save options + Actions */}
          <div className="mt-3 flex items-center justify-between flex-wrap gap-2">
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
                  onChange={(e) => setSaveLocation(e.target.value as StorageLocation)}
                  className="text-[10px] font-mono bg-[#0d1117] border border-teal/30 rounded px-2 py-1 text-foreground/70 focus:outline-none focus:border-teal/50"
                >
                  <option value="local">Local Storage</option>
                  <option value="session">Session Only</option>
                  <option value="library">Library (Permanent)</option>
                </select>
              )}
            </div>
            
            {/* Right: History dropdown + Action buttons */}
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
                  <div className="absolute bottom-full right-0 mb-1 w-72 bg-[#0d1117] border border-teal/30 rounded shadow-lg z-50 max-h-56 overflow-y-auto">
                    <div className="sticky top-0 bg-[#0d1117] border-b border-teal/20 px-3 py-1.5 flex justify-between items-center">
                      <span className="text-[9px] font-mono text-teal/60">RECENT INJECTIONS</span>
                      <button onClick={clearHistory} className="text-[9px] text-red-400/60 hover:text-red-400">CLEAR</button>
                    </div>
                    {history.slice(0, 10).map((entry) => (
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
          
          {/* Response Preview Area */}
          {showResponse && lastInjection && (
            <div className="mt-4 border-t border-teal/20 pt-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-mono text-teal/70 tracking-wider">INJECTION PREVIEW</div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="text-[9px] font-mono text-teal/60 hover:text-teal border border-teal/30 px-2 py-0.5 rounded transition-colors"
                  >
                    COPY
                  </button>
                  <button
                    onClick={() => setShowResponse(false)}
                    className="text-[9px] font-mono text-teal/60 hover:text-teal border border-teal/30 px-2 py-0.5 rounded transition-colors"
                  >
                    COLLAPSE
                  </button>
                </div>
              </div>
              <div className="bg-[#0d1117] border border-teal/20 rounded p-3 max-h-40 overflow-y-auto">
                <pre className="text-[11px] font-mono text-foreground/80 whitespace-pre-wrap break-words">
                  {lastInjection.input}
                </pre>
              </div>
              <div className="mt-2 text-[9px] font-mono text-muted-foreground">
                Injected: {new Date(lastInjection.timestamp).toLocaleString()} | 
                {lastInjection.input.length} chars | 
                Saved to: {saveLocation.toUpperCase()}
              </div>
              
              {/* Action Buttons - Workflow Integration */}
              <div className="mt-3 flex items-center gap-2 flex-wrap">
                <span className="text-[9px] font-mono text-teal/50">ACTIONS:</span>
                <button className="text-[9px] font-mono text-gold/70 hover:text-gold border border-gold/30 px-2 py-1 rounded transition-colors">
                  RUN MARKET WATCH
                </button>
                <button className="text-[9px] font-mono text-teal/70 hover:text-teal border border-teal/30 px-2 py-1 rounded transition-colors">
                  CREATE ANALYSIS
                </button>
                <button className="text-[9px] font-mono text-cyan-400/70 hover:text-cyan-400 border border-cyan-400/30 px-2 py-1 rounded transition-colors">
                  SCORE (CAKE)
                </button>
                <button className="text-[9px] font-mono text-purple-400/70 hover:text-purple-400 border border-purple-400/30 px-2 py-1 rounded transition-colors">
                  EXPAND CANVAS
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Footer hint */}
        <div className="mt-2 text-[9px] text-muted-foreground/50 font-mono">
          Triggers: <code className="text-gold/60">ORACLE INJECT:</code> prefix | <code className="text-gold/60">MARKET WATCH</code> full protocol | <code className="text-gold/60">SCAN</code> quick analysis
        </div>
      </div>
    </section>
  )
}
