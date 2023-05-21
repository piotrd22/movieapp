import axios from "axios";
import { useEffect, useState } from "react";
import Movie from "../components/Movie";

function WelcomePage() {
  const [movies, setMovies] = useState([]);
  const [isTop, setIsTop] = useState(true);

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

  useEffect(() => {
    const onScroll = () => {
      const { scrollTop } = document.documentElement;
      if (scrollTop === 0) {
        setIsTop(true);
      } else {
        setIsTop(false);
      }
    };

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });
    return () => window.removeEventListener("scroll", onScroll);
  });

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="container mx-auto p-3 min-h-screen">
      {moviesComponent}
      {!isTop && (
        <button
          className="btn btn-square fixed bottom-3 right-3 z-50 "
          onClick={goToTop}
        >
          &#8593;
        </button>
      )}
    </div>
  );
}

export default WelcomePage;
