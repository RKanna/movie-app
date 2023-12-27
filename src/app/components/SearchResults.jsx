"use client";

import { useEffect, useState } from "react";
import Card from "./Card";

const Results = ({ searchContent, movies }) => {
  const [filteredResults, setFilteredResults] = useState(movies);

  useEffect(() => {
    setFilteredResults(movies);
  }, [movies]);

  const filterFunction = (filter) => {
    let sortedMovies = [];
    if (filter === "release_date") {
      sortedMovies = [...movies].sort(
        (a, b) => new Date(b.release_date) - new Date(a.release_date)
      );
    } else if (filter === "popularity") {
      sortedMovies = [...movies].sort((a, b) => b.popularity - a.popularity);
    } else if (filter === "vote_average") {
      sortedMovies = [...movies].sort(
        (a, b) => b.vote_average - a.vote_average
      );
    }
    setFilteredResults(sortedMovies);
  };
  return (
    <div className="container my-3">
      <div className="d-flex justify-content-between my-3 mx-3">
        <h1>Top Search Results for &quot;{searchContent}&quot;</h1>
        <div className="col-2">
          <select
            onChange={(e) => filterFunction(e.target.value)}
            className="form-select"
          >
            <option selected>Sort By</option>
            <option value="release_date">Release Year</option>
            <option value="popularity">Popularity</option>
            <option value="vote_average">Ratings</option>
          </select>
        </div>
      </div>
      <div className="d-flex flex-wrap gap-3 justify-content-center">
        {filteredResults.map((movie) => {
          return <Card key={movie.id} movie={movie}></Card>;
        })}
      </div>
    </div>
  );
};

export default Results;
