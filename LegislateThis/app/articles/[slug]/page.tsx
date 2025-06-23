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
    };
  }

  const data = snap.data()!;
  const description =
    (data.summary as string) ??
    (data.body as string).replace(/\s+/g, " ").slice(0, 150).trimEnd() + "…";
  const title = data.title as string;
  const url = `https://legislatethis.org/articles/${params.slug}`;

  return {
    title: `${title} – Legislate This`,
    description,
    openGraph: { type: "article", url, title, description },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  return <ClientPage slug={params.slug} />;
}
