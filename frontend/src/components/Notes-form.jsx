import React, { useState } from "react";
import axios from "axios";

const NotesForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  const addNote = async (e) => {
    const response = await axios.post("http://localhost:3000/notes", {
      title,
      author,
      content,
    });

    const newNote = response.data;
    console.log(newNote);
  };


  return (
    <div className="w-full">
      <div className="w-[40%] mx-auto">
        <h1 className="font-bold text-3xl text-primary my-5">Notes App</h1>
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
                cols="20"
                rows="10"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="textarea textarea-primary"
                placeholder="Masukkan Catatan"
              ></textarea>
              <button className="btn btn-primary mt-1" onClick={addNote} type="button">
                Tambah
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesForm;
