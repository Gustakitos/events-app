import {
  INCREMENT_COUNT,
  DECREMENT_COUNT,
  COUNTER_ACTION_STARTED,
  COUNTER_ACTION_FINISHED
} from "./testConstants";

export const incrementCounter = () => {
  return {
    type: INCREMENT_COUNT
  };
};

export const decrementCount = () => {
  return {
    type: DECREMENT_COUNT
  };
};

export const startCounterAction = () => {
    return {
        type: COUNTER_ACTION_STARTED
    }
}

export const finishedCounterAction = () => {
    return {
        type: COUNTER_ACTION_FINISHED
    }
}

const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export const incrementAsync = () => {
    return async dispatch => {
        dispatch(startCounterAction())
        await delay(1000);
        dispatch({type: INCREMENT_COUNT})
        dispatch(finishedCounterAction())
    }
}

export const decrementAsync = () => {
    return async dispatch => {
        dispatch(startCounterAction())
        await delay(1000);
        dispatch({type: DECREMENT_COUNT})
        dispatch(finishedCounterAction())
    }
}