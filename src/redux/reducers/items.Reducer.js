const itemsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ITEMS':
      return action.payload;
    case 'ADD_ITEM':
      return [action.payload, ...state];
    case 'DELETE_ITEM':
      return state.filter(item => item.id !== action.payload);
    default:
      return state;
  }
};

export default itemsReducer;
