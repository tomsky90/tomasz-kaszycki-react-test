export const productsReducer = (state = {}, action) => {
    switch (action.type) {
      case "FETCH_PRODUCTS":
        return { items: action.payload };
      case "FETCH_PRODUCT":
        return {item: action.payload};
      default:
        return state;
    }
  };