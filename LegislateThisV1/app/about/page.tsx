import { Navigation } from "@/components/navigation"

export default function About() {
  // Team member data - duplicated to simulate larger team
  const teamMembers = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Founder & Policy Director",
      defaultImage: "/placeholder.svg?height=300&width=240",
      hoverImage: "/placeholder.svg?height=300&width=240",
    },
    {
      id: 2,
      name: "Sam Rivera",
      role: "Lead Developer & Designer",
      defaultImage: "/placeholder.svg?height=300&width=240",
      hoverImage: "/placeholder.svg?height=300&width=240",
    },
    // Duplicated entries to simulate larger team
    {
      id: 3,
      name: "Alex Johnson",
      role: "Founder & Policy Director",
      defaultImage: "/placeholder.svg?height=300&width=240",
      hoverImage: "/placeholder.svg?height=300&width=240",
    },
    {
      id: 4,
      name: "Sam Rivera",
      role: "Lead Developer & Designer",
      defaultImage: "/placeholder.svg?height=300&width=240",
      hoverImage: "/placeholder.svg?height=300&width=240",
    },
    {
      id: 5,
      name: "Alex Johnson",
      role: "Founder & Policy Director",
      defaultImage: "/placeholder.svg?height=300&width=240",
      hoverImage: "/placeholder.svg?height=300&width=240",
    },
    {
      id: 6,
      name: "Sam Rivera",
      role: "Lead Developer & Designer",
      defaultImage: "/placeholder.svg?height=300&width=240",
      hoverImage: "/placeholder.svg?height=300&width=240",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Main Content */}
      <main className="flex-grow pt-20">
        {/* Hero Title */}
        <div className="py-16 px-4">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter">About</h1>
        </div>

        {/* Content */}
        <div className="border-t border-border">
          <div className="grid md:grid-cols-2">
            {/* Left Column - Mission */}
            <div className="border-r border-border p-6">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                  <p className="text-muted-foreground mb-4">
                    Legislate This is here to bridge the gap between complex new U.S. legislation between normal people who just wanna know whats
                    happening in DC. We believe that democracy works best when people are informed, engaged, and empowered to participate in the legislative process.
                  </p>
                  <p className="text-muted-foreground">
                    Through clear communication, accessible resources, and innovative tools, we make it easier for
                    everyone to understand, track, and influence the laws that shape our society.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">Our Values</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Transparency in government</li>
                    <li>• Accessible free information for all</li>
                    <li>• Civic engagement and participation</li>
                    <li>• Non-partisan approach to legislation</li>
                    <li>• Community-driven democracy</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Column - Team & History */}
            <div className="p-6">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Our Story</h2>
                  <p className="text-muted-foreground mb-4">
                    Founded in 2025, Legislate This was creating by two teenagers living in DC. 
                    We started Legislate This because we were tired of how news is delivered online, cold, overwhelming, 
                    and often buried in clutter or TikTok noise. We wanted to create something different. 
                    
                  </p>
                  <p className="text-muted-foreground">
                  A place that feels clear, focused, and warm.
                  Here, we break down legislation in simple terms no clickbait, no chaos. Just clean explanations, 
                  with a few small touches (like custom cursors and themes).

                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">What We Do</h2>
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold">Simplify Complex Legislation</h3>
                      <p className="text-sm text-muted-foreground">
                        We break down complex bills into understandable summaries.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Track Legislative Progress</h3>
                      <p className="text-sm text-muted-foreground">
                        Follow bills through every stage of the legislative process.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Connect Citizens with Representatives</h3>
                      <p className="text-sm text-muted-foreground">
                        Make it easy to contact and engage with elected officials.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* The Team Section */}
          <div className="border-t border-border p-6">
            <div className="max-w-6xl mx-auto">
              {/* Left-aligned team section headers */}
              <div className="text-left mb-8">
                <h2 className="text-3xl font-bold mb-4">The Team</h2>
                <p className="text-muted-foreground italic">(There are only two team members.)</p>
              </div>

              {/* Team Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {teamMembers.map((member) => (
                  <div key={member.id} className="group">
                    {/* Photo Container */}
                    <div className="relative overflow-hidden border border-border bg-muted mb-3 aspect-[4/5]">
                      {/* Default Image */}
                      <img
                        src={member.defaultImage || "/placeholder.svg"}
                        alt={`${member.name} - ${member.role}`}
                        className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                      />
                      {/* Hover Image */}
                      <img
                        src={member.hoverImage || "/placeholder.svg"}
                        alt={`${member.name} - casual photo`}
                        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                      />
                    </div>

                    {/* Member Info */}
                    <div className="text-center">
                      <h3 className="font-semibold text-sm mb-1">{member.name}</h3>
                      <p className="text-xs text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional Team Info */}
              <div className="mt-8 text-center">
                <p className="text-muted-foreground text-sm">
                  Our small but dedicated team works tirelessly to make legislation accessible to everyone. Each member
                  brings unique expertise in policy, technology, and design to create meaningful civic engagement tools.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
