"use client"

import React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { EnhancedLiveClock } from "@/components/enhanced-live-clock"
import { SocialIcons } from "@/components/social-icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect } from 'react'


export default function Contact() {
  const [formAction, setFormAction] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const isSubmitted = searchParams.get("success") === "true"

  useEffect(() => {
    // Set form action URL after component mounts on client side
    setFormAction(`${window.location.origin}/contact?success=true`)
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Main Content */}
      <main className="flex-grow pt-20">
        {/* Hero Title */}
        <div className="py-16 px-4">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter">
            Contact
          </h1>
        </div>

        {/* Content Grid */}
        <div className="border-t border-border">
          <div className="grid md:grid-cols-2">
            {/* Left Column */}
            <div className="border-r border-border p-6 flex flex-col justify-start">
              <div>
                <EnhancedLiveClock
                  timezone="America/New_York"
                  city="Washington DC"
                  emoji="🏛️"
                  abbreviation="EST"
                  showSeconds={true}
                />
                <p className="text-muted-foreground">
                  contact@legislatethis.com
                </p>
              </div>

              <div className="mt-20 space-y-4">
                <SocialIcons />
                <button
                  onClick={() => router.push("/privacy")}
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </button>
                <button
                  onClick={() => router.push("/terms")}
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms of Service
                </button>
                <p className="text-muted-foreground">© Legislate This</p>
              </div>
            </div>

            {/* Right Column */}
            <div className="p-6 flex flex-col">
              <div className="flex-grow mb-12">
                <h2 className="text-xl mb-6">Get in Touch</h2>

                {isSubmitted ? (
                  <div className="text-center py-8">
                    <h3 className="text-lg font-semibold mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground">
                      Thank you for contacting us. We'll get back to you soon.
                    </p>
                  </div>
                ) : (
                  <form
                    action="https://formsubmit.co/Matias.sevak@gmail.com"
                    method="POST"
                    className="space-y-4"
                  >
                    {/* disable captcha overlay */}
                    <input type="hidden" name="_captcha" value="false" />
                    {/* redirect back here with ?success=true */}
                    <input
                      type="hidden"
                      name="_next"
                      value={formAction || '/contact?success=true'} // Fallback value
                    />

                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-2"
                      >
                        Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your full name"
                        className="border-b border-border rounded-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-2"
                      >
                        Email *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your.email@example.com"
                        className="border-b border-border rounded-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium mb-2"
                      >
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us how we can help you..."
                        rows={5}
                        className="border border-border rounded-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 resize-none"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full border border-border rounded-none hover:bg-black hover:text-white"
                      variant="outline"
                    >
                      Send Message
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
