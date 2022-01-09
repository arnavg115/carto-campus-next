import { HYDRATE } from "next-redux-wrapper";
import { AnyAction } from "redux";
import { SETSCHOOL } from "./actionTypes";
import { State } from "./types";

const mainReducer = (
  state: State = { school: "" },
  action: AnyAction
) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state };
    case SETSCHOOL:
      return { ...state, school: action.payload };
    default:
      return state;
  }
};

export { mainReducer };
