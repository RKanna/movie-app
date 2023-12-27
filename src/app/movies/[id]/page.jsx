"use client";
import {
  getCastAndCrew,
  getMovieTrailers,
  getMoviesDetails,
  getSimilarMovies,
} from "@/utils/requests";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import TrailerModal from "@/pages/TrailerModal";
import Link from "next/link";
import LoadingSpin from "react-loading-spin";
import { motion } from "framer-motion";

const DynamicMovieDetails = ({ params }) => {
  const [loading, setLoading] = useState(true);
  const IMAGE_BASE_URL = "https://www.themoviedb.org/t/p/w220_and_h330_face";
  // const movieDetails = await getMoviesDetails(params.id);
  // const crewDetails = await getCastAndCrew(params.id);
  // const relatedMovies = await getSimilarMovies(params.id);
  // const trailers = await getMovieTrailers(params.id);
  // const officialTrailers = trailers.filter(
  //   (trailer) => trailer.name === "Official Trailer"
  // );

  const [movieDetails, setMovieDetails] = useState(null);
  const [crewDetails, setCrewDetails] = useState(null);
  const [relatedMovies, setRelatedMovies] = useState(null);
  const [trailers, setTrailers] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieDetailsData = await getMoviesDetails(params.id);
        const crewDetailsData = await getCastAndCrew(params.id);
        const relatedMoviesData = await getSimilarMovies(params.id);
        const trailersData = await getMovieTrailers(params.id);

        setMovieDetails(movieDetailsData);
        setCrewDetails(crewDetailsData);
        setRelatedMovies(relatedMoviesData);
        setTrailers(trailersData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);

        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-3 mb-3">
        <LoadingSpin size={200} />
      </div>
    );
  }

  // console.log(crewDetails);
  // console.log(movieDetails);

  //for filtering official trailer only

  // console.log(trailers);
  // console.log(relatedMovies);
  return (
    <div className="sect-decription my-4 mx-3">
      <div className="d-flex align-items-center container my-3 for-mobile">
        <div className="col-3 for-img-container">
          <img
            className="rounded"
            src={IMAGE_BASE_URL + movieDetails.backdrop_path}
            alt=""
          />
        </div>
        <div className="mx-5">
          <h3 className="for-responsive">{movieDetails.title}</h3>
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
          <div>
            <p>
              {movieDetails.genres.map((genre) => {
                return (
                  <span
                    className="mx-1 p-1 bg-dark text-white me-2 rounded"
                    key={genre.id}
                  >
                    {genre.name}
                  </span>
                );
              })}
            </p>
          </div>
          <p>{movieDetails.overview}</p>
          <TrailerModal params={params} />
        </div>
      </div>

      <div>
        <br />

        <div className="container-fluid container my-3">
          <h2>Cast & Crew</h2>
          <div className="row">
            {crewDetails.credits.cast.slice(0, 12).map((castMember) => {
              return (
                <div
                  key={castMember.id}
                  className="col-2 d-flex flex-column align-items-center"
                >
                  <div className="mb-2 text-center">
                    {castMember.profile_path && (
                      <img
                        src={IMAGE_BASE_URL + castMember.profile_path}
                        alt={castMember.name}
                        className="card-img-top img-fluid rounded-circle"
                        style={{
                          width: "80%",
                          height: "auto",
                          maxWidth: "100%",
                        }}
                      />
                    )}
                  </div>
                  <div className="text-center">
                    {castMember.profile_path && (
                      <p className="">{castMember.name}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <h2 className="container my-3">Similar Movies</h2>
      <div className="container my-3">
        <div className="d-flex flex-wrap gap-3 justify-content-center">
          {relatedMovies.map((relatedMovie) => {
            return (
              <motion.div
                key={relatedMovie.id}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link
                  className="text-decoration-none"
                  href={"/movies/" + relatedMovie.id}
                >
                  <div className="movie-card card h-100">
                    <img
                      src={IMAGE_BASE_URL + relatedMovie.poster_path}
                      alt=""
                      className="card-img-top"
                    />
                    <div className="card-body d-flex justify-content-center align-items-center">
                      <h5 className="card-title">{relatedMovie.title}</h5>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DynamicMovieDetails;
