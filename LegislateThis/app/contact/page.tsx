import { Suspense } from "react"
import { Navigation } from "@/components/navigation"
import ClientPage from "./ClientPage"     // ← the real page lives here

export default function ContactPage() {
  return (
    <Suspense fallback={<Fallback />}>
      <ClientPage />
    </Suspense>
  )
}

function Fallback() {
  // Ultra-simple markup that can be prerendered statically
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow pt-20" />
    </div>
  )
}
