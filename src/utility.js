export const getTitle = (string) => {
    const title = string.split(' ')
    .splice(0,1)
    .join('')
    return title    
}


export const getSubTitle = (string) => {
    const subTitle = string.split(' ')
    .splice(1)
    .join(' ')
    return subTitle
}

export const getPrice = (prices, symbol) => {
    const price = prices.filter(price => price.currency.symbol === symbol)
   return price[0].amount
}

export const  totalItemsInCart = (items) => {
    const sum = items.reduce(
      (accumulator, currentValue) => accumulator + currentValue.qty,0);
    return sum;
  };

export const calculateTotalPrice = (items, symbol) => {
    const tax = 21;
    const sum = items.reduce(
      (accumulator, currentValue) =>
        accumulator += getPrice(currentValue.prices, symbol) *
        currentValue.qty,0
    );
    const taxValue = (tax / 100) * sum;
    const totalPrice = sum + taxValue;

    return totalPrice.toFixed(2);
  };