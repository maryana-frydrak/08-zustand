import Link from "next/link";
import css from "./SidebarNotes.module.css";

export default function Default() {
  const tags = ["All notes", "Todo", "Work", "Personal", "Meeting", "Shopping"];
  return (
    <nav>
      <ul className={css.menuList}>
        {tags.map((tag) => (
          <li key={tag} className={css.menuItem}>
            <Link
              href={
                tag === "All notes"
                  ? "/notes/filter/all"
                  : `/notes/filter/${tag}`
              }
            >
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
