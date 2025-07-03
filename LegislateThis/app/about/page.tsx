import { Navigation } from "@/components/navigation"
import { Metadata } from "next"

// SEO Metadata
export const metadata: Metadata = {
  title: "About Legislate This | Making Legislation Accessible",
  description: "Learn about our mission to make Congress make sense. We're a team of young people breaking down complex legislation and profiling every member of Congress in plain language.",
  keywords: [
    "about legislate this",
    "legislation accessibility",
    "congress explained",
    "civic engagement",
    "democracy tools",
    "young people politics",
    "legislative transparency"
  ],
  openGraph: {
    title: "About Legislate This | Making Legislation Accessible",
    description: "Learn about our mission to make Congress make sense. We're a team of young people breaking down complex legislation and profiling every member of Congress in plain language.",
    url: "https://legislatethis.org/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Legislate This | Making Legislation Accessible",
    description: "Learn about our mission to make Congress make sense. We're a team of young people breaking down complex legislation and profiling every member of Congress in plain language.",
  },
  alternates: {
    canonical: "/about",
  },
}

export default function About() {
  // Team member data - duplicated to simulate larger team
  const teamMembers = [
    {
      id: 1,
      name: "Matias Sevak",
      role: "Co-Founder & CEO",
      defaultImage: "/Matias1.jpg?height=300&width=240",
      hoverImage: "/MatiasBaby2.JPG?height=300&width=240",
    },
    {
      id: 2,
      name: "Didi Pathial",
      role: "Co-Founder & Lead Editor",
      defaultImage: "/Didi1.JPG?height=300&width=240",
      hoverImage: "/DidiBaby2.jpg?height=300&width=240",
    },
    {
      id: 3,
      name: "Jonah Levy",
      role: "Co Founder & Lead Publisher",
      defaultImage: "/Jonah1.JPG?height=300&width=240",
      hoverImage: "/JonahBaby2.jpg?height=300&width=240",
    },
    {
      id: 4,
      name: "Matias Sevak",
      role: "Lead Developer & Designer",
      defaultImage: "/Matias1.jpg?height=300&width=240",
      hoverImage: "/MatiasBaby2.JPG?height=300&width=240",
    },
    {
      id: 5,
      name: "Evan Donath",
      role: "Co & Founder & Head of Research",
      defaultImage: "/Evan1.JPG?height=300&width=240",
      hoverImage: "/EvanBaby2.JPG?height=300&width=240",
    },
    {
      id: 6,
      name: "Matias Sevak",
      role: "Marketing & Outreach",
      defaultImage: "/Matias1.jpg?height=300&width=240",
      hoverImage: "/MatiasBaby2.JPG?height=300&width=240",
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
                  At Legislate This, we're on a mission to make Congress make sense.
We believe everyone deserves to understand the laws that shape their lives (without needing a law degree). That's why we break down complex legislation and profile every member of Congress in plain, readable language. Whether you're trying to understand a new bill or figure out if your representative actually represents you, we give you the tools to stay informed and empowered.
We're not just another news app.


                  </p>
                  <p className="text-muted-foreground">
                  We believe that informed people make stronger democracies.
                   If elected officials aren't voting in line with their constituents' values, 
                   people deserve to know. If a new bill could change your rights, your neighborhood, 
                   or your future, we'll explain it. Clearly, quickly, and without the political noise.
                  Legislate This exists to empower citizens with facts, not spin.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">Our Values</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Transparency in government</li>
                    <li>• Accessible information for all</li>
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
                 My name is Matias, im 16 and I started Legislate This with three of my friends because we were tired of how hard it is to understand what's happening in Congress. Every time we looked up a new bill or tried to figure out what our representatives were doing, we'd find confusing articles, outdated sites, or walls of legal jargon. So we decided to build something better.

                  </p>
                  <p className="text-muted-foreground">
                  Together, we created a platform that combines clear breakdowns of legislation with searchable profiles of every member of Congress, their voting history, where their money comes from, and whether they're really serving the people.

We didn't want to just copy existing news apps. We wanted something actually useful. Something that feels real, honest, and welcoming.



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
                <p className="text-muted-foreground italic">and their baby photos.</p>
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
