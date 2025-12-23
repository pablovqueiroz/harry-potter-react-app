import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ManageStudentPage from "./pages/ManageStudentPage";
import FavoritesPage from "./pages/FavoritesPage";
import NotFoundPage from "./pages/NotfoundPage";
import StudentsDetailsPage from "./pages/StudentsDetailsPage";

function App() {
  const [count, setCount] = useState(0);

  /********Favorites*/
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (student) => {
    setFavorites((prev) =>
      prev.some((r) => r.id === student.id)
        ? prev.filter((r) => r.id !== student.id)
        : [...prev, student]
    );
  };
  /********Favorites*/

  return (
    <>
      <Navbar />
      <main>
        <Search />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <FavoritesPage
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
              />
            }
          />
          <Route path="manage-student" element={<ManageStudentPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="students/:studentId" element={<StudentsDetailsPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
