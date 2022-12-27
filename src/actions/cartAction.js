
export const addToCart = (product) => (dispatch, getState) => {
    const cartItems = getState(). cart.cartItems.slice();
    let alreadyExists =  false;
   
    cartItems.forEach((item) => {
      let itemAttributes = Object.entries(item.attributes).sort().toString();
      const productAttributes = Object.entries(product.attributes).sort().toString();
        if (item.id === product.id && itemAttributes === productAttributes) {
          alreadyExists = true;
         console.log('exists')
          item.qty++;
        // Object.entries(a).sort().toString()
        }
      });
    if (!alreadyExists) {
        cartItems.push({ ...product, qty: 1 });
      }
    dispatch({
        type: 'ADD_TO_CART',
        payload: { cartItems },
      });
}