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
    
    // Build the user message based on trigger
    let userMessage = '';
    switch (trigger) {
      case 'MARKET_WATCH':
        userMessage = `MARKET WATCH - Full Protocol Analysis

ORACLE INJECT:
${input}

IMPORTANT: Use web search to gather current market data, stock prices, recent news, and financial information for any tickers or companies mentioned. Then run complete METATRON v7.6 protocol. Evaluate all 15 gates with real data. Provide AIORA position sizing recommendation.`;
        break;
      case 'ORACLE':
        userMessage = `ORACLE - Context Package

${input}

Use web search to verify claims and gather current data. Extract thesis, summarize evidence, identify key claims.`;
        break;
      case 'SCAN':
        userMessage = `SCAN - Quick Analysis

${input}

Use web search to check current prices and recent news for any tickers mentioned. Catalyst freshness score, HUNTER alerts, headline risk assessment only.`;
        break;
      case 'ORACLE_INJECT':
      default:
        userMessage = `ORACLE INJECT - Full Protocol

${input}

IMPORTANT: Use web search to gather current market data, verify claims, and get real-time information. Then process through complete METATRON v7.6 protocol. All 15 gates required.`;
        break;
    }

    // Call Claude API with web search tool (non-streaming for tool use)
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 16384,
      system: METATRON_SYSTEM_PROMPT,
      tools: [
        {
          type: "web_search_20250305",
          name: "web_search"
        }
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
        // Send the complete response as a single chunk
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

// Health check
export async function GET() {
  return NextResponse.json({
    status: 'online',
    version: 'METATRON v7.6',
    gates: 15,
    hunter_modules: 12,
    web_search: true,
    message: 'Oracle Protocol Engine Ready with Web Search'
  });
}
