import Link from "next/link";
const Card = ({ movie }) => {
  const IMAGE_BASE_URL = "https://www.themoviedb.org/t/p/w220_and_h330_face";
  console.log(movie);
  return (
    <div>
      <Link className="text-decoration-none" href={"/movies/" + movie.id}>
        <div className="movie-card card h-100">
          <img
            src={IMAGE_BASE_URL + movie.poster_path}
            alt=""
            className="card-img-top"
          />
          <div className="card-body d-flex justify-content-center align-items-center">
            <h5 className="card-title">{movie.title}</h5>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
