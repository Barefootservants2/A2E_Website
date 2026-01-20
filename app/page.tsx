import { HeroSection } from "@/components/hero-section"
import { OracleInject } from "@/components/oracle-inject"
import { DashboardCards } from "@/components/dashboard-cards"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <OracleInject />
      <DashboardCards />
      <Footer />
    </main>
  )
}
