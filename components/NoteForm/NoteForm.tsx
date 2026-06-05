"use client";

import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { createNote } from "@/lib/api";
import { useNoteStore } from "@/lib/store/noteStore";
import css from "./NoteForm.module.css";

interface NoteFormProps {
  onClose?: () => void;
}

export default function NoteForm({ onClose }: NoteFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteStore();

  const mutation = useMutation({
    mutationFn: (data: { title: string; content: string; tag: string }) =>
      createNote(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success("Note created successfully!");
      clearDraft();
      router.push("/notes/filter/all");
    },
    onError: () => {
      toast.error("Failed to create note.");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const values = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      tag: (formData.get("tag") as string) || "Personal",
    };

    mutation.mutate(values);
  };

  const handleCancel = () => {
    router.back();
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setDraft({ ...draft, [e.target.name]: e.target.value });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        name="title"
        className={css.input}
        value={draft.title}
        onChange={handleInputChange}
        placeholder="Title"
        required
      />
      <textarea
        name="content"
        className={css.textarea}
        value={draft.content}
        onChange={handleInputChange}
        placeholder="Content"
        required
      />
      <select
        name="tag"
        className={css.input}
        value={draft.tag}
        onChange={handleInputChange}
        required
      >
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Meeting">Meeting</option>
        <option value="Shopping">Shopping</option>
        <option value="Todo">Todo</option>
      </select>

      <button
        type="button"
        onClick={() => {
          handleCancel();
          if (onClose) onClose();
        }}
        className={css.button}
      >
        Cancel
      </button>

      <button
        className={css.button}
        type="submit"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Creating..." : "Create Note"}
      </button>
    </form>
  );
}
