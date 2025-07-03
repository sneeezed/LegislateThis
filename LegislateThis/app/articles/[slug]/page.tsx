/* app/articles/[slug]/page.tsx */
import type { Metadata } from "next";
import ClientPage from "./ClientPage";
import { adminDb } from "@/lib/firebaseAdmin";

export const dynamic = "force-dynamic";

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  // Server-side fetch via Admin SDK
  const snap = await adminDb.collection("articles").doc(params.slug).get();
  if (!snap.exists) {
    return {
      title: "Article not found – Legislate This",
      description: "The requested article could not be located.",
      openGraph: {
        title: "Article not found – Legislate This",
        description: "The requested article could not be located.",
        url: `https://legislatethis.org/articles/${params.slug}`,
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "Article not found – Legislate This",
        description: "The requested article could not be located.",
      },
    };
  }

  const data = snap.data()!;
  const title = data.title as string;
  const summary = data.summary as string;
  const body = data.body as string;
  const tags = (data.tags as string[]) || [];
  const category = data.category as string;
  const publishedAt = data.publishedAt?.toDate?.() || new Date();
  
  // Create optimized description
  const description = summary || 
    body.replace(/\s+/g, " ").slice(0, 150).trimEnd() + "…";
  
  // Create optimized title (under 60 characters)
  const optimizedTitle = title.length > 50 ? 
    `${title.slice(0, 47)}... – Legislate This` : 
    `${title} – Legislate This`;
  
  const url = `https://legislatethis.org/articles/${params.slug}`;
  
  // Create keywords from tags and category
  const keywords = [
    ...tags,
    category,
    "legislation",
    "congress",
    "bill analysis",
    "legislative news",
    "congressional update"
  ].filter(Boolean);

  return {
    title: optimizedTitle,
    description,
    keywords,
    authors: [{ name: "Legislate This Team" }],
    openGraph: {
      type: "article",
      url,
      title: optimizedTitle,
      description,
      siteName: "Legislate This",
      locale: "en_US",
      publishedTime: publishedAt.toISOString(),
      modifiedTime: publishedAt.toISOString(),
      section: category,
      tags: tags,
    },
    twitter: {
      card: "summary_large_image",
      title: optimizedTitle,
      description,
      site: "@legislatethis",
      creator: "@legislatethis",
    },
    alternates: {
      canonical: url,
    },
    other: {
      "article:published_time": publishedAt.toISOString(),
      "article:modified_time": publishedAt.toISOString(),
      "article:section": category,
      "article:tag": tags.join(", "),
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  return <ClientPage slug={params.slug} />;
}
