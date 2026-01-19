import Link from 'next/link'

export function Footer() {
  return (
    <footer className="w-full py-8 bg-background border-t border-teal/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground font-light tracking-wide">
            © 2026 Ashes2Echoes LLC. All Rights Reserved.
          </p>
          <nav className="flex gap-6 text-sm">
            <Link 
              href="/terms" 
              className="text-muted-foreground hover:text-teal transition-colors"
            >
              Terms of Service
            </Link>
            <Link 
              href="/privacy" 
              className="text-muted-foreground hover:text-teal transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/aup" 
              className="text-muted-foreground hover:text-teal transition-colors"
            >
              Acceptable Use
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}