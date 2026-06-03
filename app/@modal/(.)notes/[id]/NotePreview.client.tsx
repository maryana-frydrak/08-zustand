"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import { Modal } from "@/components/Modal/Modal";
import { Note } from "@/types/note";

type NotePreviewClientProps = Record<string, never>;

export default function NotePreviewClient({}: NotePreviewClientProps) {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });
  if (isLoading) return <div>Loading...</div>;
  if (error || !note) return <div>Error loading note</div>;

  return (
    <Modal onClose={() => router.back()}>
      <div>
        <h2>{note.title}</h2>
        <p>{note.content}</p>
        <p>Tag: {note.tag}</p>
        <p>Created at: {new Date(note.createdAt).toLocaleDateString()}</p>
        <button onClick={() => router.back()}>Close</button>
      </div>
    </Modal>
  );
}
