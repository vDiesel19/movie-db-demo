import { Link } from "react-router-dom";
import { Rating } from "./Rating";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import Backup from "../../assets/images/backup.png"

export const ProductCard = ({ movie }) => {
  const { id, poster_path, original_title, overview, popularity, vote_average } = movie;
  const image = poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : Backup;
  const { cartList, addToCart, removeFromCart } = useContext(CartContext);
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    const productInCart = cartList.find(item => item.id === movie.id);

    if (productInCart) {
      setInCart(true);
    } else {
      setInCart(false);
    }

  }, [cartList, movie.id]);

  return (
    <div className="m-3 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <Link to={`/movies/${id}`} className="relative">
        { vote_average > 7 ? (
          <span className="absolute top-4 left-2 px-2 bg-orange-500 bg-opacity-90 text-white rounded">Highly Rated</span>
        ): ""}
        <img className="rounded-t-lg w-full" src={ image } alt={ original_title } />
      </Link>
      <div className="p-5">
        <Link to={`/movies/${id}`}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{ original_title }</h5>
        </Link>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{ overview }</p>
        <div className="flex items-center my-2">
          <Rating rating={ Math.floor(vote_average) } />
        </div>
        <p className="flex justify-between items-center">
          <span className="text-2xl dark:text-gray-200">
            <span>$</span><span>{ (popularity).toFixed(2) }</span>
          </span>
          {inCart ? (
            <button onClick={() => removeFromCart(movie)} className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800">Remove Item <i className="ml-1 bi bi-trash3"></i></button>
          ) : (
            <button onClick={() => addToCart(movie)} className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800">Add To Cart <i className="ml-1 bi bi-plus-lg"></i></button>
          )}
        </p>
      </div>
    </div>
  )
}
