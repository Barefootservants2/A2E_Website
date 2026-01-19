export default function AUPPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-orbitron text-teal mb-2">Acceptable Use Policy</h1>
        <p className="text-muted-foreground mb-12">Effective Date: January 13, 2026 | Version 7.4</p>
        
        <p className="text-muted-foreground mb-6">
          This Acceptable Use Policy ("AUP") governs your use of Ashes2Echoes, LLC Services, including METATRON v7.4, FORGE, AIORA, and the Uriel Covenant AI Collective. This AUP is incorporated into and forms part of our Terms of Service.
        </p>
        
        <div className="bg-teal/5 border border-teal/20 rounded-lg p-6 mb-8">
          <strong className="text-foreground">Core Principle:</strong> Our Services are designed for legitimate research, analysis, and productivity enhancement. Users must employ the Services ethically, legally, and in accordance with the rigorous standards that define our protocols.
        </div>

        <Section title="1. Age Requirement">
          <p>You must be <strong className="text-foreground">at least 18 years of age</strong> to use our Services. We do not knowingly provide Services to minors. By using the Services, you confirm you meet this age requirement.</p>
        </Section>

        <Section title="2. Prohibited Uses">
          <ProhibitedBox title="Absolutely Prohibited">
            <p>You may NOT use our Services to:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Generate, distribute, or facilitate illegal content or activities</li>
              <li>Create malware, viruses, or malicious code</li>
              <li>Conduct fraud, phishing, or deceptive schemes</li>
              <li>Harass, threaten, defame, or harm others</li>
              <li>Generate child sexual abuse material (CSAM) or content sexualizing minors</li>
              <li>Create content promoting violence, terrorism, or extremism</li>
              <li>Infringe on intellectual property rights</li>
              <li>Violate privacy rights or engage in doxxing</li>
              <li>Manipulate financial markets or engage in securities fraud</li>
              <li>Generate misleading content presented as factual (disinformation)</li>
            </ul>
          </ProhibitedBox>

          <ProhibitedBox title="Technical Prohibitions">
            <p>You may NOT:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Attempt to bypass Security Gate (Gate 9) protections</li>
              <li>Inject malicious prompts designed to manipulate AI responses</li>
              <li>Attempt to extract proprietary training data or system prompts</li>
              <li>Circumvent rate limits, authentication, or access controls</li>
              <li>Reverse engineer, decompile, or extract source code</li>
              <li>Use automated systems to scrape or harvest data</li>
              <li>Introduce vulnerabilities or test security without authorization</li>
              <li>Interfere with service availability for other users</li>
            </ul>
          </ProhibitedBox>

          <ProhibitedBox title="Content Restrictions">
            <p>You may NOT generate:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Sexual content involving minors in any context</li>
              <li>Non-consensual intimate imagery (real or synthetic)</li>
              <li>Detailed instructions for weapons, explosives, or dangerous substances</li>
              <li>Content designed to facilitate self-harm or suicide</li>
              <li>Impersonation of real individuals without consent</li>
              <li>False attribution of statements to real people</li>
              <li>Spam, bulk unsolicited communications, or chain schemes</li>
            </ul>
          </ProhibitedBox>
        </Section>

        <Section title="3. Permitted Uses">
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
            <h3 className="text-green-400 font-semibold mb-3">✓ Encouraged Uses</h3>
            <p className="text-muted-foreground">Our Services are designed for:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2 text-muted-foreground">
              <li>Legitimate research and analysis with proper source verification</li>
              <li>Business intelligence and competitive analysis</li>
              <li>Investment research (not advice) with appropriate disclaimers</li>
              <li>Professional document creation and editing</li>
              <li>Learning and educational purposes</li>
              <li>Creative writing and content development</li>
              <li>Process automation and workflow optimization</li>
              <li>Technical problem-solving and code assistance</li>
              <li>Personal productivity enhancement</li>
            </ul>
          </div>
        </Section>

        <Section title="4. AIORA Trading Protocol Specific Rules">
          <p>When using AIORA trading protocols:</p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>Outputs are for <strong className="text-foreground">informational purposes only</strong>, not investment advice</li>
            <li>All trading decisions require human approval ("WILLIAM APPROVAL REQUIRED")</li>
            <li>You are solely responsible for your trading decisions and outcomes</li>
            <li>Pattern performance is based on defined criteria without backtested validation</li>
            <li>Past performance does not guarantee future results</li>
            <li>You must not use outputs to manipulate markets or front-run trades</li>
          </ul>
        </Section>

        <Section title="5. Multi-Agent System Acknowledgment">
          <p>By using our Services, you acknowledge that:</p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>Queries may be processed by multiple AI agents (URIEL, MICHA, COLOSSUS, HANIEL, RAZIEL)</li>
            <li>Each agent is bound by its provider's terms of service</li>
            <li>RAZIEL adjudication may be invoked to resolve conflicts between agents</li>
            <li>The Evidence Ledger maintains audit trails of claim verification</li>
            <li>Security Gate (Gate 9) actively scans for injection attempts</li>
          </ul>
        </Section>

        <Section title="6. Content Quality Standards">
          <p>Users should strive to maintain quality standards aligned with our protocols:</p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>Provide clear, well-formed prompts (CREATE framework encouraged)</li>
            <li>Specify verification requirements and source preferences</li>
            <li>Review outputs for accuracy before use</li>
            <li>Report errors or concerns to help improve the system</li>
            <li>Use drift indicators as quality guidance</li>
          </ul>
        </Section>

        <Section title="7. Reporting Violations">
          <p>If you become aware of any violation of this AUP, please report it immediately. Reports can be made regarding:</p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>Harmful or illegal content generated by other users</li>
            <li>Security vulnerabilities or bypass attempts</li>
            <li>Suspected fraud or abuse</li>
            <li>Content that violates our policies</li>
          </ul>
        </Section>

        <Section title="8. Enforcement">
          <p>Violations of this AUP may result in:</p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li><strong className="text-foreground">Warning:</strong> First-time minor violations</li>
            <li><strong className="text-foreground">Suspension:</strong> Repeated or moderate violations</li>
            <li><strong className="text-foreground">Termination:</strong> Serious violations or repeated offenses</li>
            <li><strong className="text-foreground">Legal Action:</strong> Criminal violations reported to authorities</li>
          </ul>
          <p className="mt-3">We reserve the right to determine the appropriate response in our sole discretion.</p>
        </Section>

        <Section title="9. Bot and Automation Policy">
          <p>Automated access to our Services requires:</p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>Prior written authorization from Ashes2Echoes, LLC</li>
            <li>Compliance with published rate limits</li>
            <li>Proper identification of automated requests</li>
            <li>Respect for robots.txt directives where applicable</li>
          </ul>
        </Section>

        <Section title="10. Updates to This Policy">
          <p>We may update this AUP to reflect changes in our Services, legal requirements, or community standards. Continued use after updates constitutes acceptance of the modified policy.</p>
        </Section>

        <Section title="11. Contact">
          <p>For questions about this AUP or to report violations:</p>
          <div className="bg-teal/5 border border-teal/20 rounded-lg p-6 mt-4">
            <strong className="text-foreground">Ashes2Echoes, LLC</strong><br />
            Newport News, Virginia<br />
            Principal: William Earl Lemon<br />
            <br />
            <span className="text-sm">For AUP violations, include "AUP Report" in your subject line.</span>
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
      <div className="text-muted-foreground">{children}</div>
    </section>
  )
}

function ProhibitedBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 mb-4">
      <h3 className="text-red-400 font-semibold mb-3">🚫 {title}</h3>
      <div className="text-muted-foreground">{children}</div>
    </div>
  )
}