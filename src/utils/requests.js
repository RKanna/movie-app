const API_KEY = "cf552f28561d15eafca294cb50c6612c";
const BASE_URL = "https://api.themoviedb.org/3";
// const ACCESS_TOKEN = import.meta.env.API_ACCESS_TOKEN;
// const ACCESS_TOKEN = process.env.NEXT_API_ACCESS_TOKEN;
// let PAGE_NUM = 1;

export const getTrendingMovies = async (page) => {
  const res = await fetch(
    `${BASE_URL}/trending/movie/day?language=en-US&api_key=${API_KEY}&page=${page}`
  );
  const data = await res.json();
  // PAGE_NUM++;
  return data.results;
};

export const getMovieTrailers = async (id) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
  );
  const data = await res.json();
  return data.results;
};

export const getCastAndCrew = async (id) => {
  const res = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=credits`
  );
  const data = await res.json();
  return data;
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

//////////////////////////

const isScrolledToBottom = () => {
  if (typeof window !== "undefined") {
    return (
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight
    );
  }
  return false;
};

// Check if running on the client side before using window
if (typeof window !== "undefined") {
  // Event listener for scrolling
  window.addEventListener("scroll", async () => {
    // Check if the user has scrolled to the bottom
    if (isScrolledToBottom()) {
      // Fetch more trending movies when scrolled to the bottom
      const moreMovies = await getTrendingMovies();
      // Handle the new batch of movies (e.g., update UI, append to a list, etc.)
      console.log("New batch of movies:", moreMovies);
    }
  });
}
