import { useEffect, useState } from "react";

export const useFetch = (apiPath, searchTerm = "") => {
  const [data, setData] = useState([]);
  let url = `https://api.themoviedb.org/3/${apiPath}?language=en-US&page=1`;

  if (searchTerm) {
    url = `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=1`
  }

  useEffect(() => {
    async function fetchMovies() {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYzg3ZDBiY2E1ZDg1YWE0OWEzNzA4YWVhMDI2MDg1NCIsInN1YiI6IjY1YTQxMzk2NmY0M2VjMDEzMTQ1YWE2YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ghooJ9B8IaOvILRsx6xd7UJoOU8qLELgv0LG1GXh8lA'
        }
      };
      const response = await fetch(url, options);
      const json = await response.json();
      console.log(json.results);
      setData(json.results);
    };
    fetchMovies();
  }, [url]);

  return { data }
}
