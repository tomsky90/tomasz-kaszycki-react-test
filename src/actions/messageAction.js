export const showMessage = (message) => (dispatch) => {
  dispatch({
    type: 'SHOW_MESSAGE',
    payload: message,
  })
};

export const hideMessage = () => (dispatch) => {
  dispatch({
    type: 'HIDE_MESSAGE',
  })
}