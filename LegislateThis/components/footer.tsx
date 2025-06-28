"use client"
import { useRouter } from "next/navigation"

export function Footer() {
  const router = useRouter()

  const handleLinkClick = (href: string) => {
    if (href.startsWith("#")) {
      // Handle placeholder links
      return
    }
    router.push(href)
  }

  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Bottom Bar */}
        <div className="pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-muted-foreground">
              <p>&copy; {new Date().getFullYear()} Legislate This. All rights reserved.</p>
              <div className="flex gap-4">
                <button onClick={() => handleLinkClick("/about")} className="hover:text-foreground transition-colors">
                  About Us
                </button>
                <button onClick={() => handleLinkClick("/contact")} className="hover:text-foreground transition-colors">
                  Contact
                </button>
                <button onClick={() => handleLinkClick("/information")} className="hover:text-foreground transition-colors">
                  Information
                </button>
                <button onClick={() => handleLinkClick("/privacy")} className="hover:text-foreground transition-colors">
                  Privacy
                </button>
                <button onClick={() => handleLinkClick("/terms")} className="hover:text-foreground transition-colors">
                  Terms
                </button>
                <button onClick={() => handleLinkClick("/faqs")} className="hover:text-foreground transition-colors">
                  FAQs 
                </button>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>Built with purpose for democracy.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
