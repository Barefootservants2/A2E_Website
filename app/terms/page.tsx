export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-orbitron text-teal mb-2">Terms of Service</h1>
        <p className="text-muted-foreground mb-12">Effective Date: January 13, 2026 | Version 7.4</p>
        
        <p className="text-muted-foreground mb-6">
          Welcome to Ashes2Echoes, LLC ("Company," "we," "us," or "our"). These Terms of Service ("Terms") govern your access to and use of our AI research protocols, including METATRON v7.4, FORGE, AIORA, and related services (collectively, the "Services").
        </p>
        
        <div className="bg-teal/5 border border-teal/20 rounded-lg p-6 mb-8">
          <strong className="text-foreground">By accessing or using our Services, you agree to be bound by these Terms.</strong> If you do not agree, do not use the Services.
        </div>

        <Section title="1. Eligibility">
          <p>You must be at least <strong className="text-foreground">18 years of age</strong> to use our Services. By using the Services, you represent and warrant that you meet this requirement and have the legal capacity to enter into these Terms.</p>
        </Section>

        <Section title="2. Description of Services">
          <p>Ashes2Echoes provides AI-assisted research protocols and prompt engineering tools, including:</p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li><strong className="text-foreground">METATRON v7.4:</strong> A research protocol featuring 14 quality gates, 36 failure modes, HUNTER Protocol, Claim Registry, Evidence Ledger with ALCOA+ compliance, and Security Gates for RAG injection protection.</li>
            <li><strong className="text-foreground">FORGE:</strong> A prompt engineering interface utilizing CREATE methodology and CAKE output standards with real-time scoring and coaching.</li>
            <li><strong className="text-foreground">AIORA:</strong> AI-Optimized Risk Assessment trading protocols with position sizing frameworks and RAZIEL adjudication.</li>
          </ul>
        </Section>

        <Section title="3. Intellectual Property">
          <p>All content, protocols, methodologies, and software provided through the Services are the exclusive property of Ashes2Echoes, LLC and are protected by copyright, trademark, and other intellectual property laws.</p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li><strong className="text-foreground">METATRON™</strong> is a trademark of Ashes2Echoes, LLC</li>
            <li><strong className="text-foreground">FORGE™</strong> is a trademark of Ashes2Echoes, LLC</li>
            <li>The CREATE Framework, CAKE Standards, and all associated documentation are proprietary</li>
          </ul>
          <p className="mt-3">You may not copy, modify, distribute, sell, or lease any part of our Services or included software without explicit written permission.</p>
        </Section>

        <Section title="4. User Responsibilities">
          <p>When using our Services, you agree to:</p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>Provide accurate information when creating an account or subscribing</li>
            <li>Maintain the confidentiality of your account credentials</li>
            <li>Use the Services only for lawful purposes</li>
            <li>Not attempt to reverse engineer, decompile, or extract source code</li>
            <li>Not use the Services to generate harmful, misleading, or illegal content</li>
            <li>Not circumvent security measures including the Security Gate (Gate 9)</li>
          </ul>
        </Section>

        <Section title="5. Accuracy and Limitations">
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 mb-4">
            <strong className="text-foreground">Important Disclaimer:</strong> While METATRON v7.4 employs rigorous verification protocols including Claim Registry, Evidence Ledger, and 14 quality gates, no AI system can guarantee 100% accuracy. Our target accuracy KPI is 95%+, but outputs should be independently verified for critical decisions.
          </div>
          <p>The Services are provided for informational and research purposes. They do not constitute:</p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>Financial, investment, or trading advice</li>
            <li>Legal advice</li>
            <li>Medical advice</li>
            <li>Professional advice of any kind</li>
          </ul>
          <p className="mt-3">Pattern performance in AIORA is based on defined criteria. No historical backtest data guarantees future results.</p>
        </Section>

        <Section title="6. Subscription and Payment">
          <p>Certain Services may require a paid subscription. By subscribing, you agree to:</p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>Pay all applicable fees as described at the time of purchase</li>
            <li>Provide valid payment information</li>
            <li>Accept automatic renewal unless cancelled before the renewal date</li>
          </ul>
          <p className="mt-3">Trial periods convert to paid subscriptions unless cancelled.</p>
        </Section>

        <Section title="7. Termination">
          <p>We may suspend or terminate your access to the Services at any time for:</p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>Violation of these Terms</li>
            <li>Fraudulent or illegal activity</li>
            <li>Non-payment of fees</li>
            <li>Any reason at our sole discretion with reasonable notice</li>
          </ul>
          <p className="mt-3">Upon termination, your right to use the Services ceases immediately.</p>
        </Section>

        <Section title="8. Limitation of Liability">
          <p className="uppercase text-sm">TO THE MAXIMUM EXTENT PERMITTED BY LAW, ASHES2ECHOES, LLC SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO:</p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>Loss of profits or revenue</li>
            <li>Loss of data</li>
            <li>Trading losses or investment losses</li>
            <li>Business interruption</li>
          </ul>
          <p className="mt-3">Our total liability shall not exceed the amount you paid for the Services in the twelve (12) months preceding the claim.</p>
        </Section>

        <Section title="9. Indemnification">
          <p>You agree to indemnify and hold harmless Ashes2Echoes, LLC, its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from your use of the Services or violation of these Terms.</p>
        </Section>

        <Section title="10. Governing Law">
          <p>These Terms shall be governed by and construed in accordance with the laws of the Commonwealth of Virginia, United States, without regard to conflict of law principles. Any disputes shall be resolved in the courts of Newport News, Virginia.</p>
        </Section>

        <Section title="11. Changes to Terms">
          <p>We reserve the right to modify these Terms at any time. Changes will be effective upon posting to our website. Your continued use of the Services after changes constitutes acceptance of the modified Terms.</p>
        </Section>

        <Section title="12. Contact Information">
          <p>For questions about these Terms, contact:</p>
          <div className="bg-teal/5 border border-teal/20 rounded-lg p-6 mt-4">
            <strong className="text-foreground">Ashes2Echoes, LLC</strong><br />
            Newport News, Virginia<br />
            Principal: William Earl Lemon
          </div>
        </Section>
      </div>
    </main>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-orbitron text-gold border-b border-teal/20 pb-2 mb-4">{title}</h2>
      <div className="text-muted-foreground space-y-3">{children}</div>
    </section>
  )
}