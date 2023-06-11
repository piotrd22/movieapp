import { useState, useEffect } from "react";
import Movie from "../components/Movie";
import Loader from "../components/Loader";
import axios from "axios";

function TopMovies() {
  const [isLoading, setIsLoading] = useState(true);
  const [sort, setSort] = useState("desc");
  const [movies, setMovies] = useState([]);
  const [isTop, setIsTop] = useState(true);

  const getMovies = async () => {
    const res = await axios.get(
      import.meta.env.VITE_API + "/movie/topmovies?sort=" + sort
    );
    setIsLoading(false);
    return res.data;
  };

  useEffect(() => {
    getMovies()
      .then((movies) => setMovies(movies))
      .catch((error) => console.log(error));
  }, [sort]);

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

  const moviesComponent = movies?.map((movie, index) => {
    return <Movie movie={movie} key={index} setMovies={setMovies} />;
  });

  if (isLoading) return <Loader />;

  return (
    <div className="container mx-auto p-3 min-h-screen">
      <h1 className="text-center mt-3 mb-10 text-3xl">TOP MOVIES</h1>{" "}
      <div className="w-full flex justify-center flex-wrap">
        <select
          className="select w-full sm:w-1/3 input-bordered"
          onChange={(e) => setSort(e.target.value)}
          value={sort}
        >
          <option value="desc">From the best</option>
          <option value="asc">From the worst</option>
        </select>
      </div>
      {moviesComponent}
      {!isTop && (
        <button
          className="btn btn-square fixed bottom-3 right-3 z-50"
          onClick={goToTop}
        >
          &#8593;
        </button>
      )}
    </div>
  );
}

export default TopMovies;
