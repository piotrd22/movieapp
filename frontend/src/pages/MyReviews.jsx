import Loader from "../components/Loader";
import axios from "axios";
import { useEffect, useState } from "react";
import { useKeycloak } from "@react-keycloak/web";
import Review from "../components/Review";

function MyReviews() {
  const { keycloak } = useKeycloak();
  const [reviews, setReviews] = useState([]);
  const [isTop, setIsTop] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const getReviews = async () => {
    const res = await axios.get(
      import.meta.env.VITE_API +
        "/review/username/" +
        keycloak.tokenParsed.preferred_username
    );
    setIsLoading(false);
    return res.data;
  };

  useEffect(() => {
    getReviews()
      .then((reviews) => setReviews(reviews))
      .catch((error) => console.log(error));
  }, []);

  const reviewsComponent = reviews?.map((review, index) => {
    return (
      <Review
        key={index}
        review={review}
        setReviews={setReviews}
        movieTitle={true}
      />
    );
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

  if (isLoading) return <Loader />;

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-center mt-3 mb-3 text-3xl">MY REVIEWS</h1>
      {reviewsComponent}
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

export default MyReviews;
