import ClientPage from "./ClientPage";              // your existing client component
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/contexts/firebase";

/**
 * Needed for `output: "export"` — must live in this file
 */
export async function generateStaticParams() {
  const snap = await getDocs(collection(db, "articles"));
  return snap.docs.map((doc) => ({ slug: doc.id }));
}

export default function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  // params.slug is now the Firestore document ID
  return <ClientPage slug={params.slug} />;
}
