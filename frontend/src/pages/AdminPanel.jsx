import { useState } from "react";
import AddMovieForm from "../components/AddMovieForm";
import Stats from "../components/Stats";

function AdminPanel() {
  const [isAddMovie, setIsAddMovie] = useState(false);
  const [isStats, setStats] = useState(true);

  const onClickAdd = () => {
    setIsAddMovie(!isAddMovie);
    setStats(false);
  };

  const onClickStats = () => {
    setIsAddMovie(false);
    setStats(!isStats);
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-center mt-3 mb-10 text-3xl">ADMIN PANEL</h1>
      <div className="flex justify-center">
        <button onClick={onClickAdd} className="btn btn-secondary mr-10">
          ADD MOVIE
        </button>
        <button onClick={onClickStats} className="btn btn-secondary">
          STATISTICS
        </button>
      </div>
      {isAddMovie && <AddMovieForm />}
      {isStats && <Stats />}
    </div>
  );
}

export default AdminPanel;
