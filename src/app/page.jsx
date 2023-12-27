"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { getTrendingMovies } from "@/utils/requests";
import Card from "./components/Card";
import LoadingSpin from "react-loading-spin";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchMoreMovies = async () => {
    const nextPage = currentPage + 1;
    const moreMovies = await getTrendingMovies(nextPage);

    setMovies((prevMovies) => [...prevMovies, ...moreMovies]);
    setCurrentPage(nextPage);
  };

  useEffect(() => {
    const fetchInitialMovies = async () => {
      try {
        const initialMovies = await getTrendingMovies(currentPage);
        setMovies(initialMovies);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialMovies();
  }, []);

  return (
    <div className="container my-3">
      <h1 className="my-3 mb-3">Current Trending Movies</h1>
      <div className="d-flex justify-content-center align-items-center mb-3">
        {loading && <LoadingSpin size={200} color="" />}
      </div>

      <div className="d-flex flex-wrap gap-3 justify-content-center">
        {movies.map((movie) => (
          <Card key={movie.id} movie={movie}></Card>
        ))}
        <div className="container">
          <div className="col-md-12 text-center">
            <button
              type="button"
              className="btn btn-primary"
              onClick={fetchMoreMovies}
            >
              Load More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
