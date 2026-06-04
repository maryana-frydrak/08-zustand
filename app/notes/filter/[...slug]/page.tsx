import { fetchNotes } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import type { Metadata } from "next";

interface FilteredNotesPageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: FilteredNotesPageProps): Promise<Metadata> {
  const { slug } = await params;
  const filterName = slug[0] === "all" ? "All" : slug[0];
  return {
    title: `Notes filtered by ${filterName} - NoteHub`,
    description: `Browse your personal notes filtered by ${filterName}`,
    openGraph: {
      title: `Notes filtered by ${filterName} - NoteHub`,
      description: `Browse your personal notes filtered by ${filterName}`,
      url: `/notes/filter/${slug.join("/")}`,
      images: [
        { url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg" },
      ],
    },
  };
}

export default async function FilteredNotesPage({
  params,
}: FilteredNotesPageProps) {
  const { slug } = await params;
  const tag = slug[0] === "all" ? null : slug[0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", tag],
    queryFn: () => fetchNotes(1, 10, tag, ""),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
