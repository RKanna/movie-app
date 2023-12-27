import { getMovies } from "@/utils/requests";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "@/app/components/Card";
import Results from "@/app/components/SearchResults";
const SearchResults = async ({ searchParams }) => {
  const searchContent = searchParams.query;
  const movies = await getMovies(searchContent);
  return <Results searchContent={searchContent} movies={movies}></Results>;
};

export default SearchResults;
