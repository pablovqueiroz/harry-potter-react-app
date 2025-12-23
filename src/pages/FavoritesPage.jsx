import { Link } from "react-router-dom";
import StudentCard from "../components/StudentCard";

function FavoritesPage({ favorites, onToggleFavorite }) {
  return (
    <>
    <h1 className="favorites-title">Favorites Students</h1>
      <div className="empty-list-container">
        {favorites.length === 0 && <h1 className="empty-list">Empty List</h1>}
        {favorites.length === 0 &&  <Link to="/"> 🔙 Home Page</Link>}
      </div>
        <div className="favorites-list">
      {favorites.map((student) => (
        <StudentCard
        key={student.id}
        student={student}
        isFavorite={true}
        onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
      </>

  );
}
export default FavoritesPage