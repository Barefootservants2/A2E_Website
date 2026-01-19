import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const cards = [
  {
    title: "AIORA",
    subtitle: "AI-Optimized Risk Assessment",
    description: "Trading • Analysis • Signals",
  },
  {
    title: "METATRON",
    subtitle: "Protocol Engine v7.4",
    description: "14 Gates • 36 Failure Modes",
  },
  {
    title: "THE COVENANT",
    subtitle: "Multi-Agent AI Collective",
    description: "URIEL • MICHA • COLOSSUS",
  },
  {
    title: "FORGE",
    subtitle: "Prompt Engineering Framework",
    description: "CREATE Methodology",
  },
  {
    title: "STATE'S FINEST™",
    subtitle: "Satirical Apparel",
    description: '"Coming Soon"',
  },
  {
    title: "CONTACT",
    subtitle: "Newport News, VA",
    description: "ashes2echoes.platform@gmail.com",
  },
]

export function DashboardCards() {
  return (
    <section className="w-full px-4 md:px-8 py-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {cards.map((card, index) => (
            <Card
              key={index}
              className="bg-card backdrop-blur-sm border border-teal/20 hover:border-teal/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,206,209,0.15)] group"
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-xl md:text-2xl font-semibold tracking-wider text-teal group-hover:text-teal/90 transition-colors">
                  {card.title}
                </CardTitle>
                <p className="text-sm md:text-base text-muted-foreground font-light tracking-wide">
                  {card.subtitle}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-xs md:text-sm text-foreground/70 font-mono tracking-wide">
                  {card.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}