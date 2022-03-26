import { SETSCHOOL } from "./actionTypes";

const SetSchool = (payload: { brwf?: boolean; school?: string }) => ({
  type: SETSCHOOL,
  payload,
});

export { SetSchool };
