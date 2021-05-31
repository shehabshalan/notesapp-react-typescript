import React, { useEffect, useState } from "react";

import Container from "@material-ui/core/Container";
import NoteCard from "../components/NoteCard";
import Masonry from "react-masonry-css";
export default function Notes() {
  const initialState = {
    notes: localStorage.getItem("notes")
      ? JSON.parse(localStorage.getItem("notes") as any)
      : [],
  };
  const [notes, setNotes] = useState(initialState.notes);
  useEffect(() => {
    setNotes(initialState.notes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleDelete = async (id: any) => {
    const newNotes = notes.filter((note: any) => note.id !== id);
    console.log(newNotes);
    setNotes(newNotes);
    localStorage.setItem("notes", JSON.stringify(newNotes));
  };

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  };
  return (
    <Container>
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {notes.map((note: any) => (
          <div key={note.id}>
            <NoteCard note={note} handleDelete={handleDelete} />
          </div>
        ))}
      </Masonry>
    </Container>
  );
}
