const API_KEY = "cf552f28561d15eafca294cb50c6612c";
const BASE_URL = "https://api.themoviedb.org/3";
// const ACCESS_TOKEN = import.meta.env.API_ACCESS_TOKEN;
// const ACCESS_TOKEN = process.env.NEXT_API_ACCESS_TOKEN;

export const getTrendingMovies = async () => {
  const res = await fetch(
    `${BASE_URL}/trending/movie/day?language=en-US&api_key=${API_KEY}`
  );
  const data = await res.json();
  return data.results;
};

export const getMovies = async (query) => {
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
  );
  const data = await res.json();
  return data.results;
};

export const getMoviesDetails = async (id) => {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  const data = await res.json();
  return data;
};

export const getSimilarMovies = async (id) => {
  const res = await fetch(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results;
};
