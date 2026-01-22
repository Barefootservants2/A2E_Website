"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

interface Checkpoint {
  id: string
  timestamp: string
  taskName: string
  progress: number
  context: string
  blockers: string[]
  recoveryPrompt: string
}

const STORAGE_KEY = 'phoenix_checkpoints'

export default function PhoenixPage() {
  const [currentTask, setCurrentTask] = useState("")
  const [progress, setProgress] = useState(50)
  const [context, setContext] = useState("")
  const [blockers, setBlockers] = useState("")
  const [checkpoints, setCheckpoints] = useState&lt;Checkpoint[]&gt;([])
  const [generatedPrompt, setGeneratedPrompt] = useState("")
  const [copied, setCopied] = useState(false)
  const [showHistory, setShowHistory] = useState(false)

  useEffect(() =&gt; {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setCheckpoints(JSON.parse(saved))
    } catch (e) {
      console.error('Failed to load checkpoints:', e)
    }
  }, [])

  const generateRecoveryPrompt = () =&gt; {
    const blockerList = blockers.split('\n').filter(b =&gt; b.trim())
    
    const prompt = `🔥 PHOENIX PROTOCOL — SESSION RECOVERY

**Checkpoint ID:** ${Date.now()}
**Saved:** ${new Date().toISOString()}
**Platform:** Claude AI | Model: Opus 4.5

---

## CONTEXT RESTORATION

**Current Task:** ${currentTask || '[Not specified]'}
**Progress:** ${progress}%
**Status:** In Progress

**Key Context:**
${context || '[No context provided]'}

**Blockers:**
${blockerList.length &gt; 0 ? blockerList.map(b =&gt; `- 🔴 ${b}`).join('\n') : '- None identified'}

---

## RESUME INSTRUCTIONS

Continue from where we left off. Current task: ${currentTask}
Do not ask for context — you have it. Execute.

---

**Principal:** William Earl Lemon — ABSOLUTE
`
    setGeneratedPrompt(prompt)

    // Save checkpoint
    const checkpoint: Checkpoint = {
      id: `chk_${Date.now()}`,
      timestamp: new Date().toISOString(),
      taskName: currentTask,
      progress,
      context,
      blockers: blockerList,
      recoveryPrompt: prompt
    }

    const updated = [checkpoint, ...checkpoints].slice(0, 20)
    setCheckpoints(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }

  const copyToClipboard = () =&gt; {
    navigator.clipboard.writeText(generatedPrompt)
    setCopied(true)
    setTimeout(() =&gt; setCopied(false), 2000)
  }

  const loadCheckpoint = (cp: Checkpoint) =&gt; {
    setCurrentTask(cp.taskName)
    setProgress(cp.progress)
    setContext(cp.context)
    setBlockers(cp.blockers.join('\n'))
    setGeneratedPrompt(cp.recoveryPrompt)
    setShowHistory(false)
  }

  const deleteCheckpoint = (id: string) =&gt; {
    const updated = checkpoints.filter(c =&gt; c.id !== id)
    setCheckpoints(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }

  return (
    &lt;main className="min-h-screen bg-background text-foreground"&gt;
      {/* Header */}
      &lt;div className="bg-[#0a0a0f] border-b border-teal/20 px-6 py-4"&gt;
        &lt;div className="max-w-7xl mx-auto flex items-center justify-between"&gt;
          &lt;Link href="/" className="flex items-center gap-3 group"&gt;
            &lt;div className="relative w-[60px] h-[60px]"&gt;
              &lt;Image src="/images/metatron-logo.png" alt="Logo" fill className="object-contain"
                style={{ filter: 'brightness(1.5) saturate(1.5) drop-shadow(0 0 20px rgba(0,206,209,1))' }} quality={100} /&gt;
              &lt;div className="absolute inset-[-4px] rounded-full border border-teal/50 animate-pulse" style={{ animationDuration: '2s' }} /&gt;
            &lt;/div&gt;
            &lt;span className="text-teal group-hover:text-gold transition-colors"&gt;← Command Center&lt;/span&gt;
          &lt;/Link&gt;
          &lt;div className="flex items-center gap-4"&gt;
            &lt;button onClick={() =&gt; setShowHistory(!showHistory)}
              className="text-xs font-mono text-teal/60 hover:text-teal border border-teal/30 px-3 py-1.5 rounded transition-colors"&gt;
              📜 HISTORY ({checkpoints.length})
            &lt;/button&gt;
            &lt;div className="flex items-center gap-2"&gt;
              &lt;div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" /&gt;
              &lt;span className="text-xs font-mono text-orange-400"&gt;🔥 PHOENIX ACTIVE&lt;/span&gt;
            &lt;/div&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;

      &lt;div className="max-w-7xl mx-auto px-6 py-8"&gt;
        {/* Hero Section */}
        &lt;div className="text-center mb-8"&gt;
          &lt;h1 className="text-4xl font-light text-gold mb-2"&gt;🔥 PHOENIX PROTOCOL&lt;/h1&gt;
          &lt;p className="text-foreground/60"&gt;AI Session Continuity &amp; Recovery System&lt;/p&gt;
          &lt;p className="text-sm text-teal/60 mt-2"&gt;"From the ashes of dead sessions, productivity rises."&lt;/p&gt;
        &lt;/div&gt;

        {/* History Panel */}
        {showHistory &amp;&amp; (
          &lt;div className="mb-6 p-4 bg-[#0d1117] border border-orange-500/30 rounded-lg max-h-80 overflow-y-auto"&gt;
            &lt;div className="flex items-center justify-between mb-4"&gt;
              &lt;span className="text-lg font-mono text-orange-400"&gt;Checkpoint History&lt;/span&gt;
              &lt;button onClick={() =&gt; setShowHistory(false)} className="text-teal/60 hover:text-teal"&gt;✕&lt;/button&gt;
            &lt;/div&gt;
            {checkpoints.length === 0 ? (
              &lt;p className="text-sm text-muted-foreground"&gt;No checkpoints saved yet.&lt;/p&gt;
            ) : (
              &lt;div className="space-y-2"&gt;
                {checkpoints.map(cp =&gt; (
                  &lt;div key={cp.id} className="p-3 bg-background/50 border border-orange-500/20 rounded cursor-pointer hover:border-orange-500/40"
                    onClick={() =&gt; loadCheckpoint(cp)}&gt;
                    &lt;div className="flex items-center justify-between"&gt;
                      &lt;p className="text-sm text-foreground/90"&gt;{cp.taskName || 'Unnamed checkpoint'}&lt;/p&gt;
                      &lt;div className="flex items-center gap-2"&gt;
                        &lt;span className="text-xs font-mono text-orange-400"&gt;{cp.progress}%&lt;/span&gt;
                        &lt;button onClick={(e) =&gt; { e.stopPropagation(); deleteCheckpoint(cp.id); }} 
                          className="text-red-400/50 hover:text-red-400"&gt;🗑️&lt;/button&gt;
                      &lt;/div&gt;
                    &lt;/div&gt;
                    &lt;p className="text-[10px] text-muted-foreground mt-1"&gt;{new Date(cp.timestamp).toLocaleString()}&lt;/p&gt;
                  &lt;/div&gt;
                ))}
              &lt;/div&gt;
            )}
          &lt;/div&gt;
        )}

        &lt;div className="grid lg:grid-cols-2 gap-6"&gt;
          {/* Input Form */}
          &lt;div className="space-y-4"&gt;
            &lt;div className="bg-[#0d1117] border border-orange-500/20 rounded-lg overflow-hidden"&gt;
              &lt;div className="bg-[#0a0a0f] px-4 py-3 border-b border-orange-500/20"&gt;
                &lt;span className="text-sm font-mono text-orange-400"&gt;SESSION STATE CAPTURE&lt;/span&gt;
              &lt;/div&gt;
              &lt;div className="p-4 space-y-4"&gt;
                &lt;div&gt;
                  &lt;label className="text-xs font-mono text-teal/60 block mb-1"&gt;CURRENT TASK&lt;/label&gt;
                  &lt;input type="text" value={currentTask} onChange={(e) =&gt; setCurrentTask(e.target.value)}
                    placeholder="What are you working on?"
                    className="w-full bg-background/50 border border-teal/20 rounded px-3 py-2 text-sm focus:outline-none focus:border-orange-500/50" /&gt;
                &lt;/div&gt;

                &lt;div&gt;
                  &lt;label className="text-xs font-mono text-teal/60 block mb-1"&gt;PROGRESS: {progress}%&lt;/label&gt;
                  &lt;input type="range" min="0" max="100" value={progress} onChange={(e) =&gt; setProgress(Number(e.target.value))}
                    className="w-full accent-orange-500" /&gt;
                &lt;/div&gt;

                &lt;div&gt;
                  &lt;label className="text-xs font-mono text-teal/60 block mb-1"&gt;KEY CONTEXT&lt;/label&gt;
                  &lt;textarea value={context} onChange={(e) =&gt; setContext(e.target.value)}
                    placeholder="Important details, decisions made, domain info..."
                    className="w-full h-24 bg-background/50 border border-teal/20 rounded px-3 py-2 text-sm focus:outline-none focus:border-orange-500/50 resize-y" /&gt;
                &lt;/div&gt;

                &lt;div&gt;
                  &lt;label className="text-xs font-mono text-teal/60 block mb-1"&gt;BLOCKERS (one per line)&lt;/label&gt;
                  &lt;textarea value={blockers} onChange={(e) =&gt; setBlockers(e.target.value)}
                    placeholder="E*TRADE OAuth broken&#10;Waiting for API approval..."
                    className="w-full h-20 bg-background/50 border border-teal/20 rounded px-3 py-2 text-sm focus:outline-none focus:border-orange-500/50 resize-y" /&gt;
                &lt;/div&gt;

                &lt;button onClick={generateRecoveryPrompt}
                  className="w-full py-3 bg-orange-500/20 text-orange-400 border border-orange-500/50 rounded font-mono text-sm hover:bg-orange-500/30 transition-colors"&gt;
                  🔥 GENERATE CHECKPOINT
                &lt;/button&gt;
              &lt;/div&gt;
            &lt;/div&gt;

            {/* Quick Stats */}
            &lt;div className="bg-[#0d1117] border border-teal/20 rounded-lg p-4"&gt;
              &lt;h3 className="text-sm font-mono text-teal mb-3"&gt;PHOENIX BENEFITS&lt;/h3&gt;
              &lt;div className="space-y-2 text-xs text-foreground/60"&gt;
                &lt;div className="flex justify-between"&gt;
                  &lt;span&gt;Avg. context rebuild time&lt;/span&gt;
                  &lt;span className="text-red-400"&gt;15-30 min&lt;/span&gt;
                &lt;/div&gt;
                &lt;div className="flex justify-between"&gt;
                  &lt;span&gt;PHOENIX recovery time&lt;/span&gt;
                  &lt;span className="text-green-400"&gt;&lt;30 sec&lt;/span&gt;
                &lt;/div&gt;
                &lt;div className="flex justify-between"&gt;
                  &lt;span&gt;Daily time saved (power user)&lt;/span&gt;
                  &lt;span className="text-gold"&gt;40+ min&lt;/span&gt;
                &lt;/div&gt;
                &lt;div className="flex justify-between"&gt;
                  &lt;span&gt;Annual productivity saved&lt;/span&gt;
                  &lt;span className="text-gold"&gt;~170 hours&lt;/span&gt;
                &lt;/div&gt;
              &lt;/div&gt;
            &lt;/div&gt;
          &lt;/div&gt;

          {/* Output */}
          &lt;div className="space-y-4"&gt;
            &lt;div className="bg-[#0d1117] border border-orange-500/20 rounded-lg overflow-hidden"&gt;
              &lt;div className="bg-[#0a0a0f] px-4 py-3 border-b border-orange-500/20 flex items-center justify-between"&gt;
                &lt;span className="text-sm font-mono text-orange-400"&gt;RECOVERY PROMPT&lt;/span&gt;
                {generatedPrompt &amp;&amp; (
                  &lt;button onClick={copyToClipboard}
                    className={`px-3 py-1 text-xs font-mono rounded border transition-colors ${copied ? 'bg-green-500/20 border-green-500/50 text-green-400' : 'border-teal/30 text-teal/60 hover:text-teal'}`}&gt;
                    {copied ? '✓ COPIED' : '📋 COPY'}
                  &lt;/button&gt;
                )}
              &lt;/div&gt;
              &lt;div className="p-4 min-h-[300px]"&gt;
                {generatedPrompt ? (
                  &lt;pre className="text-xs font-mono text-foreground/80 whitespace-pre-wrap"&gt;{generatedPrompt}&lt;/pre&gt;
                ) : (
                  &lt;div className="flex items-center justify-center h-full text-muted-foreground/40"&gt;
                    &lt;p&gt;Fill in the form and click GENERATE CHECKPOINT&lt;/p&gt;
                  &lt;/div&gt;
                )}
              &lt;/div&gt;
            &lt;/div&gt;

            {/* Instructions */}
            &lt;div className="bg-[#0d1117] border border-teal/20 rounded-lg p-4"&gt;
              &lt;h3 className="text-sm font-mono text-teal mb-3"&gt;HOW TO USE&lt;/h3&gt;
              &lt;ol className="text-xs text-foreground/60 space-y-2"&gt;
                &lt;li&gt;1. Fill in your current task and context&lt;/li&gt;
                &lt;li&gt;2. Click "Generate Checkpoint"&lt;/li&gt;
                &lt;li&gt;3. Copy the recovery prompt&lt;/li&gt;
                &lt;li&gt;4. When session dies, paste into new chat&lt;/li&gt;
                &lt;li&gt;5. AI resumes exactly where you left off&lt;/li&gt;
              &lt;/ol&gt;
            &lt;/div&gt;

            {/* Model Compatibility */}
            &lt;div className="bg-[#0d1117] border border-teal/20 rounded-lg p-4"&gt;
              &lt;h3 className="text-sm font-mono text-teal mb-3"&gt;WORKS WITH&lt;/h3&gt;
              &lt;div className="flex flex-wrap gap-2"&gt;
                {['Claude', 'ChatGPT', 'Gemini', 'Grok', 'DeepSeek', 'Ollama', 'MagAI'].map(model =&gt; (
                  &lt;span key={model} className="text-[10px] px-2 py-1 bg-teal/10 text-teal/70 rounded"&gt;{model}&lt;/span&gt;
                ))}
              &lt;/div&gt;
            &lt;/div&gt;
          &lt;/div&gt;
        &lt;/div&gt;

        {/* Pricing Teaser */}
        &lt;div className="mt-12 text-center"&gt;
          &lt;h2 className="text-xl font-mono text-gold mb-4"&gt;COMING SOON: PHOENIX PRO&lt;/h2&gt;
          &lt;div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto"&gt;
            &lt;div className="bg-[#0d1117] border border-teal/20 rounded-lg p-4"&gt;
              &lt;h3 className="text-lg font-mono text-teal"&gt;FREE&lt;/h3&gt;
              &lt;p className="text-2xl font-light text-gold my-2"&gt;$0&lt;/p&gt;
              &lt;ul className="text-xs text-foreground/60 space-y-1"&gt;
                &lt;li&gt;✓ Manual checkpoints&lt;/li&gt;
                &lt;li&gt;✓ Local storage&lt;/li&gt;
                &lt;li&gt;✓ 5 saved checkpoints&lt;/li&gt;
              &lt;/ul&gt;
            &lt;/div&gt;
            &lt;div className="bg-[#0d1117] border border-orange-500/30 rounded-lg p-4 relative"&gt;
              &lt;div className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-orange-500 text-[10px] text-black font-bold rounded"&gt;POPULAR&lt;/div&gt;
              &lt;h3 className="text-lg font-mono text-orange-400"&gt;PRO&lt;/h3&gt;
              &lt;p className="text-2xl font-light text-gold my-2"&gt;$9/mo&lt;/p&gt;
              &lt;ul className="text-xs text-foreground/60 space-y-1"&gt;
                &lt;li&gt;✓ Auto-checkpoints&lt;/li&gt;
                &lt;li&gt;✓ Cloud sync&lt;/li&gt;
                &lt;li&gt;✓ Unlimited history&lt;/li&gt;
                &lt;li&gt;✓ Browser extension&lt;/li&gt;
              &lt;/ul&gt;
            &lt;/div&gt;
            &lt;div className="bg-[#0d1117] border border-teal/20 rounded-lg p-4"&gt;
              &lt;h3 className="text-lg font-mono text-teal"&gt;TEAM&lt;/h3&gt;
              &lt;p className="text-2xl font-light text-gold my-2"&gt;$29/mo&lt;/p&gt;
              &lt;ul className="text-xs text-foreground/60 space-y-1"&gt;
                &lt;li&gt;✓ 5 team members&lt;/li&gt;
                &lt;li&gt;✓ Shared checkpoints&lt;/li&gt;
                &lt;li&gt;✓ Admin dashboard&lt;/li&gt;
                &lt;li&gt;✓ Priority support&lt;/li&gt;
              &lt;/ul&gt;
            &lt;/div&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;

      {/* Footer */}
      &lt;footer className="border-t border-teal/20 py-6 text-center text-sm text-muted-foreground mt-12"&gt;
        &lt;p&gt;© 2026 Ashes2Echoes LLC. PHOENIX Protocol v1.0&lt;/p&gt;
        &lt;p className="text-xs text-foreground/40 mt-1"&gt;Part of the Uriel Covenant AI Collective&lt;/p&gt;
      &lt;/footer&gt;
    &lt;/main&gt;
  )
}
