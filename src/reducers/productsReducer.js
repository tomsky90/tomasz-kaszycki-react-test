export const productsReducer = (state = {}, action) => {
    switch (action.type) {
      case "FETCH_PRODUCTS":
        return { items: action.payload };
      default:
        return state;
    }
  };