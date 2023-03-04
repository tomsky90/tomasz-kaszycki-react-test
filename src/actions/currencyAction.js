import { client} from '@tilework/opus';
import  currenciesQuery  from '../queries/getCurrencyQuery'

export const getCurrencies = () => async (dispatch) => {
    const result = await client.post(currenciesQuery);
    dispatch({
      type: "GET_CURRENCIES",
      payload: result,
    });
  };

export const setSelectedCurrency = (currency) => (dispatch) => {
 dispatch({
  type: "SET_SELECTED_CURRENCY",
  payload: currency 
 })
}