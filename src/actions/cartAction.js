export const addToCart = (product) => (dispatch, getState) => {
    const cartItems = getState().cart.cartItems.slice();
    let exists = cartItems.find(element => (JSON.stringify(element.attributes) === JSON.stringify(product.attributes) && element.id === product.id))
    if(exists) {
      exists.qty++
    }
    if(!exists) {
      cartItems.push({ ...product, qty: 1 });
    }
    
    dispatch({
        type: 'ADD_TO_CART',
        payload: { cartItems },
      });
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

export const upCartItemByOne = (product) => (dispatch, getState) => {
  const cartItems = getState().cart.cartItems.slice();
  let exists = cartItems.find(element => (JSON.stringify(element.attributes) === JSON.stringify(product.attributes) && element.id === product.id))
    if(exists) {
      exists.qty++
    }
    dispatch({
      type: 'UP_CART_ITEM_BY_ONE',
      payload: { cartItems },
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

export const minusCartItemByOne = (product) => (dispatch, getState) => {
  let cartItems = getState().cart.cartItems.slice();

  
  let exists = cartItems.find(element => (JSON.stringify(element.attributes) === JSON.stringify(product.attributes) && element.id === product.id))
    if(exists) {
      exists.qty--
      if(exists.qty === 0) {
        console.log(exists)
        cartItems = cartItems.filter(element => (JSON.stringify(element.attributes) !== JSON.stringify(product.attributes) || element.id !== product.id))
      }
    }

 
    dispatch({
      type: 'MINUS_CART_ITEM_BY_ONE',
      payload: { cartItems },
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}