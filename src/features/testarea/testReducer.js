import { createReducer } from "../../app/commom/util/reducerUtil";
import { INCREMENT_COUNT, DECREMENT_COUNT } from "./testConstants";

const initialState = {
  data: 42
};

export const incrementCounter = (state, payload) => {
  return { ...state, data: state.data + 1 };
};

export const decrementCounter = (state, payload) => {
  return { ...state, data: state.data - 1 };
};

// const testReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case INCREMENT_COUNT:
//       return { ...state, data: state.data + 1 };
//     case DECREMENT_COUNT:
//       return { ...state, data: state.data - 1 };
//     default:
//       return state;
//   }
// };

export default createReducer(initialState, {
    [INCREMENT_COUNT]: incrementCounter,
    [DECREMENT_COUNT]: decrementCounter
})