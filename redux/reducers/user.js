import { USER_STATE_CHANGE } from "../actionTypes";

const initialState = {
  currentUser: null,
};

export const user = (state = initialState, action) => {
  console.log("action.type", action.type);
  switch (action.type) {
    case USER_STATE_CHANGE:
      console.log("reducer");
      return {
        ...state,
        currentUser: action.currentUser,
      };
    default:
      return state;
  }
};
