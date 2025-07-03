"use client"

import { Navigation } from "@/components/navigation"
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useRouter } from "next/navigation"
import { ReactNode } from 'react'

interface FAQ {
  id: string
  question: string
  answer: string | ReactNode
  category: "general" | "legislation" | "account" | "technical"
}

const faqs: FAQ[] = [
  {
    id: "1",
    question: "What is Legislate This?",
    answer:
      "Legislate This is a platform designed to make legislation accessible, understandable, and actionable for everyone. We provide clear summaries of bills, track legislative progress, and help citizens engage with the democratic process.",
    category: "general",
  },
  {
    id: "2",
    question: "How do I track a specific bill?",
    answer:
      "You can track bills by using our search function to find the legislation you're interested in. Once you find a bill, you can bookmark it or subscribe to updates to receive notifications about its progress through the legislative process.",
    category: "legislation",
  },
  {
    id: "3",
    question: "Is Legislate This politically biased?",
    answer:
      "No, Legislate This maintains a strictly non-partisan approach. We present factual information about legislation without political commentary or bias. Our goal is to inform, not influence political opinions.",
    category: "general",
  },
  {
    id: "4",
    question: "How often is the legislative information updated?",
    answer:
      "We're a small team still in the early stages of development, so our legislative information isn't updated in real time. However, we aim to publish accurate summaries and updates on a weekly basis",
    category: "legislation",
  },
  {
    id: "5",
    question: "Do I need to create an account to use the site?",
    answer:
      "No, you can browse all of our content without creating an account. But let us know if you would like an accounts feature on this site to save articles and have more personalization.",
    category: "account",
  },
  {
    id: "6",
    question: "How can I contact my representatives?",
    answer: (
      <>
        You can find your local, state, and federal representatives using the{" "}
        <a
          href="https://www.commoncause.org/find-your-representative/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          Common Cause tool
        </a>
        . Just enter your ZIP code to get their contact info. Also, in our articles, we will usually say who was voting on the legislation.
      </>
    ),
    category: "general",
  },
  {
    id: "7",
    question: "What types of legislation do you cover?",
    answer:
      "We cover federal legislation including bills, resolutions, and amendments in both the House and Senate. We also provide information about committee activities, hearings, and voting records.",
    category: "legislation",
  },
  {
    id: "8",
    question: "Is my personal information secure?",
    answer:
      "Yes, we take data security seriously. We use industry-standard encryption and security measures to protect your personal information. For detailed information about our data practices, please review our Privacy Policy.",
    category: "account",
  },
  {
    id: "9",
    question: "Why is the site running slowly?",
    answer:
      "If you're experiencing slow loading times, try clearing your browser cache or checking your internet connection. If problems persist, please contact our support team with details about your browser and device.",
    category: "technical",
  },
  {
    id: "10",
    question: "Can I share articles and bill summaries?",
    answer:
      "Yes, all our content is designed to be shareable. You can share articles, bill summaries, and other content via social media, email, or direct links. We encourage sharing to help spread civic engagement.",
    category: "general",
  },
  {
    id: "11",
    question: "How do I report incorrect information?",
    answer:
      "If you notice any incorrect or outdated information, please contact us immediately through our contact form or email. We take accuracy seriously and will investigate and correct any errors promptly.",
    category: "technical",
  },
  {
    id: "12",
    question: "Do you offer educational resources?",
    answer:
      "Yes, our Information section provides educational resources about the legislative process, how bills become laws, and ways to engage with your representatives. We also offer guides for civic participation.",
    category: "general",
  },
  {
    id: "13",
    question: "Why can I choose my own cursor?",
    answer:
      "We can't stand how cluttered and ad-filled most news apps are. So when designing Legislate This, we wanted it to feel different, clean, simple, and approachable for people of all ages. As a fun bonus, we also added custom cursors, themes, and relaxing rain sounds.",
    category: "general",
  },
]

export default function FAQsClientPage() {
  const router = useRouter()
  const [openFAQ, setOpenFAQ] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const categories = [
    { id: "all", name: "All Questions" },
    { id: "general", name: "General" },
    { id: "legislation", name: "Legislation" },
    { id: "account", name: "Account" },
    { id: "technical", name: "Technical" },
  ]

  const filteredFAQs = selectedCategory === "all" ? faqs : faqs.filter((faq) => faq.category === selectedCategory)

  const toggleFAQ = (id: string) => {
    setOpenFAQ(openFAQ === id ? null : id)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Main Content */}
      <main className="flex-grow pt-20">
        {/* Hero Title */}
        <div className="py-16 px-4">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter">FAQs</h1>
          <p className="text-xl text-muted-foreground mt-4 max-w-2xl">
            Find answers to commonly asked questions about Legislate This and how to use our platform.
          </p>
        </div>

        {/* Content */}
        <div className="border-t border-border">
          <div className="max-w-4xl mx-auto p-6">
            {/* Category Filter */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">Filter by Category</h2>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 text-sm border border-border transition-colors ${
                      selectedCategory === category.id ? "bg-black text-white" : "hover:bg-muted"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* FAQ List */}
            <div className="space-y-4">
              {filteredFAQs.map((faq) => (
                <div key={faq.id} className="border border-border">
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full p-4 text-left flex items-center justify-between hover:bg-muted transition-colors"
                  >
                    <span className="font-semibold pr-4">{faq.question}</span>
                    {openFAQ === faq.id ? (
                      <ChevronUp className="h-5 w-5 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 flex-shrink-0" />
                    )}
                  </button>
                  {openFAQ === faq.id && (
                    <div className="px-4 pb-4 border-t border-border">
                      <p className="text-muted-foreground leading-relaxed pt-4">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Contact Section */}
            <div className="mt-12 p-6 border border-border bg-muted">
              <h3 className="text-lg font-semibold mb-2">Still have questions?</h3>
              <p className="text-muted-foreground mb-4">
                Can't find the answer you're looking for? Our support team is here to help.
              </p>
              <button
              onClick={() => router.push('/contact')}
              className="inline-block px-4 py-2 border border-black hover:bg-black hover:text-white transition-colors"
            >
              Contact Us
            </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 