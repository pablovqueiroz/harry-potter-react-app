import Search from '../components/Search';
import StudentsList from '../components/StudentsList';

function HomePage({ students, favorites, toggleFavorite }) {
  return (
    <div className='container'>
      <Search />
      <StudentsList
        students={students}
        favorites={favorites}         
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
}

export default HomePage;
