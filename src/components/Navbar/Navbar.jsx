import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userAtom } from "@/Atoms/userAtom";
import { countNote } from "@/Atoms/countNote";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useRecoilState(userAtom);
  const [noteLength] = useRecoilState(countNote);
  const navigate = useNavigate();

  // 🧩 تسجيل الخروج
  const handleLogout = () => {
    setToken(null);
    setIsOpen(false);
    navigate("/allNotes"); // بعد اللوج آوت يروح للنوتات العامة
  };

  // 🧩 عند الضغط على اللوجو
  const handleLogoClick = (e) => {
    e.preventDefault();
    if (token) {
      navigate("/"); // لو عامل لوجين يروح للصفحة الرئيسية
    } else {
      navigate("/allNotes"); // لو مش عامل لوجين يروح للنوتات العامة
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-blue-500 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 🧩 Logo */}
          <button
            onClick={handleLogoClick}
            className="flex items-center space-x-2 group"
          >
            <i className="fa-solid fa-note-sticky text-white fa-xl transition"></i>
            <span className="text-2xl font-bold text-white transition">
              NoteApp
            </span>
          </button>

          {/* 🧩 Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {token ? (
              <>
                {/* Notes Counter */}
                <div className="relative">
                  <i className="fa-solid fa-box-open text-white text-xl cursor-pointer hover:text-gray-200 transition"></i>
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md flex items-center justify-center">
                    {noteLength}
                  </span>
                </div>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-white hover:text-gray-200 font-medium transition"
                >
                  <i className="fa-solid fa-right-from-bracket"></i>
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* 🔹 All Notes Public */}
   

                {/* Login & Register */}
                <Link
                  to="/Authuncation/login"
                  className="text-white hover:text-gray-200 font-medium transition"
                >
                  Login
                </Link>
                <Link
                  to="/Authuncation/register"
                  className="text-white hover:text-gray-200 font-medium transition"
                >
                  Register
                </Link>
              </>
            )}

            {/* 🧩 Social Icons */}
            <div className="flex items-center gap-4 ml-4">
              <Link
                to="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-200 transition"
              >
                <i className="fa-brands fa-facebook-f"></i>
              </Link>
              <Link
                to="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-200 transition"
              >
                <i className="fa-brands fa-twitter"></i>
              </Link>
              <Link
                to="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-200 transition"
              >
                <i className="fa-brands fa-instagram"></i>
              </Link>
            </div>
          </div>

          {/* 🧩 Mobile Menu Button */}
          <button
            className="md:hidden text-white hover:text-gray-200 transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* 🧩 Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-blue-500 border-t border-gray-200 shadow-sm">
          <div className="flex flex-col px-4 py-3 space-y-3">
            {token ? (
              <>
                <div className="relative self-start">
                  <i className="fa-solid fa-box-open text-white text-xl"></i>
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md flex items-center justify-center">
                    {noteLength}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-white hover:text-gray-200 font-medium transition"
                >
                  <i className="fa-solid fa-right-from-bracket"></i>
                  Logout
                </button>
              </>
            ) : (
              <>

                <Link
                  to="/Authuncation/login"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-gray-200 font-medium transition"
                >
                  Login
                </Link>
                <Link
                  to="/Authuncation/register"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-gray-200 font-medium transition"
                >
                  Register
                </Link>
              </>
            )}

            {/* Social Icons */}
            <div className="flex justify-center gap-6 mt-3">
              <i className="fa-brands fa-facebook-f text-white hover:text-gray-200"></i>
              <i className="fa-brands fa-twitter text-white hover:text-gray-200"></i>
              <i className="fa-brands fa-instagram text-white hover:text-gray-200"></i>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
