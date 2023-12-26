import { getMoviesDetails } from "@/utils/requests";

const DynamicMovieDetails = async ({ params }) => {
  const movieDetails = await getMoviesDetails(params.id);
  const IMAGE_BASE_URL = "https://www.themoviedb.org/t/p/w220_and_h330_face";
  console.log(movieDetails);
  return (
    <div className="my-4 mx-3">
      <div className="d-flex align-items-center">
        <div className="col-3">
          <img src={IMAGE_BASE_URL + movieDetails.backdrop_path} alt="" />
        </div>
        <div className="mx-5">
          <h3>{movieDetails.title}</h3>
          <div className="d-flex">
            <p className="py-1 px-2 bg-success text-white me-2 rounded">
              {movieDetails.release_date}
            </p>
            <p className="py-1 px-2 bg-success text-white me-2 rounded">
              {movieDetails.original_language}
            </p>
            <p className="py-1 px-2 bg-success text-white me-2 rounded">
              {movieDetails.status}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicMovieDetails;
