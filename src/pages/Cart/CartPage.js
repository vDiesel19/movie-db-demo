import { useContext } from "react";
import { CartEmpty } from "./components/CartEmpty";
import { CartList } from "./components/CartList";
import { CartContext } from "../../context/CartContext";

export const CartPage = () => {
  const { cartList } = useContext(CartContext);

  return (
    <main>
        { cartList.length ? <CartList /> : <CartEmpty /> }
    </main>
  )
}
