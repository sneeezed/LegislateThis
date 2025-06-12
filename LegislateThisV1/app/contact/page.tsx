import { Navigation } from "@/components/navigation"
import { EnhancedLiveClock } from "@/components/enhanced-live-clock"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Main Content */}
      <main className="flex-grow pt-20">
        {/* Hero Title */}
        <div className="py-16 px-4">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter">Contact</h1>
        </div>

        {/* Content Grid */}
        <div className="border-t border-border">
          <div className="grid md:grid-cols-2">
            {/* Left Column - Contact Info */}
            <div className="border-r border-border p-6">
              <div className="mb-12">
                <EnhancedLiveClock
                  timezone="America/New_York"
                  city="Washington DC"
                  emoji="🏛️"
                  abbreviation="EST"
                  showSeconds={true}
                />
                <p className="mb-1">1600 Pennsylvania Ave</p>
                <p className="mb-1">Washington, DC 20500</p>
                <p className="text-muted-foreground">contact@legislatethis.com</p>
              </div>

              <div className="mb-12">
                <EnhancedLiveClock
                  timezone="America/Chicago"
                  city="Austin"
                  emoji="🤠"
                  abbreviation="CST"
                  showSeconds={true}
                />
                <p className="mb-1">123 Capitol Street</p>
                <p className="mb-1">Austin, TX 78701</p>
                <p className="text-muted-foreground">austin@legislatethis.com</p>
              </div>

              <div className="mt-auto pt-24">
                <p className="text-muted-foreground">Legislate This has a purpose.</p>
              </div>
            </div>

            {/* Right Column - Newsletter & Footer */}
            <div className="p-6">
              <div className="mb-12">
                <h2 className="text-xl mb-4">Sign up for our emails</h2>
                <div className="flex items-start gap-2 mb-4">
                  <Checkbox id="newsletter" className="mt-1" />
                  <label htmlFor="newsletter" className="text-sm">
                    By checking this box sign up for our newsletter and receive updates on legislation, policy changes,
                    and civic engagement opportunities. You can unsubscribe at any time.
                  </label>
                </div>
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="typehere@youremail.com"
                    className="border-b border-border rounded-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                  <Button variant="outline" className="border border-border rounded-none">
                    Submit
                  </Button>
                </div>
              </div>

              <div className="mt-auto pt-24">
                <p className="mb-4">Twitter, LinkedIn, Instagram</p>
                <p className="mb-1 text-muted-foreground">Privacy Policy</p>
                <p className="mb-1 text-muted-foreground">© Legislate This</p>
                <p className="text-muted-foreground">Credits</p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-border p-4 flex justify-between">
            <a href="#" className="text-muted-foreground">
              View Legislate This Network
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
