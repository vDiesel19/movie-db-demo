import { useContext } from "react";
import { Link } from "react-router-dom";
import Backup from "../../../assets/images/backup.png"
import { CartContext } from "../../../context/CartContext";

export const CartCard = ({ product }) => {
  const { removeFromCart } = useContext(CartContext);
  const image = product.poster_path ? `https://image.tmdb.org/t/p/w500/${product.poster_path}` : Backup;

  return (
    <div className="flex flex-wrap justify-between border-b dark:border-slate-700 max-w-4xl m-auto p-2 mb-5">
      <div className="flex">
        <Link to={`/movies/${product.id}`}>
          <img className="w-32 rounded" src={ image } alt={ product.original_title } />
        </Link>
        <div className="">
          <Link to={`/movies/${product.id}`}>
            <p className="text-lg ml-2 dark:text-slate-200">{ product.original_title }</p>
          </Link>            
          <button onClick={() => removeFromCart(product)} className="text-base ml-2 text-red-400">Remove</button>
        </div>
      </div>
      <div className="text-lg m-2 dark:text-slate-200">
        <span>${ (product.popularity).toFixed(2) }</span>
      </div>
    </div>
  )
}
