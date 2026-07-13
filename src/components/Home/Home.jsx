"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userAtom } from "@/Atoms/userAtom";
import { countNote } from "@/Atoms/countNote";
import { useFormik } from "formik";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import Note from "../Note/Note";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [token] = useRecoilState(userAtom);
  const [noteLength, setNoteLength] = useRecoilState(countNote);
  const [loading, setLoading] = useState(true); // تحميل أولي
  const [isProcessing, setIsProcessing] = useState(false); // 🔹 تحميل أثناء الإضافة / الحذف / التعديل

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);

  // 🔹 Get Notes
  async function getNotes() {
    try {
      const res = await axios.get(
        "https://note-sigma-black.vercel.app/api/v1/notes",
        { headers: { token: `3b8ny__${token}` } }
      );

      if (res.data.msg === "done") {
        setNotes(res.data.notes);
        setNoteLength(res.data.notes.length);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // 🔹 Add Note
  async function addNote(values, { resetForm }) {
    setIsProcessing(true);
    try {
      const res = await axios.post(
        "https://note-sigma-black.vercel.app/api/v1/notes",
        values,
        { headers: { token: `3b8ny__${token}` } }
      );
      if (res.data.msg === "done") {
        setNotes((prev) => [res.data.note, ...prev]);
        setNoteLength((prev) => prev + 1);
        resetForm();
        setIsAddDialogOpen(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  }

  // 🔹 Delete Note
  async function deleteNote(noteId) {
    setIsProcessing(true);
    try {
      const res = await axios.delete(
        `https://note-sigma-black.vercel.app/api/v1/notes/${noteId}`,
        { headers: { token: `3b8ny__${token}` } }
      );
      if (res.data.msg === "done") {
        setNotes((prev) => prev.filter((note) => note._id !== noteId));
        setNoteLength((prev) => (prev > 0 ? prev - 1 : 0));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  }

  async function updateNote(noteId, values) {
    setIsProcessing(true);
    try {
      const res = await axios.put(
        `https://note-sigma-black.vercel.app/api/v1/notes/${noteId}`,
        values,
        { headers: { token: `3b8ny__${token}` } }
      );
      if (res.data.msg === "done") {
        setNotes((prev) =>
          prev.map((note) => (note._id === noteId ? res.data.note : note))
        );
        setIsUpdateDialogOpen(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  }

  // 🔹 Formik for Add
  const addFormik = useFormik({
    initialValues: { title: "", content: "" },
    onSubmit: addNote,
  });

  // 🔹 Formik for Update
  const updateFormik = useFormik({
    initialValues: { title: "", content: "" },
    onSubmit: (values) => updateNote(currentNote._id, values),
    enableReinitialize: true,
  });

  useEffect(() => {
    getNotes();
  }, []);

  const handleAddNoteClick = () => {
    if (!token) {
      alert("❌ Please login or register first to add a note.");
      return;
    }
    setIsAddDialogOpen(true);
  };

  // ✅ Spinner أثناء التحميل الأولي أو أثناء أي عملية
  if (loading || isProcessing) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600 text-lg font-medium">
          {loading ? "Loading your notes..." : "Processing... Please wait."}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 overflow-x-hidden relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mt-24 mb-8">
          <h1 className="text-3xl font-bold text-black">Notes</h1>

          {/* Add Note Button */}
          <button
            onClick={handleAddNoteClick}
            className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Add Note
          </button>

          {/* Add Note Dialog */}
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogContent className="fixed top-60 left-1/2 -translate-x-1/2 w-full max-w-lg rounded-lg border bg-white p-6 shadow-lg">
              <DialogHeader>
                <DialogTitle>Add a New Note</DialogTitle>
                <DialogDescription>
                  Fill in the title and content to create a new note.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={addFormik.handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={addFormik.values.title}
                  onChange={addFormik.handleChange}
                  className="w-full border rounded-md px-3 py-2"
                  required
                />
                <textarea
                  name="content"
                  placeholder="Content"
                  value={addFormik.values.content}
                  onChange={addFormik.handleChange}
                  className="w-full border rounded-md px-3 py-2"
                  rows={4}
                  required
                />
                <DialogFooter className="flex justify-end gap-2">
                  <DialogClose asChild>
                    <button className="bg-gray-300 px-4 py-2 rounded">
                      Cancel
                    </button>
                  </DialogClose>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Add Note
                  </button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Notes Grid */}
        {notes.length === 0 ? (
          <div className="col-span-full text-center text-xl text-gray-600 font-semibold py-12">
            Notes not found
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-10">
            {notes.map((note) => (
              <Note
                key={note._id}
                title={note.title}
                description={note.content || "No description"}
                onEdit={() => {
                  setCurrentNote(note);
                  setIsUpdateDialogOpen(true);
                }}
                onDelete={() => deleteNote(note._id)}
              />
            ))}
          </div>
        )}

        {/* Update Dialog */}
        <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
          <DialogContent className="fixed top-60 left-1/2 -translate-x-1/2 w-full max-w-lg rounded-lg border bg-white p-6 shadow-lg">
            <DialogHeader>
              <DialogTitle>Edit Note</DialogTitle>
              <DialogDescription>
                Edit the note details below.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={updateFormik.handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={updateFormik.values.title}
                onChange={updateFormik.handleChange}
                className="w-full border rounded-md px-3 py-2"
                required
              />
              <textarea
                name="content"
                placeholder="Content"
                value={updateFormik.values.content}
                onChange={updateFormik.handleChange}
                className="w-full border rounded-md px-3 py-2"
                rows={4}
                required
              />
              <DialogFooter className="flex justify-end gap-2">
                <DialogClose asChild>
                  <button className="bg-gray-300 px-4 py-2 rounded">
                    Cancel
                  </button>
                </DialogClose>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Update
                </button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Notes Count */}
        <div className="flex justify-end mt-6">
          <span className="font-semibold text-gray-700 mr-2">
            Notes Number:
          </span>
          <span className="font-bold text-blue-600">{noteLength}</span>
        </div>
      </div>
    </div>
  );
}
