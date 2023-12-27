"use client";
import {
  getCastAndCrew,
  getMovieTrailers,
  getMoviesDetails,
  getSimilarMovies,
} from "@/utils/requests";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import TrailerModal from "@/pages/TrailerModal";
import Link from "next/link";

const DynamicMovieDetails = async ({ params }) => {
  const movieDetails = await getMoviesDetails(params.id);
  const IMAGE_BASE_URL = "https://www.themoviedb.org/t/p/w220_and_h330_face";

  const crewDetails = await getCastAndCrew(params.id);
  const relatedMovies = await getSimilarMovies(params.id);
  console.log(crewDetails);
  // console.log(movieDetails);
  const trailers = await getMovieTrailers(params.id);

  //for filtering official trailer only
  const officialTrailers = trailers.filter(
    (trailer) => trailer.name === "Official Trailer"
  );
  // console.log(trailers);
  // console.log(relatedMovies);
  return (
    <div className="my-4 mx-3">
      <div className="d-flex align-items-center container my-3 for-mobile">
        <div className="col-3 for-img-container">
          <img
            className="rounded"
            src={IMAGE_BASE_URL + movieDetails.backdrop_path}
            alt=""
          />
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
              <div key={relatedMovie.id}>
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
              </div>
            );
          })}
        </div>
      </div>

      {/* <section className="container my-3">
        {officialTrailers.map((trailer) => (
          <div key={trailer.id}>
            <h3>{trailer.name}</h3>
            <p>Type: {trailer.type}</p>
            <p>Published At: {trailer.published_at}</p>
            <p>Site: {trailer.site}</p>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title={trailer.name}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </section> */}
    </div>
  );
};

export default DynamicMovieDetails;
