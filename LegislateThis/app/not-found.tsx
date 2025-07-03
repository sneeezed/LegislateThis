"use client";

import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = typeof window !== "undefined" ? require('next/navigation').useRouter() : null;
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-grow flex flex-col items-center justify-center pt-20 pb-16 px-4">
        <div className="text-center">
          <h1 className="text-7xl md:text-9xl font-extrabold text-black mb-6 tracking-tighter">404</h1>
          <h2 className="text-2xl md:text-4xl font-bold mb-4">Page Not Found</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Sorry, the page you are looking for doesn't exist or has been moved.<br />
            Try searching for a bill, browsing the news, or return to the homepage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => router && router.push("/")}
              className="border border-black rounded-none hover:bg-black hover:text-white"
              variant="outline"
            >
              Go Home
            </Button>
            <Button
              onClick={() => router && router.push("/news")}
              className="border border-black rounded-none hover:bg-black hover:text-white"
              variant="outline"
            >
              Browse News
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
} 