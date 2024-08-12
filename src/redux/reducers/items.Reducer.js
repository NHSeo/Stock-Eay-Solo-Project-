const itemsReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_ITEMS':
        return action.payload;
      case 'ADD_ITEM':
        return [action.payload, ...state];
      case 'DELETE_ITEM':
        return state.filter(item => item.id !== action.payload);
      case 'UPDATE_ITEM':
        return state.map(item =>
          item.id === action.payload.id ? action.payload : item
        );
      default:
        return state;
    }
  };
  
  export default itemsReducer;
  