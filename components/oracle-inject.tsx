"use client"

import { useState, useEffect, useRef } from "react"

interface OracleEntry {
  id: string
  timestamp: string
  input: string
  label: string
  mode: "CREATE" | "RAW"
}

interface ActionResult {
  action: string
  content: string
  timestamp: string
  copied: boolean
}

type StorageLocation = "local" | "session" | "library"

const MAX_HISTORY = 50
const DISPLAY_HISTORY = 10

export function OracleInject() {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<OracleEntry[]>([])
  const [libraryItems, setLibraryItems] = useState<OracleEntry[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [historyPage, setHistoryPage] = useState(0)
  const [showResponse, setShowResponse] = useState(false)
  const [lastInjection, setLastInjection] = useState<OracleEntry | null>(null)
  const [saveEnabled, setSaveEnabled] = useState(true)
  const [saveLocation, setSaveLocation] = useState<StorageLocation>("local")
  const [mounted, setMounted] = useState(false)
  
  // CREATE vs RAW mode
  const [createMode, setCreateMode] = useState(true)
  
  // Action results
  const [actionResult, setActionResult] = useState<ActionResult | null>(null)
  
  // Canvas modal
  const [showCanvas, setShowCanvas] = useState(false)
  
  const historyRef = useRef<HTMLDivElement>(null)

  // Load persisted data on mount
  useEffect(() => {
    setMounted(true)
    
    // Load history from localStorage
    try {
      const savedHistory = localStorage.getItem('oracle-inject-history')
      if (savedHistory) {
        const parsed = JSON.parse(savedHistory)
        setHistory(Array.isArray(parsed) ? parsed : [])
      }
    } catch (e) {
      console.error('Failed to load Oracle history:', e)
    }
    
    // Load library
    try {
      const savedLibrary = localStorage.getItem('oracle-inject-library')
      if (savedLibrary) {
        const parsed = JSON.parse(savedLibrary)
        setLibraryItems(Array.isArray(parsed) ? parsed : [])
      }
    } catch (e) {
      console.error('Failed to load Oracle library:', e)
    }
    
    // Load last injection for persistence across page loads
    try {
      const savedLast = localStorage.getItem('oracle-inject-last')
      if (savedLast) {
        const parsed = JSON.parse(savedLast)
        setLastInjection(parsed)
        setShowResponse(true)
      }
    } catch (e) {
      console.error('Failed to load last injection:', e)
    }
    
    // Load mode preference
    const savedMode = localStorage.getItem('oracle-inject-mode')
    if (savedMode) {
      setCreateMode(savedMode === 'CREATE')
    }
  }, [])

  // Persist history changes
  const persistHistory = (newHistory: OracleEntry[]) => {
    setHistory(newHistory)
    localStorage.setItem('oracle-inject-history', JSON.stringify(newHistory))
  }

  const persistLibrary = (newLibrary: OracleEntry[]) => {
    setLibraryItems(newLibrary)
    localStorage.setItem('oracle-inject-library', JSON.stringify(newLibrary))
  }

  const saveEntry = (entry: OracleEntry) => {
    if (!saveEnabled) return
    
    switch (saveLocation) {
      case "local":
        const updatedHistory = [entry, ...history].slice(0, MAX_HISTORY)
        persistHistory(updatedHistory)
        break
      case "session":
        const updatedSession = [entry, ...history].slice(0, MAX_HISTORY)
        setHistory(updatedSession)
        sessionStorage.setItem('oracle-inject-session', JSON.stringify(updatedSession))
        break
      case "library":
        const updatedLibrary = [entry, ...libraryItems].slice(0, 100)
        persistLibrary(updatedLibrary)
        const historyUpdate = [entry, ...history].slice(0, MAX_HISTORY)
        persistHistory(historyUpdate)
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
        label: input.substring(0, 50) + (input.length > 50 ? '...' : ''),
        mode: createMode ? "CREATE" : "RAW"
      }
      
      saveEntry(entry)
      setLastInjection(entry)
      localStorage.setItem('oracle-inject-last', JSON.stringify(entry))
      setShowResponse(true)
      setActionResult(null)
      setInput("")
      setIsProcessing(false)
    }, 300)
  }

  const loadFromHistory = (entry: OracleEntry) => {
    setInput(entry.input)
    setShowHistory(false)
  }

  const copyToClipboard = async (text: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch (e) {
      console.error('Clipboard copy failed:', e)
      return false
    }
  }

  // ACTION HANDLERS
  const handleRunMarketWatch = async () => {
    if (!lastInjection) return
    
    const command = `MARKET WATCH

ORACLE INJECT:
${lastInjection.input}

---
Run full AIORA protocol. Apply METATRON v7.4 gates. Provide position sizing recommendation.`
    
    const copied = await copyToClipboard(command)
    setActionResult({
      action: "MARKET WATCH",
      content: command,
      timestamp: new Date().toISOString(),
      copied
    })
  }

  const handleCreateAnalysis = async () => {
    if (!lastInjection) return
    
    const command = `CREATE ANALYSIS

**Context:** Market data injection requiring systematic analysis
**Role:** Act as METATRON protocol analyst with AIORA risk framework
**Examples:** Format as: THESIS → EVIDENCE → RISK LEVEL → POSITION TIER
**Audience:** Technical trader familiar with options and position sizing
**Tone:** Direct, analytical, zero placation
**Execution:** Provide structured analysis with confidence intervals

---
DATA:
${lastInjection.input}

---
Analyze using CREATE framework. Score each element 0-2.`
    
    const copied = await copyToClipboard(command)
    setActionResult({
      action: "CREATE ANALYSIS",
      content: command,
      timestamp: new Date().toISOString(),
      copied
    })
  }

  const handleScoreCREATE = async () => {
    if (!lastInjection) return
    
    const command = `SCORE (CREATE)

Rate this injection using the CREATE framework:

**C - Context:** Does it provide sufficient background? (0-2)
**R - Role:** Is the expected perspective clear? (0-2)  
**E - Examples:** Are output expectations defined? (0-2)
**A - Audience:** Is the target reader specified? (0-2)
**T - Tone:** Is the communication style clear? (0-2)
**E - Execution:** Is the deliverable format specified? (0-2)

---
INJECTION TO SCORE:
${lastInjection.input}

---
Provide total score (0-12) with recommendations for improvement.
0-4 = Weak | 5-8 = Adequate | 9-12 = Strong`
    
    const copied = await copyToClipboard(command)
    setActionResult({
      action: "SCORE (CREATE)",
      content: command,
      timestamp: new Date().toISOString(),
      copied
    })
  }

  const handleExpandCanvas = () => {
    setShowCanvas(true)
  }

  const clearHistory = () => {
    setHistory([])
    localStorage.removeItem('oracle-inject-history')
    sessionStorage.removeItem('oracle-inject-session')
    setShowHistory(false)
  }

  const clearLibrary = () => {
    setLibraryItems([])
    localStorage.removeItem('oracle-inject-library')
  }

  const toggleMode = () => {
    const newMode = !createMode
    setCreateMode(newMode)
    localStorage.setItem('oracle-inject-mode', newMode ? 'CREATE' : 'RAW')
  }

  // Pagination
  const totalPages = Math.ceil(history.length / DISPLAY_HISTORY)
  const paginatedHistory = history.slice(
    historyPage * DISPLAY_HISTORY, 
    (historyPage + 1) * DISPLAY_HISTORY
  )

  if (!mounted) return null

  return (
    <>
      <section className="w-full bg-[#0a0a0f] border-t border-teal/20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          {/* ORACLE Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <h2 className="text-sm font-mono text-gold tracking-[0.3em]">ORACLE</h2>
              <span className="text-[10px] text-muted-foreground ml-2">Data Injection Protocol</span>
            </div>
            <div className="flex items-center gap-3">
              {/* CREATE/RAW Mode Toggle */}
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMode}
                  className={`relative w-10 h-5 rounded-full transition-colors ${createMode ? 'bg-teal/30' : 'bg-gray-600/30'}`}
                  title={createMode ? "CREATE Mode: Full framework with learning support" : "RAW Mode: Manual injection, no guidance"}
                >
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full transition-all ${createMode ? 'left-5 bg-teal' : 'left-0.5 bg-gray-400'}`} />
                </button>
                <span className={`text-[9px] font-mono ${createMode ? 'text-teal' : 'text-gray-400'}`}>
                  {createMode ? 'CREATE' : 'RAW'}
                </span>
              </div>
              {libraryItems.length > 0 && (
                <button
                  onClick={clearLibrary}
                  className="text-[9px] font-mono text-red-400/50 hover:text-red-400 transition-colors"
                >
                  CLEAR LIBRARY ({libraryItems.length})
                </button>
              )}
            </div>
          </div>
          
          {/* Mode Explanation */}
          <div className={`mb-3 text-[9px] font-mono px-3 py-1.5 rounded border transition-all ${createMode ? 'bg-teal/5 border-teal/20 text-teal/70' : 'bg-gray-500/5 border-gray-500/20 text-gray-400'}`}>
            {createMode ? (
              <>📚 <strong>CREATE MODE:</strong> Full METATRON protocol integration. Actions generate structured prompts with learning support, confidence intervals, and framework scoring.</>
            ) : (
              <>⚡ <strong>RAW MODE:</strong> Manual injection without framework guidance. You control the output. No scaffolding, no training wheels.</>
            )}
          </div>
          
          {/* Main Container */}
          <div className="border border-teal/30 rounded-lg p-4 bg-[#0a0a0f]/80">
            {/* INPUT Label */}
            <div className="text-xs font-mono text-teal/70 mb-2 tracking-wider">INPUT</div>
            
            {/* Input Field - Scrollable */}
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste news, 13F filings, analyst reports, SMS alerts..."
              className="w-full h-28 bg-[#0d1117] border border-teal/20 rounded px-3 py-2 text-sm font-mono text-foreground/90 placeholder:text-muted-foreground/40 focus:border-teal/50 focus:outline-none resize-y overflow-auto"
              style={{ minHeight: '80px', maxHeight: '300px' }}
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
                    <svg className={`w-3 h-3 transition-transform ${showHistory ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {/* Dropdown Menu with Scroll */}
                  {showHistory && history.length > 0 && (
                    <div 
                      ref={historyRef}
                      className="absolute bottom-full right-0 mb-1 w-80 bg-[#0d1117] border border-teal/30 rounded shadow-lg z-50"
                    >
                      <div className="sticky top-0 bg-[#0d1117] border-b border-teal/20 px-3 py-1.5 flex justify-between items-center">
                        <span className="text-[9px] font-mono text-teal/60">
                          INJECTIONS ({historyPage * DISPLAY_HISTORY + 1}-{Math.min((historyPage + 1) * DISPLAY_HISTORY, history.length)} of {history.length})
                        </span>
                        <button onClick={clearHistory} className="text-[9px] text-red-400/60 hover:text-red-400">CLEAR ALL</button>
                      </div>
                      
                      {/* Scrollable history list */}
                      <div className="max-h-64 overflow-y-auto">
                        {paginatedHistory.map((entry) => (
                          <button
                            key={entry.id}
                            onClick={() => loadFromHistory(entry)}
                            className="w-full text-left px-3 py-2 hover:bg-teal/10 border-b border-teal/10 last:border-b-0 transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <span className={`text-[8px] px-1 rounded ${entry.mode === 'CREATE' ? 'bg-teal/20 text-teal' : 'bg-gray-500/20 text-gray-400'}`}>
                                {entry.mode}
                              </span>
                              <span className="text-[10px] font-mono text-foreground/80 truncate flex-1">
                                {entry.label}
                              </span>
                            </div>
                            <div className="text-[9px] text-muted-foreground mt-0.5">
                              {new Date(entry.timestamp).toLocaleString()}
                            </div>
                          </button>
                        ))}
                      </div>
                      
                      {/* Pagination */}
                      {totalPages > 1 && (
                        <div className="sticky bottom-0 bg-[#0d1117] border-t border-teal/20 px-3 py-1.5 flex justify-between items-center">
                          <button 
                            onClick={() => setHistoryPage(Math.max(0, historyPage - 1))}
                            disabled={historyPage === 0}
                            className="text-[9px] font-mono text-teal/60 hover:text-teal disabled:opacity-30"
                          >
                            ← PREV
                          </button>
                          <span className="text-[9px] font-mono text-teal/40">
                            {historyPage + 1} / {totalPages}
                          </span>
                          <button 
                            onClick={() => setHistoryPage(Math.min(totalPages - 1, historyPage + 1))}
                            disabled={historyPage >= totalPages - 1}
                            className="text-[9px] font-mono text-teal/60 hover:text-teal disabled:opacity-30"
                          >
                            NEXT →
                          </button>
                        </div>
                      )}
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
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-teal/70 tracking-wider">INJECTION PREVIEW</span>
                    <span className={`text-[8px] px-1.5 py-0.5 rounded ${lastInjection.mode === 'CREATE' ? 'bg-teal/20 text-teal' : 'bg-gray-500/20 text-gray-400'}`}>
                      {lastInjection.mode}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyToClipboard(lastInjection.input)}
                      className="text-[9px] font-mono text-teal/60 hover:text-teal border border-teal/30 px-2 py-0.5 rounded transition-colors"
                    >
                      COPY
                    </button>
                    <button
                      onClick={() => {
                        setShowResponse(false)
                        localStorage.removeItem('oracle-inject-last')
                      }}
                      className="text-[9px] font-mono text-teal/60 hover:text-teal border border-teal/30 px-2 py-0.5 rounded transition-colors"
                    >
                      COLLAPSE
                    </button>
                  </div>
                </div>
                
                {/* Scrollable preview */}
                <div className="bg-[#0d1117] border border-teal/20 rounded p-3 max-h-40 overflow-y-auto">
                  <pre className="text-[11px] font-mono text-foreground/80 whitespace-pre-wrap break-words">
                    {lastInjection.input}
                  </pre>
                </div>
                
                <div className="mt-2 text-[9px] font-mono text-muted-foreground">
                  Injected: {new Date(lastInjection.timestamp).toLocaleString()} | {lastInjection.input.length} chars | Saved to: {saveLocation.toUpperCase()}
                </div>
                
                {/* Action Buttons - Only show in CREATE mode */}
                {createMode && (
                  <div className="mt-3 flex items-center gap-2 flex-wrap">
                    <span className="text-[9px] font-mono text-teal/50">ACTIONS:</span>
                    <button 
                      onClick={handleRunMarketWatch}
                      className="text-[9px] font-mono text-gold/70 hover:text-gold border border-gold/30 px-2 py-1 rounded transition-colors hover:bg-gold/10"
                    >
                      RUN MARKET WATCH
                    </button>
                    <button 
                      onClick={handleCreateAnalysis}
                      className="text-[9px] font-mono text-teal/70 hover:text-teal border border-teal/30 px-2 py-1 rounded transition-colors hover:bg-teal/10"
                    >
                      CREATE ANALYSIS
                    </button>
                    <button 
                      onClick={handleScoreCREATE}
                      className="text-[9px] font-mono text-cyan-400/70 hover:text-cyan-400 border border-cyan-400/30 px-2 py-1 rounded transition-colors hover:bg-cyan-400/10"
                    >
                      SCORE (CREATE)
                    </button>
                    <button 
                      onClick={handleExpandCanvas}
                      className="text-[9px] font-mono text-purple-400/70 hover:text-purple-400 border border-purple-400/30 px-2 py-1 rounded transition-colors hover:bg-purple-400/10"
                    >
                      EXPAND CANVAS
                    </button>
                  </div>
                )}
                
                {/* RAW mode - simple copy only */}
                {!createMode && (
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-[9px] font-mono text-gray-500">RAW MODE:</span>
                    <button 
                      onClick={() => copyToClipboard(`ORACLE INJECT:\n${lastInjection.input}`)}
                      className="text-[9px] font-mono text-gray-400 hover:text-white border border-gray-500/30 px-2 py-1 rounded transition-colors hover:bg-gray-500/10"
                    >
                      COPY WITH PREFIX
                    </button>
                  </div>
                )}
                
                {/* Action Result Feedback */}
                {actionResult && (
                  <div className="mt-3 p-3 bg-green-500/10 border border-green-500/30 rounded">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono text-green-400">
                        ✓ {actionResult.action} {actionResult.copied ? '— COPIED TO CLIPBOARD' : '— READY'}
                      </span>
                      <span className="text-[9px] text-green-400/60">
                        {new Date(actionResult.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="text-[9px] font-mono text-green-400/70">
                      Paste into Claude to execute. Command includes METATRON gates and AIORA risk framework.
                    </div>
                    <button
                      onClick={() => copyToClipboard(actionResult.content)}
                      className="mt-2 text-[9px] font-mono text-green-400 border border-green-500/40 px-2 py-1 rounded hover:bg-green-500/20 transition-colors"
                    >
                      COPY AGAIN
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Footer hint */}
          <div className="mt-2 text-[9px] text-muted-foreground/50 font-mono">
            Triggers: <code className="text-gold/60">ORACLE INJECT:</code> prefix | <code className="text-gold/60">MARKET WATCH</code> full protocol | <code className="text-gold/60">SCAN</code> quick analysis
          </div>
        </div>
      </section>
      
      {/* EXPAND CANVAS Modal */}
      {showCanvas && lastInjection && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0a0a0f] border border-teal/30 rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
            {/* Canvas Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-teal/20">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                <span className="text-sm font-mono text-purple-400 tracking-wider">EXPANDED CANVAS</span>
                <span className={`text-[8px] px-1.5 py-0.5 rounded ${lastInjection.mode === 'CREATE' ? 'bg-teal/20 text-teal' : 'bg-gray-500/20 text-gray-400'}`}>
                  {lastInjection.mode}
                </span>
              </div>
              <button
                onClick={() => setShowCanvas(false)}
                className="text-[10px] font-mono text-red-400/70 hover:text-red-400 border border-red-400/30 px-3 py-1 rounded transition-colors"
              >
                CLOSE [ESC]
              </button>
            </div>
            
            {/* Canvas Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* Injection Data */}
              <div className="mb-4">
                <div className="text-xs font-mono text-teal/60 mb-2">INJECTION DATA</div>
                <pre className="bg-[#0d1117] border border-teal/20 rounded p-4 text-sm font-mono text-foreground/90 whitespace-pre-wrap break-words overflow-x-auto">
                  {lastInjection.input}
                </pre>
              </div>
              
              {/* Metadata */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                <div className="bg-[#0d1117] border border-teal/20 rounded p-3">
                  <div className="text-[9px] font-mono text-teal/50 mb-1">TIMESTAMP</div>
                  <div className="text-xs font-mono text-foreground/80">{new Date(lastInjection.timestamp).toLocaleString()}</div>
                </div>
                <div className="bg-[#0d1117] border border-teal/20 rounded p-3">
                  <div className="text-[9px] font-mono text-teal/50 mb-1">CHARACTERS</div>
                  <div className="text-xs font-mono text-foreground/80">{lastInjection.input.length}</div>
                </div>
                <div className="bg-[#0d1117] border border-teal/20 rounded p-3">
                  <div className="text-[9px] font-mono text-teal/50 mb-1">WORDS</div>
                  <div className="text-xs font-mono text-foreground/80">{lastInjection.input.split(/\s+/).filter(Boolean).length}</div>
                </div>
                <div className="bg-[#0d1117] border border-teal/20 rounded p-3">
                  <div className="text-[9px] font-mono text-teal/50 mb-1">MODE</div>
                  <div className="text-xs font-mono text-foreground/80">{lastInjection.mode}</div>
                </div>
              </div>
              
              {/* Quick Actions in Canvas */}
              {createMode && (
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={handleRunMarketWatch}
                    className="text-xs font-mono text-gold hover:text-gold border border-gold/40 px-4 py-2 rounded transition-colors hover:bg-gold/10"
                  >
                    🎯 RUN MARKET WATCH
                  </button>
                  <button 
                    onClick={handleCreateAnalysis}
                    className="text-xs font-mono text-teal hover:text-teal border border-teal/40 px-4 py-2 rounded transition-colors hover:bg-teal/10"
                  >
                    📊 CREATE ANALYSIS
                  </button>
                  <button 
                    onClick={handleScoreCREATE}
                    className="text-xs font-mono text-cyan-400 hover:text-cyan-400 border border-cyan-400/40 px-4 py-2 rounded transition-colors hover:bg-cyan-400/10"
                  >
                    📝 SCORE (CREATE)
                  </button>
                  <button 
                    onClick={() => copyToClipboard(lastInjection.input)}
                    className="text-xs font-mono text-white/70 hover:text-white border border-white/30 px-4 py-2 rounded transition-colors hover:bg-white/10"
                  >
                    📋 COPY RAW
                  </button>
                </div>
              )}
            </div>
            
            {/* Action Result in Canvas */}
            {actionResult && (
              <div className="border-t border-teal/20 p-4 bg-green-500/5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-mono text-green-400">✓ {actionResult.action} COPIED</span>
                </div>
                <div className="bg-[#0d1117] border border-green-500/30 rounded p-3 max-h-32 overflow-y-auto">
                  <pre className="text-[10px] font-mono text-green-400/70 whitespace-pre-wrap">
                    {actionResult.content.substring(0, 500)}...
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
