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

export const showMessage = (message) => {
  const element = document.querySelector('.message')
  element.textContent = message;
  element.classList.add('active')
  console.log(element)

  setTimeout(() => {
    element.classList.remove('active')
  }, 3000);

};