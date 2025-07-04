"use client"

interface SocialIconsProps {
  className?: string
}

export function SocialIcons({ className = "" }: SocialIconsProps) {
  const socialLinks = [
    {
      name: "Twitter",
      url: "https://twitter.com/legislatethis",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/company/legislatethis",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      url: "https://instagram.com/legislatethis",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12.017 0C8.396 0 7.989.016 6.756.072 5.526.127 4.718.302 4.019.57c-.72.28-1.33.653-1.938 1.26C1.474 2.438 1.101 3.048.821 3.767c-.268.7-.443 1.507-.498 2.738C.266 7.738.25 8.145.25 11.766s.016 4.028.072 5.261c.055 1.231.23 2.038.498 2.738.28.72.653 1.33 1.26 1.938.607.607 1.217.98 1.938 1.26.7.268 1.507.443 2.738.498 1.233.056 1.64.072 5.261.072s4.028-.016 5.261-.072c1.231-.055 2.038-.23 2.738-.498.72-.28 1.33-.653 1.938-1.26.607-.607.98-1.217 1.26-1.938.268-.7.443-1.507.498-2.738.056-1.233.072-1.64.072-5.261s-.016-4.028-.072-5.261c-.055-1.231-.23-2.038-.498-2.738-.28-.72-.653-1.33-1.26-1.938C19.562 1.474 18.952 1.101 18.233.821c-.7-.268-1.507-.443-2.738-.498C14.262.266 13.855.25 12.234.25h-.217zm-.148 2.178c.382-.001.765-.001 1.148 0 3.508 0 3.923.016 5.307.071 1.281.058 1.977.27 2.441.448.614.239 1.052.525 1.513.986.461.461.747.899.986 1.513.178.464.39 1.16.448 2.441.055 1.384.071 1.799.071 5.307s-.016 3.923-.071 5.307c-.058 1.281-.27 1.977-.448 2.441-.239.614-.525 1.052-.986 1.513-.461.461-.899.747-1.513.986-.464.178-1.16.39-2.441.448-1.384.055-1.799.071-5.307.071s-3.923-.016-5.307-.071c-1.281-.058-1.977-.27-2.441-.448-.614-.239-1.052-.525-1.513-.986-.461-.461-.747-.899-.986-1.513-.178-.464-.39-1.16-.448-2.441-.055-1.384-.071-1.799-.071-5.307s.016-3.923.071-5.307c.058-1.281.27-1.977.448-2.441.239-.614.525-1.052.986-1.513.461-.461.899-.747 1.513-.986.464-.178 1.16-.39 2.441-.448 1.211-.055 1.679-.071 4.159-.071z" />
          <path d="M12.017 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12.017 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
          <circle cx="18.406" cy="5.594" r="1.44" />
        </svg>
      ),
    },
  ]

  return (
    <div className={`flex gap-4 ${className}`}>
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
          title={social.name}
        >
          {social.icon}
        </a>
      ))}
    </div>
  )
}
