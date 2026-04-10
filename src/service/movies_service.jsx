import { useEffect, useState } from "react";

const APIKEY = "9513b1344c9d4c4997381f03f1739759";
const AcessToken =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NTEzYjEzNDRjOWQ0YzQ5OTczODFmMDNmMTczOTc1OSIsIm5iZiI6MTc3NTQ4OTQxMy45NDksInN1YiI6IjY5ZDNkMTg1ZjU5NzdlOGVkY2NiZmEyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VYhhAF2F3aGl7SFogfiWrU7vnBmBTlovvV52ci2bcVo";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${AcessToken}`,
  },
};

function useFetch(url) {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMovies(data.results);
        setIsLoading(false);
        return data;
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError(
          "Failed to fetch movies. Please check your internet connection or try again later.",
        );
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, [url]);

  return { movies, isLoading, error };
}

export default useFetch;
