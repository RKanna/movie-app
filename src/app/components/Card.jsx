import Link from "next/link";
const Card = ({ movie }) => {
  const IMAGE_BASE_URL = "https://www.themoviedb.org/t/p/w220_and_h330_face";
  console.log(movie);
  return (
    <div>
      <Link className="text-decoration-none" href={"/movies/" + movie.id}>
        <div className="movie-card card">
          <img
            src={IMAGE_BASE_URL + movie.poster_path}
            alt=""
            className="card-img-top"
          />
          <div className="card-body">
            <h5 className="card-title">{movie.title}</h5>
            {/* <p className="movie-card-text card-text overflow-y-auto">
              {movie.overview}
            </p> */}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
