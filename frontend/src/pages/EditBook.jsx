// src/pages/EditBook.js
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function EditBook() {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8000/api/ksiazki/${id}`)
      .then((r) => r.json())
      .then(setForm)
      .catch(console.error);
  }, [id]);

  if (!form) return <p>Ładowanie…</p>;

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8000/api/ksiazki/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tytul: form.tytul,
          autor: form.autor,
          rok_wydania: form.rok_wydania,
          opis: form.opis,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        if (data.errors) {
          data.errors.forEach((err) => toast.error(err));
        } else if (data.message) {
          toast.error(data.message);
        }
        return;
      }

      toast.success("Książka zaktualizowana!");
      navigate(-1);
    } catch (err) {
      console.error(err);
      toast.error("Błąd sieciowy. Spróbuj ponownie.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-12 p-6 bg-[#1a1a1a] text-white rounded-lg shadow-md">
      <h2 className="text-2xl mb-6">Edytuj książkę</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["tytul", "autor", "rok_wydania", "opis"].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-neutral-300 mb-1">
              {field === "rok_wydania"
                ? "Rok wydania"
                : field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            {field !== "opis" ? (
              <input
                type={field === "rok_wydania" ? "number" : "text"}
                name={field}
                value={form[field]}
                min="0"
                max={new Date().getFullYear()}
                step="1"
                onChange={handleChange}
                className="w-full px-3 py-2 bg-[#242424] text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <textarea
                name="opis"
                value={form.opis}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 bg-[#242424] text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>
        ))}
        <div className="flex justify-between gap-4 mt-4">
          <button
            type="submit"
            className="flex-1 py-2 bg-[#1a1a1a] text-white border border-transparent hover:border-blue-500 rounded transition-colors"
          >
            Zapisz zmiany
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex-1 py-2 bg-red-600 rounded"
          >
            Anuluj
          </button>
        </div>
      </form>
    </div>
  );
}
