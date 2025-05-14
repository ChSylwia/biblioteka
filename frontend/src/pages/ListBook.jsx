// src/pages/ListBook.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function ListBook() {
  const [ksiazki, setKsiazki] = useState([]);

  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  const fetchBooks = async (query = "") => {
    try {
      const url = query
        ? `http://localhost:8000/api/ksiazki?tytul=${encodeURIComponent(query)}`
        : "http://localhost:8000/api/ksiazki";
      const res = await fetch(url);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Błąd pobierania książek");
      }
      setKsiazki(data);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Błąd sieciowy");
    }
  };

  useEffect(() => {
    fetchBooks(filter);
  }, [filter]);

  const handleEdit = (book) => {
    navigate(`/books/edit/${book.id}`);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/api/ksiazki/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || "Błąd usuwania książki");
      }
      setKsiazki((ks) => ks.filter((k) => k.id !== id));
      toast.success("Książka została usunięta");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Nie udało się usunąć książki");
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white px-6 py-10">
      <h1 className="text-3xl font-semibold mb-10 text-center">
        Lista książek
      </h1>
      <button
        onClick={() => navigate("/books/add")}
        className="text-lg mb-4 px-4 py-2 bg-blue-600 rounded"
      >
        + Dodaj
      </button>
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Filtruj po tytule..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full md:max-w-sm px-3 py-2 bg-[#242424] text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="overflow-x-auto bg-[#1a1a1a] rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-[#242424]">
            <tr>
              {["Tytuł", "Autor", "Rok", "Opis", "Akcje"].map((h) => (
                <th
                  key={h}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {ksiazki.map((k) => (
              <tr key={k.id} className="hover:bg-[#2d2d2d] transition-colors">
                <td className="px-6 py-4">{k.tytul}</td>
                <td className="px-6 py-4">{k.autor}</td>
                <td className="px-6 py-4">{k.rok_wydania}</td>
                <td className="px-6 py-4">{k.opis}</td>
                <td className="px-6 py-4 text-sm space-x-2">
                  <button
                    onClick={() => handleEdit(k)}
                    className="px-3 m-1 py-1 text-sm border border-transparent hover:border-blue-500 rounded"
                  >
                    Edytuj
                  </button>
                  <button
                    onClick={() => handleDelete(k.id)}
                    className="hover:border-red-500 m-1 rounded px-2 py-1 border"
                  >
                    Usuń
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
