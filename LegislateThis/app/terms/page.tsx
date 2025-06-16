import { Navigation } from "@/components/navigation"

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Main Content */}
      <main className="flex-grow pt-20">
        {/* Hero Title */}
        <div className="py-16 px-4">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter">Terms of Service</h1>
        </div>

        {/* Content */}
        <div className="border-t border-border">
          <div className="max-w-4xl mx-auto p-6 space-y-8">
            <div className="text-sm text-muted-foreground mb-8">Last updated: January 16, 2025</div>

            <section>
              <h2 className="text-2xl font-bold mb-4">Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing and using Legislate This, you accept and agree to be bound by the terms and provision of
                this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Use License</h2>
              <p className="text-muted-foreground mb-4">
                Permission is granted to temporarily access the materials on Legislate This for personal, non-commercial
                transitory viewing only. This is the grant of a license, not a transfer of title, and under this license
                you may not:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on the website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Disclaimer</h2>
              <p className="text-muted-foreground">
                The materials on Legislate This are provided on an 'as is' basis. Legislate This makes no warranties,
                expressed or implied, and hereby disclaims and negates all other warranties including without
                limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or
                non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Limitations</h2>
              <p className="text-muted-foreground">
                In no event shall Legislate This or its suppliers be liable for any damages (including, without
                limitation, damages for loss of data or profit, or due to business interruption) arising out of the use
                or inability to use the materials on Legislate This, even if Legislate This or an authorized
                representative has been notified orally or in writing of the possibility of such damage.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Accuracy of Materials</h2>
              <p className="text-muted-foreground">
                The materials appearing on Legislate This could include technical, typographical, or photographic
                errors. Legislate This does not warrant that any of the materials on its website are accurate, complete,
                or current. Legislate This may make changes to the materials contained on its website at any time
                without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">User Conduct</h2>
              <p className="text-muted-foreground mb-4">You agree not to use the service to:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Upload, post, or transmit any unlawful, harmful, or objectionable content</li>
                <li>Impersonate any person or entity</li>
                <li>Interfere with or disrupt the service or servers</li>
                <li>Attempt to gain unauthorized access to any portion of the service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Modifications</h2>
              <p className="text-muted-foreground">
                Legislate This may revise these terms of service at any time without notice. By using this website, you
                are agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <p className="text-muted-foreground">
                If you have any questions about these Terms of Service, please contact us at legal@legislatethis.com or
                through our contact form.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
