import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateNotes = ({ closeModal, initialTitle, initialAuthor, initialContent, noteId }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);

  const updateNotes = async () => {
    try {
      console.log(selectedNote);
      if (selectedNote && selectedNote.id) {
        await axios.put(`http://localhost:3000/notes/${selectedNote.id}`, {
          title,
          author,
          content,
        });
        closeModal();

        toast.info("Catatan berhasil diubah");
      } else {
        console.log("selected note is null");
      }
    } catch (error) {
      console.error(error);
      toast.error("Catatan gagal diubah");
    }
  };

  useEffect(() => {
    setTitle(initialTitle || "");
    setAuthor(initialAuthor || "");
    setContent(initialContent || "");
    setSelectedNote({
      id: noteId,
      title: initialTitle,
      author: initialAuthor,
      content: initialContent,
    });
  }, [initialTitle, initialAuthor, initialContent, noteId]);

  return (
    <div className="w-full h-screen fixed z-50 top-0 pt-32 backdrop-blur-sm">
      <div className="w-96 m-auto border border-primary p-4 modal-box modal-top rounded-md  transition-all">
        <h1 className="font-bold text-3xl text-primary my-5">Update Notes</h1>
        <div className="">
          <div className="">
            <form action="" className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Masukkan Judul"
                name="title"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input input-bordered input-primary w-full"
              />
              <input
                type="text"
                placeholder="Masukkan Nama Penulis"
                name="author"
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="input input-bordered input-primary w-full"
              />
              <textarea
                name="content"
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="textarea textarea-primary"
                placeholder="Masukkan Catatan"
              ></textarea>

              <button className="btn btn-primary mt-1" onClick={updateNotes} type="button">
                Ubah
              </button>
              <button className="btn btn-primary mt-1" onClick={closeModal} type="button">
                Tutup
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateNotes;
