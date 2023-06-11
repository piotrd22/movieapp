import axios from "axios";
import { useEffect, useState } from "react";
import Movie from "../components/Movie";
import { useForm } from "react-hook-form";
import Loader from "../components/Loader";

function WelcomePage() {
  const [movies, setMovies] = useState([]);
  const [isTop, setIsTop] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState("");
  const [isButtonClear, setIsButtonClear] = useState(false);

  const getMovies = async () => {
    const res = await axios.get(import.meta.env.VITE_API + "/movie");
    setIsLoading(false);
    return res.data;
  };

  const searchMovies = async (keyword) => {
    if (keyword && sort) {
      const res = await axios.get(
        import.meta.env.VITE_API +
          "/movie/search?keyword=" +
          keyword +
          "&sort=" +
          sort
      );
      setIsLoading(false);
      return res.data;
    } else if (keyword) {
      const res = await axios.get(
        import.meta.env.VITE_API + "/movie/search?keyword=" + keyword
      );
      setIsLoading(false);
      return res.data;
    } else if (sort) {
      const res = await axios.get(
        import.meta.env.VITE_API + "/movie/search?keyword=&sort=" + sort
      );
      setIsLoading(false);
      return res.data;
    }
  };

  useEffect(() => {
    if (!keyword && !sort) {
      setIsButtonClear(false);
      getMovies()
        .then((movies) => setMovies(movies))
        .catch((error) => console.log(error));
    }
  }, [keyword, sort]);

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

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    setIsButtonClear(true);
    setKeyword(data.search);
    searchMovies(data.search)
      .then((movies) => {
        setMovies(movies);
        reset();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const clearSearch = () => {
    setSort("");
    setKeyword("");
    reset();
    setIsButtonClear(false);
  };

  const onClickSort = () => {
    searchMovies(keyword)
      .then((movies) => {
        setMovies(movies);
        reset();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (isLoading) return <Loader />;

  return (
    <div className="container mx-auto p-3 min-h-screen">
      <div className="w-full flex justify-between flex-wrap">
        <form
          className="w-full sm:w-1/3 form-control"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full input-group">
            <input
              type="text"
              placeholder="Search…"
              className="input input-bordered w-full"
              {...register("search", {
                required: "This field is required!",
                pattern: {
                  value: /^[^\s]+(?:$|.*[^\s]+$)/g,
                  message: "This field can't start or end with whitespace!",
                },
              })}
            />
            <button className="btn btn-square">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </form>
        <select
          className="select w-full sm:w-1/3 input-bordered"
          onChange={(e) => setSort(e.target.value)}
          value={sort}
        >
          <option disabled value="">
            Sort by:
          </option>
          <option onClick={onClickSort} value="desc">
            From the latest
          </option>
          <option onClick={onClickSort} value="asc">
            From the oldest
          </option>
        </select>
      </div>
      {keyword && isButtonClear ? (
        <p className="mt-2">Results for: {keyword}</p>
      ) : null}
      {isButtonClear || sort ? (
        <button onClick={clearSearch} className="btn btn-active mt-5">
          CLEAR SEARCH
        </button>
      ) : null}
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

export default WelcomePage;
