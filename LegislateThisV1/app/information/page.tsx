import { Navigation } from "@/components/navigation"

export default function Information() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Main Content */}
      <main className="flex-grow pt-20">
        {/* Hero Title */}
        <div className="py-16 px-4">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter">Information</h1>
        </div>

        {/* Content */}
        <div className="border-t border-border">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
            {/* Legislative Process */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Legislative Process</h2>
              <p className="text-muted-foreground">
                Understanding how bills become laws and the journey from proposal to implementation.
              </p>
              <ul className="space-y-2 text-sm">
                <li>• Bill Introduction</li>
                <li>• Committee Review</li>
                <li>• Floor Debate</li>
                <li>• Voting Process</li>
                <li>• Presidential Action</li>
              </ul>
            </div>

            {/* Current Legislation */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Current Legislation</h2>
              <p className="text-muted-foreground">
                Stay informed about active bills and their potential impact on your community.
              </p>
              <div className="space-y-3">
                <div className="border border-border p-3">
                  <h3 className="font-semibold">Healthcare Reform Act</h3>
                  <p className="text-xs text-muted-foreground">Status: Committee Review</p>
                </div>
                <div className="border border-border p-3">
                  <h3 className="font-semibold">Infrastructure Investment Bill</h3>
                  <p className="text-xs text-muted-foreground">Status: Floor Debate</p>
                </div>
              </div>
            </div>

            {/* Resources */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Resources</h2>
              <p className="text-muted-foreground">
                Tools and guides to help you engage with the legislative process effectively.
              </p>
              <ul className="space-y-2 text-sm">
                <li>• Contact Your Representatives</li>
                <li>• Bill Tracking Tools</li>
                <li>• Voting Guides</li>
                <li>• Civic Engagement Tips</li>
                <li>• Legislative Calendar</li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-border p-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl font-bold mb-4">How to Use This Information</h2>
              <p className="text-muted-foreground">
                Our information section is designed to empower citizens with the knowledge they need to participate
                meaningfully in democracy. Whether you're tracking a specific bill, learning about the legislative
                process, or looking for ways to make your voice heard, we provide clear, accessible information to help
                you navigate the complex world of legislation.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
