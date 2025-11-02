"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function AllNotes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = 20; // ✅ عرض 20 نوتة في كل صفحة

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get(
          "https://note-sigma-black.vercel.app/api/v1/notes/allNotes"
        );
        setNotes(res.data.notes || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  // الحسابات الخاصة بالصفحات
  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote);
  const totalPages = Math.ceil(notes.length / notesPerPage);

  // توليد أرقام الصفحات الذكية
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 3; // ✅ عدد الصفحات المعروضة حول الصفحة الحالية
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= maxVisible + 2) {
        for (let i = 1; i <= maxVisible + 2; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - (maxVisible + 1)) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - (maxVisible + 1); i <= totalPages; i++)
          pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-500 text-lg">Loading notes...</p>
      </div>
    );

  return (
    <div className="mt-20 max-w-7xl mx-auto px-4">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center mb-10 text-blue-600">
        Public Notes
      </h1>

      {/* Notes Grid */}
      {currentNotes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentNotes.map((note) => (
            <div
              key={note._id}
              className="bg-white shadow-lg p-5 rounded-2xl border border-gray-100 hover:shadow-2xl transition transform hover:-translate-y-1"
            >
              <h2 className="font-semibold text-xl text-gray-800 mb-2 truncate">
                {note.title}
              </h2>
              <p className="text-gray-600 text-sm line-clamp-4">
                {note.content || "No content available"}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600 mt-10">
          No public notes found.
        </div>
      )}

      {/* Pagination */}
      {notes.length > notesPerPage && (
        <div className="flex justify-center items-center gap-3 mt-12 flex-wrap">
          {/* Previous */}
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600 shadow"
            }`}
          >
            <ChevronLeft size={18} />
          </button>

          {/* Page Numbers */}
          {getPageNumbers().map((page, index) =>
            page === "..." ? (
              <span key={index} className="px-2 text-gray-500">
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 flex items-center justify-center rounded-full border text-sm font-medium transition ${
                  currentPage === page
                    ? "bg-blue-600 text-white shadow"
                    : "bg-gray-100 text-gray-700 hover:bg-blue-100"
                }`}
              >
                {page}
              </button>
            )
          )}

          {/* Next */}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600 shadow"
            }`}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}

      {/* Register/Login CTA */}
      <div className="text-center mt-14 mb-8">
        <p className="text-gray-600 mb-3 text-lg">
          Want to add your own notes?
        </p>
        <Link
          to="/Authuncation/register"
          className="bg-blue-500 text-white px-6 py-2.5 rounded-lg hover:bg-blue-600 transition text-base font-medium shadow-md"
        >
          Register or Login to Add Notes
        </Link>
      </div>
    </div>
  );
}
