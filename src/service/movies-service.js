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

async function getMovies(type, page) {
  const APIURL = `https://api.themoviedb.org/3/movie/${type}?language=en-US&page=${page}`;
  if (!type || !page) {
    return;
  }

  try {
    const response = await fetch(APIURL, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return null;
  }
}
export default getMovies;
