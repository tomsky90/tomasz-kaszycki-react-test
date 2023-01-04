export const cartReducer = (
    state = { cartItems: JSON.parse(localStorage.getItem('cartItems') || '[]')},
    action
) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return { cartItems: action.payload.cartItems };
        case 'UP_CART_ITEM_BY_ONE':
            return { cartItems: action.payload.cartItems};
        case 'MINUS_CART_ITEM_BY_ONE': 
            return{ cartItems: action.payload.cartItems};
        default:
            return state;
    }
}

