import { INCREMENT_COUNT, DECREMENT_COUNT } from "./testConstants";

export const incrementCounter = () => {
    return {
        type: INCREMENT_COUNT
    }
}

export const decrementCount = () => {
    return {
        type: DECREMENT_COUNT
    }
}