const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());

let notes = [
  {
    id: 1,
    title: "Catatan Pertama",
    author: "Penulis Pertama",
    content: "Ini adalah catatan pertama.",
  },
  {
    id: 2,
    title: "Catatan Kedua",
    author: "Penulis Pertama",
    content: "Ini adalah catatan kedua.",
  },
];

app.get("/notes", (req, res) => {
  if (notes.length === 0) {
    return res.json({ msg: "Tidak ada catatan ditemukan" });
  }

  res.json(notes);
});

app.post("/notes", (req, res) => {
  const { title, author, content } = req.body;
  const newNote = {
    id: notes.length + 1,
    title,
    author,
    content,
  };
  if (!newNote.title || !newNote.author || !newNote.content) {
    return res.status(404).json({ msg: "data yang anda masukkan salah" });
  }
  notes.push(newNote);
  res.status(201).json({ msg: "Data berhasil ditambahkan" });
});

app.get("/notes/:id", (req, res) => {
  const noteId = parseInt(req.params.id);
  const note = notes.find((note) => note.id === noteId);
  if (!note) {
    return res.status(400).json({ msg: "Data tidak ditemukan" });
  }
  res.status(200).send(note);
});

app.put("/notes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, author, content } = req.body;
  const note = notes.findIndex((note) => note.id === id);
  if (note === -1) {
    return res.status(404).json({ msg: "Catatan tidak ditemukan" });
  }
  notes[note] = {
    id,
    title,
    author,
    content,
  };
  res.status(202).json({ msg: "Catatan berhasil diubah" });
});

app.delete("/notes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const note = notes.findIndex((note) => note.id === id);
  if (note === -1) {
    return res.status(400).json({ msg: "Catatan tidak ditemukan" });
  }
  notes.splice(note, 1);
  res.json(notes);
});

app.listen(port, () => {
  console.log(`server sedang berjalan di http://localhost:${port}`);
});
