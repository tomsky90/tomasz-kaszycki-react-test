import { client } from "@tilework/opus";
import getDataQuery from "../queries/getDataQuery";
import getProductQuery from "../queries/getProductQuery";

export const fetchProducts = (name) => async (dispatch) => {
  const result = await client.post(getDataQuery(name));
  dispatch({
    type: "FETCH_PRODUCTS",
    payload: result,
  });
};

export const fetchProduct = (name) => async (dispatch) => {
  const result = await client.post(getProductQuery(name));
  dispatch({
    type: "FETCH_PRODUCT",
    payload: result,
  });
};
