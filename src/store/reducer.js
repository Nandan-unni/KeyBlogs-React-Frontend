import { actionTypes } from "./actions/types";
import { initialState } from "./state";

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGNUP_BEGIN:
      return {
        ...state,
        isSubmitting: true,
      };

    case actionTypes.SIGNUP_SUCESS:
      return {
        ...state,
        isSubmitting: false,
      };

    case actionTypes.SIGNUP_ERROR:
      return {
        ...state,
        isSubmitting: false,
      };

    case actionTypes.LOGIN_BEGIN:
      return {
        ...state,
        isSubmitting: true,
      };

    case actionTypes.LOGIN_SUCESS:
      return {
        ...state,
        user: action.payload.userData,
        isSubmitting: false,
        isLoggedIn: true,
      };

    case actionTypes.LOGIN_ERROR:
      return {
        ...state,
        isSubmitting: false,
      };

    case actionTypes.LOGOUT:
      return {
        ...state,
        user: {},
        isLoggedIn: false,
      };

    default:
      return state;
  }
};
