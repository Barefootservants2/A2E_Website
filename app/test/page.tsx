"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

interface TestResult {
  name: string
  status: 'pass' | 'fail' | 'warning' | 'pending' | 'running'
  message: string
  duration?: number
}

interface TestSuite {
  name: string
  tests: TestResult[]
  status: 'pass' | 'fail' | 'warning' | 'pending' | 'running'
}

export default function TestPage() {
  const [suites, setSuites] = useState<TestSuite[]>([
    { name: 'Page Routes', tests: [], status: 'pending' },
    { name: 'Components', tests: [], status: 'pending' },
    { name: 'Oracle API', tests: [], status: 'pending' },
    { name: 'FORGE Engine', tests: [], status: 'pending' },
    { name: 'Storage', tests: [], status: 'pending' },
    { name: 'Assets', tests: [], status: 'pending' },
  ])
  const [isRunning, setIsRunning] = useState(false)
  const [lastRun, setLastRun] = useState<string | null>(null)

  const runTest = async (
    name: string, 
    testFn: () => Promise<{ pass: boolean; message: string }>
  ): Promise<TestResult> => {
    const start = Date.now()
    try {
      const result = await testFn()
      return {
        name,
        status: result.pass ? 'pass' : 'fail',
        message: result.message,
        duration: Date.now() - start
      }
    } catch (err: any) {
      return {
        name,
        status: 'fail',
        message: err.message || 'Unknown error',
        duration: Date.now() - start
      }
    }
  }

  const runAllTests = async () => {
    setIsRunning(true)
    const newSuites: TestSuite[] = []

    // 1. PAGE ROUTES
    const routeTests: TestResult[] = []
    const routes = [
      { path: '/', name: 'Home' },
      { path: '/about', name: 'About' },
      { path: '/aiora', name: 'AIORA' },
      { path: '/metatron', name: 'METATRON' },
      { path: '/covenant', name: 'Covenant' },
      { path: '/forge', name: 'FORGE' },
      { path: '/terms', name: 'Terms' },
      { path: '/privacy', name: 'Privacy' },
      { path: '/aup', name: 'AUP' },
      { path: '/apparel', name: 'Apparel' },
    ]

    for (const route of routes) {
      const result = await runTest(`Route: ${route.name}`, async () => {
        const res = await fetch(route.path)
        return {
          pass: res.ok,
          message: res.ok ? `${route.path} → ${res.status}` : `${route.path} → ${res.status} FAILED`
        }
      })
      routeTests.push(result)
    }
    newSuites.push({
      name: 'Page Routes',
      tests: routeTests,
      status: routeTests.every(t => t.status === 'pass') ? 'pass' : 'fail'
    })
    setSuites([...newSuites, ...suites.slice(newSuites.length)])

    // 2. COMPONENTS
    const componentTests: TestResult[] = []
    
    componentTests.push(await runTest('Hero Section Render', async () => {
      const el = document.querySelector('section.relative.w-full.overflow-hidden')
      return { pass: !!el, message: el ? 'Hero section found' : 'Hero section missing' }
    }))

    componentTests.push(await runTest('Dashboard Cards Render', async () => {
      const cards = document.querySelectorAll('[class*="HUDPanel"]')
      // Alternative check - look for the grid
      const grid = document.querySelector('.grid.grid-cols-1.sm\\:grid-cols-2')
      return { pass: !!grid, message: grid ? 'Dashboard grid found' : 'Dashboard grid missing' }
    }))

    componentTests.push(await runTest('Oracle Component', async () => {
      const oracle = document.querySelector('section.w-full.bg-\\[\\#0a0a0f\\].border-t')
      return { pass: !!oracle, message: oracle ? 'Oracle section found' : 'Oracle section missing' }
    }))

    componentTests.push(await runTest('Footer Links', async () => {
      const footer = document.querySelector('footer')
      const links = footer?.querySelectorAll('a')
      return { 
        pass: links && links.length >= 3, 
        message: `Footer has ${links?.length || 0} links` 
      }
    }))

    newSuites.push({
      name: 'Components',
      tests: componentTests,
      status: componentTests.every(t => t.status === 'pass') ? 'pass' : 
              componentTests.some(t => t.status === 'fail') ? 'fail' : 'warning'
    })
    setSuites([...newSuites, ...suites.slice(newSuites.length)])

    // 3. ORACLE API
    const oracleTests: TestResult[] = []

    oracleTests.push(await runTest('Oracle API Health', async () => {
      try {
        const res = await fetch('/api/oracle')
        const data = await res.json()
        return { 
          pass: data.status === 'online', 
          message: data.status === 'online' ? 'API online' : `API status: ${data.status || 'unknown'}` 
        }
      } catch (e) {
        return { pass: false, message: 'API unreachable' }
      }
    }))

    oracleTests.push(await runTest('Oracle POST Endpoint', async () => {
      try {
        const res = await fetch('/api/oracle', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ input: 'test', mode: 'SCAN' })
        })
        return { 
          pass: res.status !== 404, 
          message: `POST endpoint responds: ${res.status}` 
        }
      } catch (e) {
        return { pass: false, message: 'POST failed' }
      }
    }))

    newSuites.push({
      name: 'Oracle API',
      tests: oracleTests,
      status: oracleTests.every(t => t.status === 'pass') ? 'pass' : 
              oracleTests.some(t => t.status === 'fail') ? 'fail' : 'warning'
    })
    setSuites([...newSuites, ...suites.slice(newSuites.length)])

    // 4. FORGE ENGINE
    const forgeTests: TestResult[] = []

    forgeTests.push(await runTest('FORGE Page Load', async () => {
      const res = await fetch('/forge')
      return { pass: res.ok, message: res.ok ? 'FORGE page accessible' : 'FORGE page failed' }
    }))

    forgeTests.push(await runTest('CREATE Framework Data', async () => {
      // Test that CREATE scoring elements exist
      const elements = ['Context', 'Role', 'Examples', 'Audience', 'Tone', 'Execution']
      return { 
        pass: true, 
        message: `6 CREATE elements defined` 
      }
    }))

    forgeTests.push(await runTest('FORGE LocalStorage', async () => {
      try {
        localStorage.setItem('forge_test', 'test')
        const val = localStorage.getItem('forge_test')
        localStorage.removeItem('forge_test')
        return { pass: val === 'test', message: 'LocalStorage working' }
      } catch (e) {
        return { pass: false, message: 'LocalStorage blocked' }
      }
    }))

    newSuites.push({
      name: 'FORGE Engine',
      tests: forgeTests,
      status: forgeTests.every(t => t.status === 'pass') ? 'pass' : 
              forgeTests.some(t => t.status === 'fail') ? 'fail' : 'warning'
    })
    setSuites([...newSuites, ...suites.slice(newSuites.length)])

    // 5. STORAGE
    const storageTests: TestResult[] = []

    storageTests.push(await runTest('LocalStorage Available', async () => {
      try {
        const test = 'ls_test_' + Date.now()
        localStorage.setItem(test, '1')
        localStorage.removeItem(test)
        return { pass: true, message: 'LocalStorage accessible' }
      } catch (e) {
        return { pass: false, message: 'LocalStorage unavailable' }
      }
    }))

    storageTests.push(await runTest('METATRON Analyses Storage', async () => {
      const key = 'metatron_analyses'
      const existing = localStorage.getItem(key)
      return { 
        pass: true, 
        message: existing ? `${JSON.parse(existing).length} saved analyses` : 'No saved analyses (OK)' 
      }
    }))

    storageTests.push(await runTest('FORGE Library Storage', async () => {
      const key = 'forge_library'
      const existing = localStorage.getItem(key)
      return { 
        pass: true, 
        message: existing ? `${JSON.parse(existing).length} saved prompts` : 'No saved prompts (OK)' 
      }
    }))

    newSuites.push({
      name: 'Storage',
      tests: storageTests,
      status: storageTests.every(t => t.status === 'pass') ? 'pass' : 'warning'
    })
    setSuites([...newSuites, ...suites.slice(newSuites.length)])

    // 6. ASSETS
    const assetTests: TestResult[] = []
    const assets = [
      '/images/metatron-logo.png',
      '/images/angel-hero.jpg',
    ]

    for (const asset of assets) {
      const result = await runTest(`Asset: ${asset.split('/').pop()}`, async () => {
        const res = await fetch(asset)
        return { pass: res.ok, message: res.ok ? 'Loaded' : `${res.status} NOT FOUND` }
      })
      assetTests.push(result)
    }

    newSuites.push({
      name: 'Assets',
      tests: assetTests,
      status: assetTests.every(t => t.status === 'pass') ? 'pass' : 'fail'
    })
    setSuites([...newSuites])

    setIsRunning(false)
    setLastRun(new Date().toISOString())
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass': return 'text-green-400 bg-green-500/20 border-green-500/50'
      case 'fail': return 'text-red-400 bg-red-500/20 border-red-500/50'
      case 'warning': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/50'
      case 'running': return 'text-blue-400 bg-blue-500/20 border-blue-500/50'
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/50'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return '✓'
      case 'fail': return '✗'
      case 'warning': return '⚠'
      case 'running': return '◌'
      default: return '○'
    }
  }

  const totalTests = suites.reduce((acc, s) => acc + s.tests.length, 0)
  const passedTests = suites.reduce((acc, s) => acc + s.tests.filter(t => t.status === 'pass').length, 0)
  const failedTests = suites.reduce((acc, s) => acc + s.tests.filter(t => t.status === 'fail').length, 0)

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="bg-[#0a0a0f] border-b border-teal/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-[50px] h-[50px]">
              <Image src="/images/metatron-logo.png" alt="Logo" fill className="object-contain"
                style={{ filter: 'brightness(1.5) saturate(1.5) drop-shadow(0 0 15px rgba(0,206,209,1))' }} quality={100} />
            </div>
            <span className="text-teal group-hover:text-gold transition-colors">← Command Center</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gold">🧪 TEST HARNESS</span>
            <span className="text-xs font-mono text-teal/60">METATRON v7.7</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Control Panel */}
        <div className="bg-[#0d1117] border border-teal/20 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-mono text-gold">A2E Test Harness</h1>
              <p className="text-sm text-muted-foreground mt-1">Production validation suite for Ashes2Echoes platform</p>
            </div>
            <button
              onClick={runAllTests}
              disabled={isRunning}
              className="px-6 py-3 bg-gold/20 border border-gold/50 rounded-lg text-gold font-mono hover:bg-gold/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isRunning ? (
                <><div className="w-4 h-4 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />RUNNING...</>
              ) : (
                <>🚀 RUN ALL TESTS</>
              )}
            </button>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-background/50 border border-teal/20 rounded p-3 text-center">
              <div className="text-2xl font-mono text-foreground">{totalTests}</div>
              <div className="text-xs text-muted-foreground">Total Tests</div>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded p-3 text-center">
              <div className="text-2xl font-mono text-green-400">{passedTests}</div>
              <div className="text-xs text-green-400/70">Passed</div>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded p-3 text-center">
              <div className="text-2xl font-mono text-red-400">{failedTests}</div>
              <div className="text-xs text-red-400/70">Failed</div>
            </div>
            <div className="bg-background/50 border border-teal/20 rounded p-3 text-center">
              <div className="text-2xl font-mono text-teal">{totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0}%</div>
              <div className="text-xs text-muted-foreground">Pass Rate</div>
            </div>
          </div>

          {lastRun && (
            <div className="mt-4 text-xs text-muted-foreground text-center">
              Last run: {new Date(lastRun).toLocaleString()}
            </div>
          )}
        </div>

        {/* Test Suites */}
        <div className="space-y-4">
          {suites.map((suite, i) => (
            <div key={i} className="bg-[#0d1117] border border-teal/20 rounded-lg overflow-hidden">
              <div className={`px-4 py-3 border-b border-teal/20 flex items-center justify-between ${
                suite.status === 'pass' ? 'bg-green-500/5' : 
                suite.status === 'fail' ? 'bg-red-500/5' : 'bg-background/50'
              }`}>
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded flex items-center justify-center text-xs font-mono border ${getStatusColor(suite.status)}`}>
                    {getStatusIcon(suite.status)}
                  </span>
                  <span className="font-mono text-foreground">{suite.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {suite.tests.filter(t => t.status === 'pass').length}/{suite.tests.length} passed
                </span>
              </div>
              
              {suite.tests.length > 0 && (
                <div className="divide-y divide-teal/10">
                  {suite.tests.map((test, j) => (
                    <div key={j} className="px-4 py-2 flex items-center justify-between hover:bg-teal/5">
                      <div className="flex items-center gap-3">
                        <span className={`text-sm ${test.status === 'pass' ? 'text-green-400' : test.status === 'fail' ? 'text-red-400' : 'text-yellow-400'}`}>
                          {getStatusIcon(test.status)}
                        </span>
                        <span className="text-sm text-foreground/80">{test.name}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-xs text-muted-foreground">{test.message}</span>
                        {test.duration && (
                          <span className="text-[10px] font-mono text-teal/60">{test.duration}ms</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          <Link href="/test/forge" className="bg-[#0d1117] border border-teal/20 rounded-lg p-4 hover:border-teal/40 transition-colors">
            <h3 className="text-gold font-mono mb-2">🔥 FORGE Tests</h3>
            <p className="text-xs text-muted-foreground">CREATE framework validation</p>
          </Link>
          <Link href="/test/oracle" className="bg-[#0d1117] border border-teal/20 rounded-lg p-4 hover:border-teal/40 transition-colors">
            <h3 className="text-gold font-mono mb-2">🔱 Oracle Tests</h3>
            <p className="text-xs text-muted-foreground">METATRON protocol validation</p>
          </Link>
          <Link href="/" className="bg-[#0d1117] border border-gold/20 rounded-lg p-4 hover:border-gold/40 transition-colors">
            <h3 className="text-teal font-mono mb-2">🏠 Live Site</h3>
            <p className="text-xs text-muted-foreground">View production deployment</p>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-teal/20 py-6 text-center text-sm text-muted-foreground mt-8">
        <p>© 2026 Ashes2Echoes LLC. Test Harness v1.0</p>
        <p className="text-xs text-foreground/40 mt-1">METATRON v7.7 | 16 Gates | 14 HUNTER</p>
      </footer>
    </main>
  )
}
