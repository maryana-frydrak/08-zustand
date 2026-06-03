"use client";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div style={{ padding: "20px", textShadow: "none", color: "red" }}>
      <p>Could not fetch the list of notes. {error.message}</p>
      <button
        onClick={() => reset()}
        style={{ marginTop: "10px", padding: "8px 16px", cursor: "pointer" }}
      >
        Reset Page
      </button>
    </div>
  );
}
