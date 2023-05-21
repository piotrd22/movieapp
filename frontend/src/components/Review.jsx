function Review({ review }) {
  return (
    <div className="flex flex-wrap border border-base-300 bg-base-100 rounded-box p-3 m-3">
      <div className="w-full">
        <div className="font-bold text-lg m-2">{review.userName}</div>
        <div className="m-2">{review.description}</div>
        <div className="m-2">Rating: {review.rating}</div>
      </div>
      <div className="flex items-end justify-end w-full mt-2">
        <div className="flex items-center">
          <div className="mx-2">
            {new Date(review.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Review;
