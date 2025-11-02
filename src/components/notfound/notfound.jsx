import React from "react";
import { Link } from "react-router-dom";
import img from "../../assets/istockphoto-2237665008-1024x1024.jpg";

export default function Notfound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <img
        src={img} 
        alt="Not Found"
        className="object-contain"
      />

      <h1 className="text-4xl font-bold text-gray-800 mt-6">
        Page Not Found
      </h1>

      <p className="text-gray-500 mt-2">
        Sorry, the page you’re looking for doesn’t exist.
      </p>

      <Link
        to="/home"
        className="mt-6 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Go Home
      </Link>
    </div>
  );
}
