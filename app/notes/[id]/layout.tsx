interface NotesLayoutProps {
  children: React.ReactNode;
}

const NotesLayout = ({ children }: NotesLayoutProps) => {
  return <div>{children}</div>;
};

export default NotesLayout;
