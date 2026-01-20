"use client"

import { useState, useEffect } from "react"

interface OracleEntry {
  id: string
  timestamp: string
  input: string
  output: string
}

export function OracleInject() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [history, setHistory] = useState<OracleEntry[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [showHistory, setShowHistory] = useState(false)

  // Load history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('oracle-inject-history')
    if (saved) {
      try {
        setHistory(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to load Oracle history:', e)
      }
    }
  }, [])

  // Save history to localStorage
  const saveToHistory = (entry: OracleEntry) => {
    const updated = [entry, ...history].slice(0, 50) // Keep last 50
    setHistory(updated)
    localStorage.setItem('oracle-inject-history', JSON.stringify(updated))
  }

  const handleInject = () => {
    if (!input.trim()) return
    
    setIsProcessing(true)
    
    // Simulate processing (in production, this would call your backend/API)
    setTimeout(() => {
      const processedOutput = `[ORACLE INJECT RECEIVED]\n\nTimestamp: ${new Date().toISOString()}\nData Length: ${input.length} chars\n\n--- INJECTED DATA ---\n${input.substring(0, 500)}${input.length > 500 ? '...[truncated]' : ''}\n\n--- STATUS ---\nData staged for METATRON v7.4 analysis.\nUse MARKET WATCH or ORACLE trigger to process.`
      
      setOutput(processedOutput)
      setIsProcessing(false)
      
      // Save to history
      saveToHistory({
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        input: input,
        output: processedOutput
      })
    }, 800)
  }

  const clearHistory = () => {
    setHistory([])
    localStorage.removeItem('oracle-inject-history')
  }

  const loadFromHistory = (entry: OracleEntry) => {
    setInput(entry.input)
    setOutput(entry.output)
    setShowHistory(false)
  }

  return (
    <section className="w-full px-4 md:px-6 py-4 bg-[#0a0a0f] border-y border-teal/20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <h2 className="text-sm font-mono text-gold tracking-[0.2em]">ORACLE INJECT</h2>
            <span className="text-xs text-muted-foreground/50">External Data Ingestion</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="text-xs text-teal/60 hover:text-teal transition-colors font-mono"
            >
              HISTORY ({history.length})
            </button>
            {history.length > 0 && (
              <button
                onClick={clearHistory}
                className="text-xs text-red-400/60 hover:text-red-400 transition-colors font-mono"
              >
                CLEAR
              </button>
            )}
          </div>
        </div>

        {/* History Dropdown */}
        {showHistory && history.length > 0 && (
          <div className="mb-3 bg-background/50 border border-teal/20 rounded p-2 max-h-40 overflow-y-auto">
            {history.map((entry) => (
              <button
                key={entry.id}
                onClick={() => loadFromHistory(entry)}
                className="w-full text-left px-2 py-1.5 hover:bg-teal/10 rounded transition-colors"
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs text-foreground/70 truncate max-w-[70%]">
                    {entry.input.substring(0, 60)}...
                  </span>
                  <span className="text-[10px] text-muted-foreground font-mono">
                    {new Date(entry.timestamp).toLocaleDateString()}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Input/Output Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {/* Input */}
          <div className="relative">
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-teal/40" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-teal/40" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-teal/40" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-teal/40" />
            
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste external data here (news, 13F filings, analyst reports, SMS alerts)..."
              className="w-full h-20 bg-background/30 border border-teal/20 rounded px-3 py-2 text-xs font-mono text-foreground/80 placeholder:text-muted-foreground/40 focus:border-teal/50 focus:outline-none resize-none"
            />
            
            <button
              onClick={handleInject}
              disabled={isProcessing || !input.trim()}
              className="absolute bottom-2 right-2 px-3 py-1 bg-teal/20 border border-teal/40 rounded text-[10px] font-mono text-teal hover:bg-teal/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              {isProcessing ? 'PROCESSING...' : 'INJECT →'}
            </button>
          </div>

          {/* Output */}
          <div className="relative">
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-gold/40" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-gold/40" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-gold/40" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-gold/40" />
            
            <div className="w-full h-20 bg-background/30 border border-gold/20 rounded px-3 py-2 text-xs font-mono text-foreground/60 overflow-y-auto">
              {output ? (
                <pre className="whitespace-pre-wrap">{output}</pre>
              ) : (
                <span className="text-muted-foreground/40 italic">Output will appear here after injection...</span>
              )}
            </div>
            
            {output && (
              <button
                onClick={() => navigator.clipboard.writeText(output)}
                className="absolute bottom-2 right-2 px-2 py-1 bg-gold/10 border border-gold/30 rounded text-[10px] font-mono text-gold/70 hover:bg-gold/20 transition-all"
              >
                COPY
              </button>
            )}
          </div>
        </div>

        {/* Status Bar */}
        <div className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground/50">
          <span>Triggers: <code className="text-teal/60">ORACLE INJECT:</code> prefix in chat activates full protocol</span>
          <span className="font-mono">Storage: localStorage • {history.length}/50 entries</span>
        </div>
      </div>
    </section>
  )
}
