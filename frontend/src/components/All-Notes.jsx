import React, { useEffect, useState } from "react";
import NotesForm from "./Notes-form";
import axios from "axios";
import UpdateNotes from "./updateNotes";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [updateNote, setUpdateNote] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (note) => {
    setUpdateNote(note);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/notes");
        setNotes(response.data);
      } catch (error) {
        console.error("Data tidak Ditemukan:", error);
      }
    };

    fetchData();
  }, []);

  const deleteNote = async (noteId) => {
    await axios.delete(`http://localhost:3000/notes/${noteId}`);
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
  };

  return (
    <div className="">
      <NotesForm />
      {isModalOpen && (
        <UpdateNotes
          closeModal={() => setIsModalOpen(false)}
          initialTitle={updateNote.title}
          initialAuthor={updateNote.author}
          initialContent={updateNote.content}
        />
      )}
      <div className="w-full mt-6">
        <div className="w-[70%] mx-auto grid grid-cols-3 gap-2">
          {Array.isArray(notes) && notes.length > 0 ? (
            notes.map((note) => {
              return (
                <div
                  className="card w-auto bg-base-100 shadow-xl border border-primary"
                  key={note.id}
                >
                  <div className="card-body">
                    <h2 className="card-title">{note.title}</h2>
                    <h3 className="text-slate-400">{note.author}</h3>
                    <p>{note.content}</p>
                    <div className="w-full flex gap-2">
                      <button
                        className="btn btn-primary mt-4 w-1/2"
                        onClick={() => deleteNote(note.id)}
                      >
                        Hapus
                      </button>
                      <button
                        className="btn btn-primary mt-4 w-1/2"
                        onClick={() => openModal(note)}
                      >
                        Ubah
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>Tidak ada Catatan</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notes;
