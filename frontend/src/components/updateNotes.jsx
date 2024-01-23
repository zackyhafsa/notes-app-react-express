import React, { useEffect, useState } from "react";
import axios from "axios";

const UpdateNotes = ({ closeModal, initialTitle, initialAuthor, initialContent }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  const updateNotes = async (updatedNote) => {
    await axios.put(`http://localhost:3000/notes/${updatedNote}`, {
      title,
      author,
      content,
    });
  };

  useEffect(() => {
    setTitle(initialTitle || "");
    setAuthor(initialAuthor || "");
    setContent(initialContent || "");
  }, [initialTitle, initialAuthor, initialContent]);

  return (
    <div className="w-full h-screen fixed z-50 top-0 pt-36 backdrop-blur-sm">
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
                value={initialTitle}
                onChange={(e) => setTitle(e.target.value)}
                className="input input-bordered input-primary w-full"
              />
              <input
                type="text"
                placeholder="Masukkan Nama Penulis"
                name="author"
                id="author"
                value={initialAuthor}
                onChange={(e) => setAuthor(e.target.value)}
                className="input input-bordered input-primary w-full"
              />
              <textarea
                name="content"
                id="content"
                value={initialContent}
                onChange={(e) => setContent(e.target.value)}
                className="textarea textarea-primary"
                placeholder="Masukkan Catatan"
              ></textarea>

              <button className="btn btn-primary mt-1" onClick={ updateNotes}type="button">
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
