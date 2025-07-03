# Legislate This

[![Website](https://img.shields.io/badge/Website-legislatethis.org-blue?logo=google-chrome)](https://legislatethis.org)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## Overview

**Legislate This** is an open-source platform dedicated to making Congress and legislation accessible and understandable for everyone. We break down complex bills, profile every member of Congress, and empower citizens with clear, non-partisan information—without the legal jargon or political noise.

Visit the live site: [legislatethis.org](https://legislatethis.org)

---

## Mission

> "At Legislate This, we're on a mission to make Congress make sense. We believe everyone deserves to understand the laws that shape their lives (without needing a law degree). We break down complex legislation and profile every member of Congress in plain, readable language. Legislate This exists to empower citizens with facts, not spin."

---

## Features

- **Legislative News**: Stay up to date with the latest legislative news, bill updates, and congressional activity.
- **Bill Summaries**: Clear, concise breakdowns of complex bills and legislative processes.
- **Congress Directory**: Search and explore all members of Congress, view their voting records, and understand their priorities.
- **Powerful Search**: Find bills, legislation, articles, and congressional information quickly.
- **FAQs & Information**: Get answers to common questions and learn how bills become laws.
- **Contact & Engagement**: Tools to help you contact your representatives and engage with the legislative process.
- **Privacy & Terms**: Transparent privacy policy and terms of service.
- **Accessibility**: Designed for clarity, accessibility, and ease of use for all users.
- **PWA Support**: Installable as a Progressive Web App for mobile and desktop.
- **Custom 404 Page**: Friendly error handling for missing pages.
- **Custom Cursors**: Selectable cursors in the nav bar
- **Multiple Themes**: Multiple themes to choose from for different colors
- **Rain Sounds**: Fun Rain Sounds you can play while you browse

---

## Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/) (React 19, App Router, SSR/SSG)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom themes and [tailwindcss-animate](https://github.com/joe-bell/tailwindcss-animate)
- **TypeScript**: End-to-end type safety
- **State Management**: React Context (e.g., AudioProvider, ThemeProvider)
- **Backend/Hosting**: [Firebase Functions](https://firebase.google.com/docs/functions), Firebase Hosting
- **Database**: Firestore (for articles, user data, etc.)
- **SEO**: Dynamic metadata, Open Graph, Twitter Cards, JSON-LD, dynamic sitemap, robots.txt
- **PWA**: Manifest, offline support, installable app
- **Testing/Linting**: ESLint, TypeScript strict mode

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- pnpm, npm, or yarn

### Installation

```bash
# Clone the repository
https://github.com/sneezed/LegislateThis.git
cd LegislateThis/LegislateThis

# Install dependencies
pnpm install # or npm install or yarn install or npm install --peer-legacy-deps
```

### Development

```bash
# Start the development server
pnpm dev # or npm run dev or yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app locally.

### Build & Production

```bash
# Build for production
pnpm build # or npm run build or yarn build

# Start the production server
pnpm start # or npm start or yarn start
```

---

## Deployment

- **Firebase Hosting**: The app is deployed using Firebase Hosting and serverless functions for SSR.
- **PWA**: Fully installable on mobile and desktop.
- **SEO**: Dynamic sitemap and robots.txt for search engine indexing.

---

## Contributing

We welcome contributions from the community! To get started:

1. Fork this repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes and commit them (`git commit -m 'Add new feature'`)
4. Push to your fork (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License.

---

## Acknowledgments

- Built by Matias Sevak and the Legislate This team
- Inspired by a mission for legislative transparency and civic engagement
- Uses data from official government sources and trusted news outlets

---

## Contact

- Email: [contact.legislate.this@gmail.com](mailto:contact.legislate.this@gmail.com)
- [Contact Form](https://legislatethis.org/contact)
- [About the Team](https://legislatethis.org/about) 
