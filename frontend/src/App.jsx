// src/App.js
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ListBook from "./pages/ListBook";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/books" replace />} />
        <Route path="/books" element={<ListBook />} />
        <Route path="/books/add" element={<AddBook />} />
        <Route path="/books/edit/:id" element={<EditBook />} />
        <Route path="*" element={<h1>404: Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
