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
  const [history, setHistory] = useState&lt;OracleEntry[]&gt;([])
  const [libraryItems, setLibraryItems] = useState&lt;OracleEntry[]&gt;([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [historyPage, setHistoryPage] = useState(0)
  const [showResponse, setShowResponse] = useState(false)
  const [lastInjection, setLastInjection] = useState&lt;OracleEntry | null&gt;(null)
  const [saveEnabled, setSaveEnabled] = useState(true)
  const [saveLocation, setSaveLocation] = useState&lt;StorageLocation&gt;("local")
  const [mounted, setMounted] = useState(false)
  
  // CREATE vs RAW mode
  const [createMode, setCreateMode] = useState(true)
  
  // Action results
  const [actionResult, setActionResult] = useState&lt;ActionResult | null&gt;(null)
  
  // Canvas modal
  const [showCanvas, setShowCanvas] = useState(false)
  
  const historyRef = useRef&lt;HTMLDivElement&gt;(null)

  // Load persisted data on mount
  useEffect(() =&gt; {
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
  const persistHistory = (newHistory: OracleEntry[]) =&gt; {
    setHistory(newHistory)
    localStorage.setItem('oracle-inject-history', JSON.stringify(newHistory))
  }

  const persistLibrary = (newLibrary: OracleEntry[]) =&gt; {
    setLibraryItems(newLibrary)
    localStorage.setItem('oracle-inject-library', JSON.stringify(newLibrary))
  }

  const saveEntry = (entry: OracleEntry) =&gt; {
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

  const handleInject = () =&gt; {
    if (!input.trim()) return
    
    setIsProcessing(true)
    
    setTimeout(() =&gt; {
      const timestamp = new Date().toISOString()
      const entry: OracleEntry = {
        id: Date.now().toString(),
        timestamp,
        input,
        label: input.substring(0, 50) + (input.length &gt; 50 ? '...' : ''),
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

  const loadFromHistory = (entry: OracleEntry) =&gt; {
    setInput(entry.input)
    setShowHistory(false)
  }

  const copyToClipboard = async (text: string): Promise&lt;boolean&gt; =&gt; {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch (e) {
      console.error('Clipboard copy failed:', e)
      return false
    }
  }

  // ACTION HANDLERS
  const handleRunMarketWatch = async () =&gt; {
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

  const handleCreateAnalysis = async () =&gt; {
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

  const handleScoreCREATE = async () =&gt; {
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

  const handleExpandCanvas = () =&gt; {
    setShowCanvas(true)
  }

  const clearHistory = () =&gt; {
    setHistory([])
    localStorage.removeItem('oracle-inject-history')
    sessionStorage.removeItem('oracle-inject-session')
    setShowHistory(false)
  }

  const clearLibrary = () =&gt; {
    setLibraryItems([])
    localStorage.removeItem('oracle-inject-library')
  }

  const toggleMode = () =&gt; {
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
    &lt;&gt;
      &lt;section className="w-full bg-[#0a0a0f] border-t border-teal/20"&gt;
        &lt;div className="max-w-7xl mx-auto px-4 md:px-6 py-4"&gt;
          {/* ORACLE Header */}
          &lt;div className="flex items-center justify-between mb-3"&gt;
            &lt;div className="flex items-center gap-2"&gt;
              &lt;div className="w-2 h-2 rounded-full bg-gold animate-pulse" /&gt;
              &lt;h2 className="text-sm font-mono text-gold tracking-[0.3em]"&gt;ORACLE&lt;/h2&gt;
              &lt;span className="text-[10px] text-muted-foreground ml-2"&gt;Data Injection Protocol&lt;/span&gt;
            &lt;/div&gt;
            &lt;div className="flex items-center gap-3"&gt;
              {/* CREATE/RAW Mode Toggle */}
              &lt;div className="flex items-center gap-2"&gt;
                &lt;button
                  onClick={toggleMode}
                  className={`relative w-10 h-5 rounded-full transition-colors ${createMode ? 'bg-teal/30' : 'bg-gray-600/30'}`}
                  title={createMode ? "CREATE Mode: Full framework with learning support" : "RAW Mode: Manual injection, no guidance"}
                &gt;
                  &lt;div className={`absolute top-0.5 w-4 h-4 rounded-full transition-all ${createMode ? 'left-5 bg-teal' : 'left-0.5 bg-gray-400'}`} /&gt;
                &lt;/button&gt;
                &lt;span className={`text-[9px] font-mono ${createMode ? 'text-teal' : 'text-gray-400'}`}&gt;
                  {createMode ? 'CREATE' : 'RAW'}
                &lt;/span&gt;
              &lt;/div&gt;
              {libraryItems.length &gt; 0 &amp;&amp; (
                &lt;button
                  onClick={clearLibrary}
                  className="text-[9px] font-mono text-red-400/50 hover:text-red-400 transition-colors"
                &gt;
                  CLEAR LIBRARY ({libraryItems.length})
                &lt;/button&gt;
              )}
            &lt;/div&gt;
          &lt;/div&gt;
          
          {/* Mode Explanation */}
          &lt;div className={`mb-3 text-[9px] font-mono px-3 py-1.5 rounded border transition-all ${createMode ? 'bg-teal/5 border-teal/20 text-teal/70' : 'bg-gray-500/5 border-gray-500/20 text-gray-400'}`}&gt;
            {createMode ? (
              &lt;&gt;📚 &lt;strong&gt;CREATE MODE:&lt;/strong&gt; Full METATRON protocol integration. Actions generate structured prompts with learning support, confidence intervals, and framework scoring.&lt;/&gt;
            ) : (
              &lt;&gt;⚡ &lt;strong&gt;RAW MODE:&lt;/strong&gt; Manual injection without framework guidance. You control the output. No scaffolding, no training wheels.&lt;/&gt;
            )}
          &lt;/div&gt;
          
          {/* Main Container */}
          &lt;div className="border border-teal/30 rounded-lg p-4 bg-[#0a0a0f]/80"&gt;
            {/* INPUT Label */}
            &lt;div className="text-xs font-mono text-teal/70 mb-2 tracking-wider"&gt;INPUT&lt;/div&gt;
            
            {/* Input Field - Scrollable */}
            &lt;textarea
              value={input}
              onChange={(e) =&gt; setInput(e.target.value)}
              placeholder="Paste news, 13F filings, analyst reports, SMS alerts..."
              className="w-full h-28 bg-[#0d1117] border border-teal/20 rounded px-3 py-2 text-sm font-mono text-foreground/90 placeholder:text-muted-foreground/40 focus:border-teal/50 focus:outline-none resize-y overflow-auto"
              style={{ minHeight: '80px', maxHeight: '300px' }}
            /&gt;
            
            {/* Bottom Row: Save options + Actions */}
            &lt;div className="mt-3 flex items-center justify-between flex-wrap gap-2"&gt;
              {/* Left: Save checkbox + location dropdown */}
              &lt;div className="flex items-center gap-4"&gt;
                &lt;label className="flex items-center gap-2 cursor-pointer"&gt;
                  &lt;input
                    type="checkbox"
                    checked={saveEnabled}
                    onChange={(e) =&gt; setSaveEnabled(e.target.checked)}
                    className="w-3 h-3 accent-teal"
                  /&gt;
                  &lt;span className="text-[10px] font-mono text-foreground/60"&gt;SAVE&lt;/span&gt;
                &lt;/label&gt;
                
                {saveEnabled &amp;&amp; (
                  &lt;select
                    value={saveLocation}
                    onChange={(e) =&gt; setSaveLocation(e.target.value as StorageLocation)}
                    className="text-[10px] font-mono bg-[#0d1117] border border-teal/30 rounded px-2 py-1 text-foreground/70 focus:outline-none focus:border-teal/50"
                  &gt;
                    &lt;option value="local"&gt;Local Storage&lt;/option&gt;
                    &lt;option value="session"&gt;Session Only&lt;/option&gt;
                    &lt;option value="library"&gt;Library (Permanent)&lt;/option&gt;
                  &lt;/select&gt;
                )}
              &lt;/div&gt;
              
              {/* Right: History dropdown + Action buttons */}
              &lt;div className="flex items-center gap-2"&gt;
                {/* History Dropdown */}
                &lt;div className="relative"&gt;
                  &lt;button
                    onClick={() =&gt; setShowHistory(!showHistory)}
                    disabled={history.length === 0}
                    className="px-3 py-1.5 text-[10px] font-mono text-teal border border-teal/30 rounded hover:bg-teal/10 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1"
                  &gt;
                    &lt;span&gt;HISTORY&lt;/span&gt;
                    &lt;span className="text-teal/50"&gt;({history.length})&lt;/span&gt;
                    &lt;svg className={`w-3 h-3 transition-transform ${showHistory ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"&gt;
                      &lt;path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /&gt;
                    &lt;/svg&gt;
                  &lt;/button&gt;
                  
                  {/* Dropdown Menu with Scroll */}
                  {showHistory &amp;&amp; history.length &gt; 0 &amp;&amp; (
                    &lt;div 
                      ref={historyRef}
                      className="absolute bottom-full right-0 mb-1 w-80 bg-[#0d1117] border border-teal/30 rounded shadow-lg z-50"
                    &gt;
                      &lt;div className="sticky top-0 bg-[#0d1117] border-b border-teal/20 px-3 py-1.5 flex justify-between items-center"&gt;
                        &lt;span className="text-[9px] font-mono text-teal/60"&gt;
                          INJECTIONS ({historyPage * DISPLAY_HISTORY + 1}-{Math.min((historyPage + 1) * DISPLAY_HISTORY, history.length)} of {history.length})
                        &lt;/span&gt;
                        &lt;button onClick={clearHistory} className="text-[9px] text-red-400/60 hover:text-red-400"&gt;CLEAR ALL&lt;/button&gt;
                      &lt;/div&gt;
                      
                      {/* Scrollable history list */}
                      &lt;div className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-teal/30 scrollbar-track-transparent"&gt;
                        {paginatedHistory.map((entry) =&gt; (
                          &lt;button
                            key={entry.id}
                            onClick={() =&gt; loadFromHistory(entry)}
                            className="w-full text-left px-3 py-2 hover:bg-teal/10 border-b border-teal/10 last:border-b-0 transition-colors"
                          &gt;
                            &lt;div className="flex items-center gap-2"&gt;
                              &lt;span className={`text-[8px] px-1 rounded ${entry.mode === 'CREATE' ? 'bg-teal/20 text-teal' : 'bg-gray-500/20 text-gray-400'}`}&gt;
                                {entry.mode}
                              &lt;/span&gt;
                              &lt;span className="text-[10px] font-mono text-foreground/80 truncate flex-1"&gt;
                                {entry.label}
                              &lt;/span&gt;
                            &lt;/div&gt;
                            &lt;div className="text-[9px] text-muted-foreground mt-0.5"&gt;
                              {new Date(entry.timestamp).toLocaleString()}
                            &lt;/div&gt;
                          &lt;/button&gt;
                        ))}
                      &lt;/div&gt;
                      
                      {/* Pagination */}
                      {totalPages &gt; 1 &amp;&amp; (
                        &lt;div className="sticky bottom-0 bg-[#0d1117] border-t border-teal/20 px-3 py-1.5 flex justify-between items-center"&gt;
                          &lt;button 
                            onClick={() =&gt; setHistoryPage(Math.max(0, historyPage - 1))}
                            disabled={historyPage === 0}
                            className="text-[9px] font-mono text-teal/60 hover:text-teal disabled:opacity-30"
                          &gt;
                            ← PREV
                          &lt;/button&gt;
                          &lt;span className="text-[9px] font-mono text-teal/40"&gt;
                            {historyPage + 1} / {totalPages}
                          &lt;/span&gt;
                          &lt;button 
                            onClick={() =&gt; setHistoryPage(Math.min(totalPages - 1, historyPage + 1))}
                            disabled={historyPage &gt;= totalPages - 1}
                            className="text-[9px] font-mono text-teal/60 hover:text-teal disabled:opacity-30"
                          &gt;
                            NEXT →
                          &lt;/button&gt;
                        &lt;/div&gt;
                      )}
                    &lt;/div&gt;
                  )}
                &lt;/div&gt;
                
                {/* Inject Button */}
                &lt;button
                  onClick={handleInject}
                  disabled={isProcessing || !input.trim()}
                  className="px-4 py-1.5 bg-gold/20 border border-gold/50 rounded text-xs font-mono text-gold hover:bg-gold/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                &gt;
                  {isProcessing ? 'INJECTING...' : 'INJECT'}
                &lt;/button&gt;
              &lt;/div&gt;
            &lt;/div&gt;
            
            {/* Response Preview Area */}
            {showResponse &amp;&amp; lastInjection &amp;&amp; (
              &lt;div className="mt-4 border-t border-teal/20 pt-4"&gt;
                &lt;div className="flex items-center justify-between mb-2"&gt;
                  &lt;div className="flex items-center gap-2"&gt;
                    &lt;span className="text-xs font-mono text-teal/70 tracking-wider"&gt;INJECTION PREVIEW&lt;/span&gt;
                    &lt;span className={`text-[8px] px-1.5 py-0.5 rounded ${lastInjection.mode === 'CREATE' ? 'bg-teal/20 text-teal' : 'bg-gray-500/20 text-gray-400'}`}&gt;
                      {lastInjection.mode}
                    &lt;/span&gt;
                  &lt;/div&gt;
                  &lt;div className="flex items-center gap-2"&gt;
                    &lt;button
                      onClick={() =&gt; copyToClipboard(lastInjection.input)}
                      className="text-[9px] font-mono text-teal/60 hover:text-teal border border-teal/30 px-2 py-0.5 rounded transition-colors"
                    &gt;
                      COPY
                    &lt;/button&gt;
                    &lt;button
                      onClick={() =&gt; {
                        setShowResponse(false)
                        localStorage.removeItem('oracle-inject-last')
                      }}
                      className="text-[9px] font-mono text-teal/60 hover:text-teal border border-teal/30 px-2 py-0.5 rounded transition-colors"
                    &gt;
                      COLLAPSE
                    &lt;/button&gt;
                  &lt;/div&gt;
                &lt;/div&gt;
                
                {/* Scrollable preview */}
                &lt;div className="bg-[#0d1117] border border-teal/20 rounded p-3 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-teal/30 scrollbar-track-transparent"&gt;
                  &lt;pre className="text-[11px] font-mono text-foreground/80 whitespace-pre-wrap break-words"&gt;
                    {lastInjection.input}
                  &lt;/pre&gt;
                &lt;/div&gt;
                
                &lt;div className="mt-2 text-[9px] font-mono text-muted-foreground"&gt;
                  Injected: {new Date(lastInjection.timestamp).toLocaleString()} | {lastInjection.input.length} chars | Saved to: {saveLocation.toUpperCase()}
                &lt;/div&gt;
                
                {/* Action Buttons - Only show in CREATE mode */}
                {createMode &amp;&amp; (
                  &lt;div className="mt-3 flex items-center gap-2 flex-wrap"&gt;
                    &lt;span className="text-[9px] font-mono text-teal/50"&gt;ACTIONS:&lt;/span&gt;
                    &lt;button 
                      onClick={handleRunMarketWatch}
                      className="text-[9px] font-mono text-gold/70 hover:text-gold border border-gold/30 px-2 py-1 rounded transition-colors hover:bg-gold/10"
                    &gt;
                      RUN MARKET WATCH
                    &lt;/button&gt;
                    &lt;button 
                      onClick={handleCreateAnalysis}
                      className="text-[9px] font-mono text-teal/70 hover:text-teal border border-teal/30 px-2 py-1 rounded transition-colors hover:bg-teal/10"
                    &gt;
                      CREATE ANALYSIS
                    &lt;/button&gt;
                    &lt;button 
                      onClick={handleScoreCREATE}
                      className="text-[9px] font-mono text-cyan-400/70 hover:text-cyan-400 border border-cyan-400/30 px-2 py-1 rounded transition-colors hover:bg-cyan-400/10"
                    &gt;
                      SCORE (CREATE)
                    &lt;/button&gt;
                    &lt;button 
                      onClick={handleExpandCanvas}
                      className="text-[9px] font-mono text-purple-400/70 hover:text-purple-400 border border-purple-400/30 px-2 py-1 rounded transition-colors hover:bg-purple-400/10"
                    &gt;
                      EXPAND CANVAS
                    &lt;/button&gt;
                  &lt;/div&gt;
                )}
                
                {/* RAW mode - simple copy only */}
                {!createMode &amp;&amp; (
                  &lt;div className="mt-3 flex items-center gap-2"&gt;
                    &lt;span className="text-[9px] font-mono text-gray-500"&gt;RAW MODE:&lt;/span&gt;
                    &lt;button 
                      onClick={() =&gt; copyToClipboard(`ORACLE INJECT:\n${lastInjection.input}`)}
                      className="text-[9px] font-mono text-gray-400 hover:text-white border border-gray-500/30 px-2 py-1 rounded transition-colors hover:bg-gray-500/10"
                    &gt;
                      COPY WITH PREFIX
                    &lt;/button&gt;
                  &lt;/div&gt;
                )}
                
                {/* Action Result Feedback */}
                {actionResult &amp;&amp; (
                  &lt;div className="mt-3 p-3 bg-green-500/10 border border-green-500/30 rounded"&gt;
                    &lt;div className="flex items-center justify-between mb-2"&gt;
                      &lt;span className="text-[10px] font-mono text-green-400"&gt;
                        ✓ {actionResult.action} {actionResult.copied ? '— COPIED TO CLIPBOARD' : '— READY'}
                      &lt;/span&gt;
                      &lt;span className="text-[9px] text-green-400/60"&gt;
                        {new Date(actionResult.timestamp).toLocaleTimeString()}
                      &lt;/span&gt;
                    &lt;/div&gt;
                    &lt;div className="text-[9px] font-mono text-green-400/70"&gt;
                      Paste into Claude to execute. Command includes METATRON gates and AIORA risk framework.
                    &lt;/div&gt;
                    &lt;button
                      onClick={() =&gt; copyToClipboard(actionResult.content)}
                      className="mt-2 text-[9px] font-mono text-green-400 border border-green-500/40 px-2 py-1 rounded hover:bg-green-500/20 transition-colors"
                    &gt;
                      COPY AGAIN
                    &lt;/button&gt;
                  &lt;/div&gt;
                )}
              &lt;/div&gt;
            )}
          &lt;/div&gt;
          
          {/* Footer hint */}
          &lt;div className="mt-2 text-[9px] text-muted-foreground/50 font-mono"&gt;
            Triggers: &lt;code className="text-gold/60"&gt;ORACLE INJECT:&lt;/code&gt; prefix | &lt;code className="text-gold/60"&gt;MARKET WATCH&lt;/code&gt; full protocol | &lt;code className="text-gold/60"&gt;SCAN&lt;/code&gt; quick analysis
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/section&gt;
      
      {/* EXPAND CANVAS Modal */}
      {showCanvas &amp;&amp; lastInjection &amp;&amp; (
        &lt;div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"&gt;
          &lt;div className="bg-[#0a0a0f] border border-teal/30 rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col"&gt;
            {/* Canvas Header */}
            &lt;div className="flex items-center justify-between px-4 py-3 border-b border-teal/20"&gt;
              &lt;div className="flex items-center gap-2"&gt;
                &lt;div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" /&gt;
                &lt;span className="text-sm font-mono text-purple-400 tracking-wider"&gt;EXPANDED CANVAS&lt;/span&gt;
                &lt;span className={`text-[8px] px-1.5 py-0.5 rounded ${lastInjection.mode === 'CREATE' ? 'bg-teal/20 text-teal' : 'bg-gray-500/20 text-gray-400'}`}&gt;
                  {lastInjection.mode}
                &lt;/span&gt;
              &lt;/div&gt;
              &lt;button
                onClick={() =&gt; setShowCanvas(false)}
                className="text-[10px] font-mono text-red-400/70 hover:text-red-400 border border-red-400/30 px-3 py-1 rounded transition-colors"
              &gt;
                CLOSE [ESC]
              &lt;/button&gt;
            &lt;/div&gt;
            
            {/* Canvas Content - Scrollable */}
            &lt;div className="flex-1 overflow-y-auto p-4"&gt;
              {/* Injection Data */}
              &lt;div className="mb-4"&gt;
                &lt;div className="text-xs font-mono text-teal/60 mb-2"&gt;INJECTION DATA&lt;/div&gt;
                &lt;pre className="bg-[#0d1117] border border-teal/20 rounded p-4 text-sm font-mono text-foreground/90 whitespace-pre-wrap break-words overflow-x-auto"&gt;
                  {lastInjection.input}
                &lt;/pre&gt;
              &lt;/div&gt;
              
              {/* Metadata */}
              &lt;div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4"&gt;
                &lt;div className="bg-[#0d1117] border border-teal/20 rounded p-3"&gt;
                  &lt;div className="text-[9px] font-mono text-teal/50 mb-1"&gt;TIMESTAMP&lt;/div&gt;
                  &lt;div className="text-xs font-mono text-foreground/80"&gt;{new Date(lastInjection.timestamp).toLocaleString()}&lt;/div&gt;
                &lt;/div&gt;
                &lt;div className="bg-[#0d1117] border border-teal/20 rounded p-3"&gt;
                  &lt;div className="text-[9px] font-mono text-teal/50 mb-1"&gt;CHARACTERS&lt;/div&gt;
                  &lt;div className="text-xs font-mono text-foreground/80"&gt;{lastInjection.input.length}&lt;/div&gt;
                &lt;/div&gt;
                &lt;div className="bg-[#0d1117] border border-teal/20 rounded p-3"&gt;
                  &lt;div className="text-[9px] font-mono text-teal/50 mb-1"&gt;WORDS&lt;/div&gt;
                  &lt;div className="text-xs font-mono text-foreground/80"&gt;{lastInjection.input.split(/\s+/).filter(Boolean).length}&lt;/div&gt;
                &lt;/div&gt;
                &lt;div className="bg-[#0d1117] border border-teal/20 rounded p-3"&gt;
                  &lt;div className="text-[9px] font-mono text-teal/50 mb-1"&gt;MODE&lt;/div&gt;
                  &lt;div className="text-xs font-mono text-foreground/80"&gt;{lastInjection.mode}&lt;/div&gt;
                &lt;/div&gt;
              &lt;/div&gt;
              
              {/* Quick Actions in Canvas */}
              {createMode &amp;&amp; (
                &lt;div className="flex flex-wrap gap-2"&gt;
                  &lt;button 
                    onClick={handleRunMarketWatch}
                    className="text-xs font-mono text-gold hover:text-gold border border-gold/40 px-4 py-2 rounded transition-colors hover:bg-gold/10"
                  &gt;
                    🎯 RUN MARKET WATCH
                  &lt;/button&gt;
                  &lt;button 
                    onClick={handleCreateAnalysis}
                    className="text-xs font-mono text-teal hover:text-teal border border-teal/40 px-4 py-2 rounded transition-colors hover:bg-teal/10"
                  &gt;
                    📊 CREATE ANALYSIS
                  &lt;/button&gt;
                  &lt;button 
                    onClick={handleScoreCREATE}
                    className="text-xs font-mono text-cyan-400 hover:text-cyan-400 border border-cyan-400/40 px-4 py-2 rounded transition-colors hover:bg-cyan-400/10"
                  &gt;
                    📝 SCORE (CREATE)
                  &lt;/button&gt;
                  &lt;button 
                    onClick={() =&gt; copyToClipboard(lastInjection.input)}
                    className="text-xs font-mono text-white/70 hover:text-white border border-white/30 px-4 py-2 rounded transition-colors hover:bg-white/10"
                  &gt;
                    📋 COPY RAW
                  &lt;/button&gt;
                &lt;/div&gt;
              )}
            &lt;/div&gt;
            
            {/* Action Result in Canvas */}
            {actionResult &amp;&amp; (
              &lt;div className="border-t border-teal/20 p-4 bg-green-500/5"&gt;
                &lt;div className="flex items-center gap-2 mb-2"&gt;
                  &lt;span className="text-[10px] font-mono text-green-400"&gt;✓ {actionResult.action} COPIED&lt;/span&gt;
                &lt;/div&gt;
                &lt;div className="bg-[#0d1117] border border-green-500/30 rounded p-3 max-h-32 overflow-y-auto"&gt;
                  &lt;pre className="text-[10px] font-mono text-green-400/70 whitespace-pre-wrap"&gt;
                    {actionResult.content.substring(0, 500)}...
                  &lt;/pre&gt;
                &lt;/div&gt;
              &lt;/div&gt;
            )}
          &lt;/div&gt;
        &lt;/div&gt;
      )}
    &lt;/&gt;
  )
}
