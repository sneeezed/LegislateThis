import { Navigation } from "@/components/navigation"

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Main Content */}
      <main className="flex-grow pt-20">
        {/* Hero Title */}
        <div className="py-16 px-4">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter">Privacy Policy</h1>
        </div>

        {/* Content */}
        <div className="border-t border-border">
          <div className="max-w-4xl mx-auto p-6 space-y-8">
            <div className="text-sm text-muted-foreground mb-8">Last updated: January 16, 2025</div>

            <section>
              <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
              <p className="text-muted-foreground mb-4">
                At Legislate This, we are committed to protecting your privacy. We collect information you provide
                directly to us, when you contact us.
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Personal information (name, email and address)</li>
                <li>Messages and correspondence you send to us</li>
                <li>Usage data and analytics to improve our services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
              <p className="text-muted-foreground mb-4">
                We use the information we collect to provide, maintain, and improve our services, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Delivering legislative updates and news</li>
                <li>Responding to your inquiries and providing customer support</li>
                <li>Analyzing usage patterns to enhance user experience</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Information Sharing</h2>
              <p className="text-muted-foreground mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your
                consent, except as described in this policy. We may share information in the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>With your explicit consent</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights and prevent fraud</li>
                <li>With service providers who assist in our operations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Data Security</h2>
              <p className="text-muted-foreground">
                We implement appropriate security measures to protect your personal information against unauthorized
                access, alteration, disclosure, or destruction. However, no method of transmission over the internet is
                100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
              <p className="text-muted-foreground mb-4">You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Access and update your personal information</li>
                <li>Request deletion of your data</li>
                <li>Opt out of marketing communications</li>
                <li>Request a copy of your data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about this Privacy Policy, please contact us at privacy@legislatethis.com or
                through our contact form.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
