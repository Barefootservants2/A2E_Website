export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-orbitron text-teal mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground mb-12">Effective Date: January 13, 2026 | Version 7.4</p>
        
        <p className="text-muted-foreground mb-8">
          Ashes2Echoes, LLC ("Company," "we," "us," or "our") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Services, including METATRON v7.4, FORGE, and AIORA.
        </p>

        <Section title="1. Information We Collect">
          <h3 className="text-foreground font-semibold mt-4 mb-2">1.1 Information You Provide</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-foreground">Account Information:</strong> Email address, name, payment information when you subscribe</li>
            <li><strong className="text-foreground">Communications:</strong> Messages you send to us, feedback, support requests</li>
            <li><strong className="text-foreground">User Content:</strong> Prompts, queries, and inputs you submit to the Services</li>
          </ul>

          <h3 className="text-foreground font-semibold mt-6 mb-2">1.2 Information Collected Automatically</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-foreground">Usage Data:</strong> Pages visited, features used, time spent, click patterns</li>
            <li><strong className="text-foreground">Device Information:</strong> Browser type, operating system, device identifiers</li>
            <li><strong className="text-foreground">Log Data:</strong> IP address, access times, referring URLs</li>
          </ul>

          <h3 className="text-foreground font-semibold mt-6 mb-2">1.3 Evidence Ledger Data</h3>
          <p>When using METATRON v7.4, the Evidence Ledger may store:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Claim IDs and verification status</li>
            <li>Source URLs and retrieval timestamps</li>
            <li>SHA256 hashes of evidence spans</li>
            <li>Agent and model version identifiers</li>
          </ul>
          <p className="mt-3">This data is used for audit trails and quality assurance in accordance with ALCOA+ compliance standards.</p>
        </Section>

        <Section title="2. How We Use Your Information">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse mt-4">
              <thead>
                <tr className="border-b border-teal/20">
                  <th className="text-left py-3 pr-4 text-foreground font-semibold">Purpose</th>
                  <th className="text-left py-3 text-foreground font-semibold">Legal Basis</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-teal/10"><td className="py-2 pr-4">Provide and maintain Services</td><td>Contract performance</td></tr>
                <tr className="border-b border-teal/10"><td className="py-2 pr-4">Process payments and subscriptions</td><td>Contract performance</td></tr>
                <tr className="border-b border-teal/10"><td className="py-2 pr-4">Improve and optimize Services</td><td>Legitimate interest</td></tr>
                <tr className="border-b border-teal/10"><td className="py-2 pr-4">Monitor drift indicators and quality</td><td>Legitimate interest</td></tr>
                <tr className="border-b border-teal/10"><td className="py-2 pr-4">Prevent fraud and security threats</td><td>Legitimate interest</td></tr>
                <tr className="border-b border-teal/10"><td className="py-2 pr-4">Comply with legal obligations</td><td>Legal requirement</td></tr>
                <tr className="border-b border-teal/10"><td className="py-2 pr-4">Send service communications</td><td>Contract performance</td></tr>
                <tr><td className="py-2 pr-4">Marketing (with consent)</td><td>Consent</td></tr>
              </tbody>
            </table>
          </div>
        </Section>

        <Section title="3. Data Retention">
          <p>We retain your information for as long as necessary to provide the Services:</p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li><strong className="text-foreground">Account Data:</strong> Duration of account plus 2 years</li>
            <li><strong className="text-foreground">Evidence Ledger:</strong> Minimum 2 years (ALCOA+ requirement)</li>
            <li><strong className="text-foreground">Usage Analytics:</strong> 13 months</li>
            <li><strong className="text-foreground">Payment Records:</strong> 7 years (legal requirement)</li>
          </ul>
        </Section>

        <Section title="4. Data Sharing and Disclosure">
          <p>We do not sell your personal information. We may share data with:</p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li><strong className="text-foreground">Service Providers:</strong> Payment processors, hosting providers, analytics services</li>
            <li><strong className="text-foreground">AI Model Providers:</strong> Queries may be processed by third-party AI services (OpenAI, Anthropic, Google, xAI, DeepSeek) subject to their privacy policies</li>
            <li><strong className="text-foreground">Legal Requirements:</strong> When required by law, court order, or to protect rights</li>
            <li><strong className="text-foreground">Business Transfers:</strong> In connection with merger, acquisition, or sale of assets</li>
          </ul>
          
          <div className="bg-teal/5 border border-teal/20 rounded-lg p-6 mt-6">
            <strong className="text-foreground">Multi-Agent Processing:</strong> The Uriel Covenant Collective routes queries to multiple AI agents (URIEL/ChatGPT, MICHA/Claude, COLOSSUS/Grok, HANIEL/Gemini, RAZIEL/DeepSeek). Your queries may be processed by any or all of these services.
          </div>
        </Section>

        <Section title="5. Data Security">
          <p>We implement appropriate technical and organizational measures to protect your data:</p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>Encryption in transit (TLS 1.3) and at rest</li>
            <li>Security Gate (Gate 9) protects against RAG injection attacks</li>
            <li>Access controls and authentication</li>
            <li>Regular security assessments</li>
            <li>SHA256 hash verification for Evidence Ledger integrity</li>
          </ul>
        </Section>

        <Section title="6. Your Rights">
          <p>Depending on your jurisdiction, you may have the right to:</p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li><strong className="text-foreground">Access:</strong> Request a copy of your personal data</li>
            <li><strong className="text-foreground">Correction:</strong> Request correction of inaccurate data</li>
            <li><strong className="text-foreground">Deletion:</strong> Request deletion of your data ("right to be forgotten")</li>
            <li><strong className="text-foreground">Portability:</strong> Receive your data in a portable format</li>
            <li><strong className="text-foreground">Objection:</strong> Object to certain processing activities</li>
            <li><strong className="text-foreground">Restriction:</strong> Request limitation of processing</li>
          </ul>
          <p className="mt-3">To exercise these rights, contact us using the information below.</p>
        </Section>

        <Section title="7. Cookies and Tracking">
          <p>We use cookies and similar technologies for:</p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li><strong className="text-foreground">Essential Cookies:</strong> Required for Services to function</li>
            <li><strong className="text-foreground">Analytics Cookies:</strong> Understanding usage patterns</li>
            <li><strong className="text-foreground">Preference Cookies:</strong> Remembering your settings</li>
          </ul>
          <p className="mt-3">You can manage cookie preferences through your browser settings.</p>
        </Section>

        <Section title="8. Children's Privacy">
          <p>Our Services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from minors. If we become aware that we have collected data from a minor, we will delete it promptly.</p>
        </Section>

        <Section title="9. International Data Transfers">
          <p>Your information may be transferred to and processed in countries other than your own, including the United States. We ensure appropriate safeguards are in place for such transfers.</p>
        </Section>

        <Section title="10. Changes to This Policy">
          <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date. Significant changes will be communicated via email or prominent notice on our Services.</p>
        </Section>

        <Section title="11. Contact Us">
          <p>For privacy-related inquiries or to exercise your rights:</p>
          <div className="bg-teal/5 border border-teal/20 rounded-lg p-6 mt-4">
            <strong className="text-foreground">Ashes2Echoes, LLC</strong><br />
            Newport News, Virginia<br />
            Principal: William Earl Lemon<br />
            <br />
            <span className="text-sm">For data protection inquiries, please include "Privacy Request" in your subject line.</span>
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