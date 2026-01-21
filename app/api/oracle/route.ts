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

Run complete METATRON v7.6 protocol. Evaluate all 15 gates. Provide AIORA position sizing recommendation.

NOTE: You do not have web search in this environment. Analyze based on the data provided and your training knowledge. Clearly document any gaps where live data would be needed.`;
        break;
      case 'ORACLE':
        userMessage = `ORACLE - Context Package

${input}

Extract thesis, summarize evidence, identify key claims. Skip full gate evaluation.`;
        break;
      case 'SCAN':
        userMessage = `SCAN - Quick Analysis

${input}

Quick scan: Catalyst freshness score, HUNTER alerts, headline risk assessment only.`;
        break;
      case 'ORACLE_INJECT':
      default:
        userMessage = `ORACLE INJECT - Full Protocol

${input}

Process this data through complete METATRON v7.6 protocol. All 15 gates required.

NOTE: You do not have web search in this environment. Analyze based on the data provided and your training knowledge. Clearly document any gaps where live data would be needed.`;
        break;
    }

    // Call Claude API with streaming
    const stream = await anthropic.messages.stream({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 8192,
      system: METATRON_SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: userMessage
        }
      ]
    });

    // Create a readable stream for the response
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`));
            }
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch (error) {
          controller.error(error);
        }
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
    web_search: false,
    message: 'Oracle Protocol Engine Ready (Web search requires SDK update)'
  });
}
