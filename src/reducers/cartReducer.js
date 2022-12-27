export const cartReducer = (
    state = { cartItems: JSON.parse(localStorage.getItem('cartItems') || '[]')},
    action
) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return { cartItems: action.payload.cartItems };
        case 'REMOVE_FROM_CART':
            return { cartItems: action.payload.cartItems};
        default:
            return state;
    }
}





// {cartItems.map(item => (
//     <div className="cart-item" key={item.id}>
//         <div className="cart-item__description">
//             <p>{getTitle(item.name)}</p>
//             <p>{getSubTitle(item.name)}</p>
//             <p className="cart-item price"><span>{selectedCurrency.symbol}</span> {getPrice(item.prices, selectedCurrency?.symbol)}</p>
//             {item.attributes.map(attr => (
//                 <div>
//                     <p>{attr.element}</p>
//                 </div>
//             ))}
            
//         </div>
//     </div>
// ))}