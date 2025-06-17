import { Navigation } from "@/components/navigation"

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Main Content */}
      <main className="flex-grow pt-20">
        {/* Hero Title */}
        <div className="py-16 px-4">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter">
            Terms of Service
          </h1>
        </div>

        {/* Content */}
        <div className="border-t border-border">
          <div className="max-w-4xl mx-auto p-6 space-y-8">
            <div className="text-sm text-muted-foreground mb-8">
              Last updated: June 15, 2025
            </div>

            <section>
              <h2 className="text-2xl font-bold mb-4">Content Use</h2>
              <p className="text-muted-foreground">
                All content on this site is for informational and educational
                purposes only. It is not legal advice. You may not copy or reuse
                content without permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Acceptable Use</h2>
              <p className="text-muted-foreground mb-4">You agree not to:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Use this site for unlawful purposes.</li>
                <li>Copy, scrape, or harm the platform in any way.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Third-Party Tools</h2>
              <p className="text-muted-foreground">
                We use Firebase for hosting and database services, and we may
                use Google Analytics in the future to understand site usage
                trends. These tools are governed by their own terms and privacy
                policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
              <p className="text-muted-foreground">
                We are not liable for any damages that may result from using
                this site or its content.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Changes to Terms</h2>
              <p className="text-muted-foreground">
                We may update these terms. Continued use of the site means you
                accept any updates.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <p className="text-muted-foreground">
                If you have any questions about these Terms of Service, please
                contact us at <a href="mailto:contact.legislate.this@gmail.com" className="underline">contact.legislate.this@gmail.com</a> or
                through our contact form.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
