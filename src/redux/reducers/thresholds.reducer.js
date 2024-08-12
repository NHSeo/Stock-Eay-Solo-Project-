export const setThreshold = (category, value) => ({
    type: 'SET_THRESHOLD',
    payload: { category, value },
  });
  
  const initialState = JSON.parse(localStorage.getItem('thresholds')) || {};
  
  const thresholdsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_THRESHOLD':
        const newState = { ...state, [action.payload.category]: action.payload.value };
        localStorage.setItem('thresholds', JSON.stringify(newState));
        return newState;
      default:
        return state;
    }
  };
  
  export default thresholdsReducer;
  