
import { Routes, Route } from "react-router-dom";
import { HomePage, ProductsList, ProductDetail, CartPage, PageNotFound } from "../pages";

export const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/movies" element={<ProductsList apiPath="movie/now_playing" />}></Route>
        <Route path="/movies/:id" element={<ProductDetail />}></Route>
        <Route path="/cart" element={<CartPage />}></Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}
