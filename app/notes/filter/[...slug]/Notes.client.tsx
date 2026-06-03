"use client";

import { JSX, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import { SearchBox } from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import NoteList from "@/components/NoteList/NoteList";

interface NotesClientProps {
  tag: string | null;
}

export default function NotesClient({ tag }: NotesClientProps): JSX.Element {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const { data } = useQuery({
    queryKey: ["notes", tag, page, debouncedSearch],
    queryFn: () => fetchNotes(page, 10, tag ?? "", debouncedSearch),
  });
  if (!data || !data.notes) {
    return <div>Loading...</div>;
  }
  return (
    <div className="notes-container">
      <SearchBox onChange={handleSearchChange} />
      {data?.notes && data.notes.length > 0 ? (
        <NoteList notes={data.notes} />
      ) : (
        <p>No notes found.</p>
      )}
      <Pagination
        currentPage={page}
        onPageChange={(selectedItem: { selected: number }) =>
          setPage(selectedItem.selected + 1)
        }
        pageCount={data?.totalPages || 1}
      />
      <button onClick={() => setIsModalOpen(true)}>Add New Note</button>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
