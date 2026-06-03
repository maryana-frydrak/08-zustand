import css from "./LayoutNotes.module.css";

interface FilterLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  modal?: React.ReactNode;
}

export default function FilterLayout({
  children,
  modal,
  sidebar,
}: FilterLayoutProps) {
  return (
    <div style={{ display: "flex" }}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <main className={css.content}>{children}</main>
      {modal}
    </div>
  );
}
