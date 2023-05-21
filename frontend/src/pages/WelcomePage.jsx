import axios from "axios";
import { useEffect, useState } from "react";
import Movie from "../components/Movie";

function WelcomePage() {
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    const res = await axios.get(import.meta.env.VITE_API + "/movie");
    return res.data;
  };

  useEffect(() => {
    getMovies()
      .then((movies) => setMovies(movies))
      .catch((error) => console.log(error));
  }, []);

  const moviesComponent = movies?.map((movie, index) => {
    return <Movie movie={movie} key={index} />;
  });

  return (
    <div className="container mx-auto p-3 min-h-screen">{moviesComponent}</div>
  );
}

export default WelcomePage;
