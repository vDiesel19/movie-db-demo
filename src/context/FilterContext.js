import { createContext, useReducer } from "react";
import { filterReducer } from "../reducers";

const filterInitialState = {
  productList: [],
  user: {},
  sortBy: null,
  ratings: false
}

export const FilterContext = createContext(filterInitialState);

export const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(filterReducer, filterInitialState);

  function initProductList(products) {
    dispatch({
      type: "PRODUCT_LIST",
      payload: {
        products: products
      }
    })
  }

  function addUser(user) {
    dispatch({
      type: "ADD_USER",
      payload: {
        user: user
      }
    })
  }

  function highlyRated(products) {
    return state.ratings ? products.filter(product => product.vote_average >= 7) : products;
  }

  function sortProducts(products) {
    if (state.sortBy === "lowtohigh") {
      return products.sort((a, b) =>  a.vote_average - b.vote_average);
    }

    if (state.sortBy === "hightolow") {
      return products.sort((a, b) =>  b.vote_average - a.vote_average);
    }

    return products;
  }

  const filteredProductList = sortProducts(highlyRated(state.productList));

  const value = {
    state,
    dispatch,
    productList: filteredProductList,
    user: state.user,
    initProductList,
    addUser
  };

  return (
    <FilterContext.Provider value={ value }>
      { children }
    </FilterContext.Provider>
  )
};