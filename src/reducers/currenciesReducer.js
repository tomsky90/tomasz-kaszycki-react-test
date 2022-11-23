const initialState = {
    currencies: [],
    selectedCurrency: { symbol: '$', label: 'USD' }
}

export const currenciesReducer = (state = initialState, action) => {
    switch (action.type) {
      case "GET_CURRENCIES":
        return { 
          currencies: action.payload,
          selectedCurrency: state.selectedCurrency
        };
        case "SET_SELECTED_CURRENCY":
        return {
          currencies: state.currencies,
          selectedCurrency: action.payload
        };
      default:
        return state;
    }
  };