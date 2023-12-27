import Link from "next/link";
import { motion } from "framer-motion";
const Card = ({ movie }) => {
  const IMAGE_BASE_URL = "https://www.themoviedb.org/t/p/w220_and_h330_face";
  console.log(movie);
  return (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
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
    </motion.div>
  );
};

export default Card;
