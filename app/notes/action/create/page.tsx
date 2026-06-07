import css from "./CreateNote.module.css";
import NoteForm from "@/components/NoteForm/NoteForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Note - NoteHub",
  description: "Create a new personal note to keep your ideas organized.",
  openGraph: {
    title: "Create Note - NoteHub",
    description: "Create a new personal note to keep your ideas organized.",
    url: "https://08-zustand-two-lemon.vercel.app/",
    images: [
      { url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg" },
    ],
  },
};

export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
