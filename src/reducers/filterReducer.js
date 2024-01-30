export const filterReducer = (state, action) => {
  const { type, payload } = action;

  switch(type) {

    case "PRODUCT_LIST":
      return { productList: payload.products }
    
    case "SORT_BY":
      return {...state, sortBy: payload.sortBy}
    
    case "ADD_USER":
      return {...state, user: payload.user}

    case "RATINGS":
      return {...state, ratings: payload.ratings}

    case "CLEAR_FILTER": 
      return {
        ...state,
        sortBy: null,
        ratings: false
      }

    default:
      throw new Error("No Case Found");
  }
}