import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom";
import { Rating } from "../components";
import { useTitle } from "../hooks/useTitle";
import { CartContext } from "../context/CartContext";

export const ProductDetail = () => {
  const params = useParams();
  const [movie, setMovie] = useState([]);
  const image = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
  const { addToCart, removeFromCart, cartList } = useContext(CartContext);
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    const productInCart = cartList.find(item => item.id === movie.id);

    if (productInCart) {
      setInCart(true);
    } else {
      setInCart(false);
    }

  }, [cartList, movie.id]);

  useTitle(movie.title);
  
  useEffect(() => {
    async function fetchMovie() {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYzg3ZDBiY2E1ZDg1YWE0OWEzNzA4YWVhMDI2MDg1NCIsInN1YiI6IjY1YTQxMzk2NmY0M2VjMDEzMTQ1YWE2YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ghooJ9B8IaOvILRsx6xd7UJoOU8qLELgv0LG1GXh8lA'
        }
      };
      const response = await fetch(`https://api.themoviedb.org/3/movie/${params.id}?language=en-US`, options);
      const json = await response.json();
      console.log(json);
      setMovie(json);
    };
    fetchMovie();
  }, [params.id]);

  return (
    <main>
      <section>
        <h1 className="mt-10 mb-5 text-4xl text-center font-bold text-gray-900 dark:text-slate-200">{ movie.original_title }</h1>
        <p className="mb-5 text-lg text-center text-gray-900 dark:text-slate-200">{ movie.overview }</p>
        <div className="flex flex-wrap justify-around">
          <div className="max-w-xl my-3">
            <img className="rounded" src={ image } alt={ movie.original_title } />
          </div>
          <div className="max-w-xl my-3">
            <p className="text-3xl font-bold text-gray-900 dark:text-slate-200">
              <span className="mr-1">$</span>
              <span className="">{ movie.popularity }</span>
            </p>
            <p className="my-3"> 
              <span>
                <Rating rating={ Math.floor(movie.vote_average) } />
              </span>
            </p>
            <p className="my-4 select-none">
                { movie.vote_average > 7 ? (
                  <span className="font-semibold text-amber-500 border bg-amber-50 rounded-lg px-3 py-1 mr-2">HIGHLY RATED</span>
                ): (
                  <span className="font-semibold text-rose-700 border bg-slate-100 rounded-lg px-3 py-1 mr-2">LOW RATED</span>
                )}
              </p>
            <p className="my-3">
              {inCart ? (
                <button onClick={() => removeFromCart(movie)} className={`inline-flex items-center py-2 px-5 text-lg font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800`}>Remove Item <i className="ml-1 bi bi-trash3"></i></button>
              ) : (
                <button onClick={() => addToCart(movie)} className={`inline-flex items-center py-2 px-5 text-lg font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800`}>Add To Cart <i className="ml-1 bi bi-plus-lg"></i></button>
              )}
            </p>
            <p className="text-lg text-gray-900 dark:text-slate-200">
              { movie.overview }
            </p>
          </div>
        </div>
      </section>
    </main> 
  )
}
