import { client, Query} from '@tilework/opus';
import  getDataQuery  from '../queries/getDataQuery'

export const fetchProducts = (name) => async (dispatch) => {
    const result = await client.post(getDataQuery(name));
    dispatch({
      type: "FETCH_PRODUCTS",
      payload: result,
    });
  };