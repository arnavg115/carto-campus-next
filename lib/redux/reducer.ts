import { HYDRATE } from "next-redux-wrapper";
import { AnyAction } from "redux";
import { SETSCHOOL } from "./actionTypes";
import { State } from "./types";

const mainReducer = (
  state: State = { school: "61a83693444ddc3829a46f3a", brwf: false },
  action: AnyAction
) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state };
    case SETSCHOOL:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export { mainReducer };
