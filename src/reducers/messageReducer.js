export const messageReducer = (
  state = { messageActive: false, message: ''},
  action
) => {
  switch (action.type) {
      case 'SHOW_MESSAGE':
          return { ...state , messageActive: true, message: action.payload };
      case 'HIDE_MESSAGE':
          return { ...state , messageActive: false, message: state.message };
      default:
          return state;
  }
}