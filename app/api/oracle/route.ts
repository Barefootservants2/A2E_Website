import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { METATRON_SYSTEM_PROMPT, detectTrigger } from '@/lib/metatron-protocol';

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { input, mode } = await request.json();

    if (!input || typeof input !== 'string') {
      return NextResponse.json(
        { error: 'Input is required' },
        { status: 400 }
      );
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'ANTHROPIC_API_KEY not configured' },
        { status: 500 }
      );
    }

    // Detect trigger type
    const trigger = detectTrigger(input);
    
    // Build the user message based on trigger - UPDATED for v7.7
    let userMessage = '';
    switch (trigger) {
      case 'MARKET_WATCH':
        userMessage = `MARKET WATCH - Full Protocol Analysis (METATRON v7.7)

ORACLE INJECT:
${input}

CRITICAL INSTRUCTIONS:
1. Use web search to gather current market data, stock prices, recent news for ALL tickers mentioned
2. **MANDATORY Gate 8.5 REGULATORY SCAN** - Search for:
   - "[sector] executive order January 2026"
   - "[sector] regulatory policy 2026"
   - "[sector] tariff January 2026"
   - "FERC PJM policy data center" (if energy/data center related)
   - Look for ANY policy shifts within past 72 hours
3. Run complete METATRON v7.7 protocol with all 16 gates
4. Provide AIORA position sizing with regulatory status
5. Generate 4 counter-thesis modes: MARKET, COMPANY, THESIS, REGULATORY

If ANY breaking regulatory news is found (<72hrs), flag as ⚠️ REGULATORY SHOCK and adjust recommendation accordingly.`;
        break;
        
      case 'ORACLE':
        userMessage = `ORACLE - Context Package (METATRON v7.7)

${input}

Use web search to verify claims and gather current data. Include a quick regulatory scan. Extract thesis, summarize evidence, identify key claims.`;
        break;
        
      case 'SCAN':
        userMessage = `SCAN - Quick Analysis (METATRON v7.7)

${input}

Use web search to check current prices and recent news for any tickers mentioned. Catalyst freshness score, HUNTER alerts, headline risk assessment. Include quick regulatory check.`;
        break;
        
      case 'REG_SCAN':
        userMessage = `REGULATORY SCAN - Gate 8.5 Deep Dive (METATRON v7.7)

${input}

FOCUS: Regulatory and policy risk analysis only.

MANDATORY SEARCHES:
1. "[sector/ticker] executive order 2026"
2. "[sector/ticker] regulatory action January 2026"
3. "[sector/ticker] tariff 2026"
4. "[sector] policy change"
5. "FERC NERC SEC FTC DOE [sector] ruling"

For EACH search result:
- Date of news/action
- Agency or authority involved
- Direct impact on thesis
- Confidence adjustment required

Output format:
- REGULATORY STATUS: CLEAR / MONITORING / HOLD / ALERT
- News found within 24h: [list]
- News found within 72h: [list]
- Policy shifts detected: [list]
- Confidence adjustment: [+/- X%]
- Recommended action: [PROCEED / WAIT / REDUCE / EXIT]`;
        break;
        
      case 'ORACLE_INJECT':
      default:
        userMessage = `ORACLE INJECT - Full Protocol (METATRON v7.7)

${input}

CRITICAL INSTRUCTIONS:
1. Use web search to gather current market data, verify claims, and get real-time information
2. Search for relevant tickers and news
3. **MANDATORY Gate 8.5 REGULATORY SCAN** - Must search for regulatory/policy news within 72hrs
4. Process through complete METATRON v7.7 protocol - all 16 gates
5. Include 4 counter-thesis modes with explicit REGULATORY RISK

Generate comprehensive analysis with regulatory status clearly indicated.`;
        break;
    }

    // Call Claude API with web search tool
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 16384,
      system: METATRON_SYSTEM_PROMPT,
      tools: [
        {
          type: "web_search_20250305",
          name: "web_search"
        } as any
      ],
      messages: [
        {
          role: 'user',
          content: userMessage
        }
      ]
    });

    // Extract text from response
    let resultText = '';
    for (const block of response.content) {
      if (block.type === 'text') {
        resultText += block.text;
      }
    }

    // Return as SSE format for compatibility with frontend
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: resultText })}\n\n`));
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      }
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error: any) {
    console.error('Oracle API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process request' },
      { status: 500 }
    );
  }
}

// Health check - UPDATED for v7.7
export async function GET() {
  return NextResponse.json({
    status: 'online',
    version: 'METATRON v7.7',
    gates: 16,
    hunter_modules: 14,
    web_search: true,
    features: ['regulatory_scan', 'save_local', 'export_md', 'export_json'],
    message: 'Oracle Protocol Engine Ready - Gate 8.5 Regulatory Shock Active'
  });
}
