import * as types from "../actionTypes/index";

export const userStateChange =
  (currentUser = null) =>
  (dispatch) => {
    console.log("action", currentUser);
    return dispatch({
      type: types.USER_STATE_CHANGE,
      currentUser: currentUser,
    });
  };
