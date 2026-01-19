import { HeroSection } from "@/components/hero-section"
import { DashboardCards } from "@/components/dashboard-cards"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <DashboardCards />
      <Footer />
    </main>
  )
}