import React from "react";

const DeleteModal = ({ closeModal, deleteNote }) => {
  return (
    <div className="w-full h-screen fixed z-50 top-0 pt-36 backdrop-blur-sm">
      <div className="w-96 mx-auto modal-box">
        <div>
          <h1 className="font-bold text-xl">Yakin?</h1>
          <h1 className="my-4">Apakah anda ingin menghapus Catatan ini?</h1>
        </div>
        <div className="w-full flex justify-center gap-5">
          <button className="btn btn-primary w-1/2" onClick={closeModal}>
            Batal
          </button>
          <button className="btn btn-primary w-1/2" onClick={deleteNote}>
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
